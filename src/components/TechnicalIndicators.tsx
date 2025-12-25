import { CandleData } from "@/lib/tradingData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TechnicalIndicatorsProps {
  data: CandleData;
}

export const TechnicalIndicators = ({ data }: TechnicalIndicatorsProps) => {
  const indicators = [
    {
      name: "RSI (14)",
      value: data.rsi,
      format: (v: number) => v.toFixed(1),
      status: data.rsi > 70 ? 'overbought' : data.rsi < 30 ? 'oversold' : 'neutral',
      color: data.rsi > 70 ? 'text-destructive' : data.rsi < 30 ? 'text-success' : 'text-muted-foreground',
    },
    {
      name: "EMA 12",
      value: data.ema12,
      format: (v: number) => `$${v.toFixed(2)}`,
      status: data.ema12 > data.ema26 ? 'bullish' : 'bearish',
      color: data.ema12 > data.ema26 ? 'text-success' : 'text-destructive',
    },
    {
      name: "EMA 26",
      value: data.ema26,
      format: (v: number) => `$${v.toFixed(2)}`,
      status: 'reference',
      color: 'text-accent',
    },
    {
      name: "VWAP",
      value: data.vwap,
      format: (v: number) => `$${v.toFixed(2)}`,
      status: data.close > data.vwap ? 'above' : 'below',
      color: data.close > data.vwap ? 'text-success' : 'text-destructive',
    },
    {
      name: "Ichimoku Tenkan",
      value: data.ichimokuTenkan,
      format: (v: number) => `$${v.toFixed(2)}`,
      status: data.close > data.ichimokuTenkan ? 'above' : 'below',
      color: data.close > data.ichimokuTenkan ? 'text-success' : 'text-destructive',
    },
    {
      name: "Ichimoku Kijun",
      value: data.ichimokuKijun,
      format: (v: number) => `$${v.toFixed(2)}`,
      status: data.close > data.ichimokuKijun ? 'above' : 'below',
      color: data.close > data.ichimokuKijun ? 'text-success' : 'text-destructive',
    },
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'bullish' || status === 'above' || status === 'oversold') {
      return <TrendingUp className="h-3 w-3" />;
    }
    if (status === 'bearish' || status === 'below' || status === 'overbought') {
      return <TrendingDown className="h-3 w-3" />;
    }
    return <Minus className="h-3 w-3" />;
  };

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h2 className="text-lg font-semibold text-foreground mb-4">Technical Indicators</h2>
      
      <div className="space-y-3">
        {indicators.map((indicator) => (
          <div 
            key={indicator.name}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`${indicator.color}`}>
                {getStatusIcon(indicator.status)}
              </span>
              <span className="text-sm text-muted-foreground">{indicator.name}</span>
            </div>
            <div className="text-right">
              <span className="font-mono font-medium text-foreground">
                {indicator.format(indicator.value)}
              </span>
              <span className={`ml-2 text-xs uppercase ${indicator.color}`}>
                {indicator.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Volume */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Volume</span>
          <span className="font-mono font-medium text-foreground">
            {(data.volume / 1000).toFixed(1)}K
          </span>
        </div>
      </div>
    </div>
  );
};
