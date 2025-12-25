import { Activity, Brain, TrendingUp } from "lucide-react";

interface HeaderProps {
  currentPrice: number;
  priceChange: number;
}

export const Header = ({ currentPrice, priceChange }: HeaderProps) => {
  const isPositive = priceChange >= 0;

  return (
    <header className="glass-card border-b border-border/30 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg gradient-gold flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-gold">LSTM Gold Bot</h1>
              <p className="text-xs text-muted-foreground">Neural Network Trading System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">XAUUSD</span>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-mono font-bold text-foreground">
                ${currentPrice.toFixed(2)}
              </span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                isPositive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
              }`}>
                <TrendingUp className={`h-3 w-3 ${!isPositive && 'rotate-180'}`} />
                <span className="text-xs font-mono font-medium">
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Live Price</p>
          </div>
        </div>
      </div>
    </header>
  );
};
