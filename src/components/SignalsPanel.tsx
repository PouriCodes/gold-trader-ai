import { TradingSignal } from "@/lib/tradingData";
import { ArrowUpCircle, ArrowDownCircle, MinusCircle, Brain } from "lucide-react";
import { Button } from "./ui/button";

interface SignalsPanelProps {
  signals: TradingSignal[];
}

export const SignalsPanel = ({ signals }: SignalsPanelProps) => {
  const latestSignal = signals[signals.length - 1];

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'BUY':
        return <ArrowUpCircle className="h-5 w-5 text-success" />;
      case 'SELL':
        return <ArrowDownCircle className="h-5 w-5 text-destructive" />;
      default:
        return <MinusCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'BUY':
        return 'border-success text-success bg-success/10';
      case 'SELL':
        return 'border-destructive text-destructive bg-destructive/10';
      default:
        return 'border-muted-foreground text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">LSTM Trading Signals</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Brain className="h-4 w-4 text-primary" />
          Neural Network Predictions
        </div>
      </div>

      {/* Latest Signal Highlight */}
      {latestSignal && (
        <div className={`p-4 rounded-xl border-2 mb-6 ${getSignalColor(latestSignal.type)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getSignalIcon(latestSignal.type)}
              <div>
                <p className="text-sm font-medium">Current Signal</p>
                <p className="text-2xl font-bold font-mono">{latestSignal.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Confidence</p>
              <p className="text-2xl font-bold font-mono">{(latestSignal.confidence * 100).toFixed(0)}%</p>
            </div>
          </div>
          
          {/* Indicator breakdown */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-current/20">
            <div className="text-center">
              <p className="text-xs opacity-70">EMA</p>
              <p className="text-sm font-medium">{latestSignal.indicators.ema}</p>
            </div>
            <div className="text-center">
              <p className="text-xs opacity-70">RSI</p>
              <p className="text-sm font-medium">{latestSignal.indicators.rsi}</p>
            </div>
            <div className="text-center">
              <p className="text-xs opacity-70">Ichimoku</p>
              <p className="text-sm font-medium">{latestSignal.indicators.ichimoku}</p>
            </div>
            <div className="text-center">
              <p className="text-xs opacity-70">VWAP</p>
              <p className="text-sm font-medium">{latestSignal.indicators.vwap}</p>
            </div>
          </div>
        </div>
      )}

      {/* Signal History */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Signals</h3>
        {signals.slice().reverse().slice(1, 8).map((signal) => (
          <div 
            key={signal.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {getSignalIcon(signal.type)}
              <div>
                <p className="text-sm font-mono text-foreground">${signal.price.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(signal.time).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="signal"
                size="sm"
                className={getSignalColor(signal.type)}
              >
                {signal.type}
              </Button>
              <div className="text-right">
                <p className="text-sm font-mono font-medium">
                  {(signal.confidence * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
