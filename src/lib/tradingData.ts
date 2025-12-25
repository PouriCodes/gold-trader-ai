// Simulated XAUUSD (Gold) trading data with technical indicators

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema12: number;
  ema26: number;
  rsi: number;
  vwap: number;
  ichimokuTenkan: number;
  ichimokuKijun: number;
  ichimokuSenkouA: number;
  ichimokuSenkouB: number;
}

export interface TrainingMetrics {
  epoch: number;
  trainLoss: number;
  valLoss: number;
  accuracy: number;
}

export interface TradingSignal {
  id: string;
  time: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  price: number;
  indicators: {
    ema: string;
    rsi: string;
    ichimoku: string;
    vwap: string;
  };
}

// Generate realistic gold price data
const generateGoldData = (): CandleData[] => {
  const data: CandleData[] = [];
  let basePrice = 2050;
  const now = new Date();
  
  for (let i = 100; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 3600000); // Hourly data
    const volatility = 5 + Math.random() * 10;
    const trend = Math.sin(i / 20) * 15;
    
    const open = basePrice + trend + (Math.random() - 0.5) * volatility;
    const close = open + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    const volume = Math.floor(50000 + Math.random() * 100000);
    
    basePrice = close;
    
    // Calculate technical indicators (simplified)
    const ema12 = close * 0.15 + (data[data.length - 1]?.ema12 || close) * 0.85;
    const ema26 = close * 0.075 + (data[data.length - 1]?.ema26 || close) * 0.925;
    const rsi = 30 + Math.random() * 40;
    const vwap = (high + low + close) / 3;
    
    // Ichimoku (simplified calculation)
    const ichimokuTenkan = (high + low) / 2;
    const ichimokuKijun = ichimokuTenkan - 2 + Math.random() * 4;
    const ichimokuSenkouA = (ichimokuTenkan + ichimokuKijun) / 2;
    const ichimokuSenkouB = ichimokuSenkouA - 5 + Math.random() * 10;
    
    data.push({
      time: date.toISOString(),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
      ema12: Number(ema12.toFixed(2)),
      ema26: Number(ema26.toFixed(2)),
      rsi: Number(rsi.toFixed(2)),
      vwap: Number(vwap.toFixed(2)),
      ichimokuTenkan: Number(ichimokuTenkan.toFixed(2)),
      ichimokuKijun: Number(ichimokuKijun.toFixed(2)),
      ichimokuSenkouA: Number(ichimokuSenkouA.toFixed(2)),
      ichimokuSenkouB: Number(ichimokuSenkouB.toFixed(2)),
    });
  }
  
  return data;
};

// Generate training metrics with early stopping
export const generateTrainingMetrics = (): TrainingMetrics[] => {
  const metrics: TrainingMetrics[] = [];
  let bestValLoss = Infinity;
  let patience = 0;
  const maxPatience = 10;
  
  for (let epoch = 1; epoch <= 100; epoch++) {
    const trainLoss = 0.5 * Math.exp(-epoch / 30) + 0.02 + Math.random() * 0.02;
    const valLoss = 0.55 * Math.exp(-epoch / 35) + 0.025 + Math.random() * 0.03;
    const accuracy = Math.min(0.95, 0.5 + (1 - Math.exp(-epoch / 25)) * 0.45 + Math.random() * 0.02);
    
    metrics.push({
      epoch,
      trainLoss: Number(trainLoss.toFixed(4)),
      valLoss: Number(valLoss.toFixed(4)),
      accuracy: Number(accuracy.toFixed(4)),
    });
    
    // Early stopping logic
    if (valLoss < bestValLoss) {
      bestValLoss = valLoss;
      patience = 0;
    } else {
      patience++;
    }
    
    if (patience >= maxPatience && epoch > 30) {
      break; // Early stopping triggered
    }
  }
  
  return metrics;
};

// Generate trading signals
export const generateSignals = (data: CandleData[]): TradingSignal[] => {
  const signals: TradingSignal[] = [];
  const recentData = data.slice(-10);
  
  recentData.forEach((candle, index) => {
    const emaSignal = candle.ema12 > candle.ema26 ? 'Bullish' : 'Bearish';
    const rsiSignal = candle.rsi > 70 ? 'Overbought' : candle.rsi < 30 ? 'Oversold' : 'Neutral';
    const ichimokuSignal = candle.close > candle.ichimokuSenkouA ? 'Above Cloud' : 'Below Cloud';
    const vwapSignal = candle.close > candle.vwap ? 'Above VWAP' : 'Below VWAP';
    
    let type: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
    let confidence = 0.5;
    
    if (emaSignal === 'Bullish' && rsiSignal !== 'Overbought' && vwapSignal === 'Above VWAP') {
      type = 'BUY';
      confidence = 0.7 + Math.random() * 0.2;
    } else if (emaSignal === 'Bearish' && rsiSignal !== 'Oversold' && vwapSignal === 'Below VWAP') {
      type = 'SELL';
      confidence = 0.65 + Math.random() * 0.25;
    }
    
    signals.push({
      id: `signal-${index}`,
      time: candle.time,
      type,
      confidence: Number(confidence.toFixed(2)),
      price: candle.close,
      indicators: {
        ema: emaSignal,
        rsi: rsiSignal,
        ichimoku: ichimokuSignal,
        vwap: vwapSignal,
      },
    });
  });
  
  return signals;
};

// EDA statistics
export interface EDAStats {
  feature: string;
  mean: number;
  std: number;
  min: number;
  max: number;
  correlation: number;
}

export const calculateEDAStats = (data: CandleData[]): EDAStats[] => {
  const features = ['close', 'volume', 'rsi', 'ema12', 'vwap'] as const;
  
  return features.map(feature => {
    const values = data.map(d => d[feature]);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
    
    return {
      feature: feature.toUpperCase(),
      mean: Number(mean.toFixed(2)),
      std: Number(std.toFixed(2)),
      min: Number(Math.min(...values).toFixed(2)),
      max: Number(Math.max(...values).toFixed(2)),
      correlation: Number((0.3 + Math.random() * 0.6).toFixed(3)),
    };
  });
};

// Feature distribution for histogram
export interface DistributionData {
  range: string;
  count: number;
}

export const getFeatureDistribution = (data: CandleData[], feature: keyof CandleData): DistributionData[] => {
  const values = data.map(d => Number(d[feature]));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binCount = 10;
  const binSize = (max - min) / binCount;
  
  const distribution: DistributionData[] = [];
  
  for (let i = 0; i < binCount; i++) {
    const rangeStart = min + i * binSize;
    const rangeEnd = rangeStart + binSize;
    const count = values.filter(v => v >= rangeStart && v < rangeEnd).length;
    
    distribution.push({
      range: `${rangeStart.toFixed(0)}`,
      count,
    });
  }
  
  return distribution;
};

export const goldData = generateGoldData();
export const tradingSignals = generateSignals(goldData);
export const trainingMetrics = generateTrainingMetrics();
export const edaStats = calculateEDAStats(goldData);
