import { Layers, Cpu, Database, Zap, Activity } from "lucide-react";

export const ModelArchitecture = () => {
  const layers = [
    { name: 'Input', units: 'Features × 60', type: 'input', icon: Database },
    { name: 'LSTM 1', units: '64 units', type: 'lstm', icon: Layers },
    { name: 'Dropout', units: '0.2', type: 'regularization', icon: Activity },
    { name: 'LSTM 2', units: '128 units', type: 'lstm', icon: Layers },
    { name: 'Dropout', units: '0.2', type: 'regularization', icon: Activity },
    { name: 'LSTM 3', units: '64 units', type: 'lstm', icon: Layers },
    { name: 'Dense', units: '32 units', type: 'dense', icon: Cpu },
    { name: 'Output', units: '3 (Buy/Sell/Hold)', type: 'output', icon: Zap },
  ];

  const features = [
    'Close Price', 'Volume', 'EMA 12', 'EMA 26', 
    'RSI 14', 'VWAP', 'Ichimoku Tenkan', 'Ichimoku Kijun',
    'Senkou Span A', 'Senkou Span B', 'Volume SMA', 'Price Change %'
  ];

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <h2 className="text-lg font-semibold text-foreground mb-4">LSTM Architecture</h2>

      {/* Network Visualization */}
      <div className="flex items-center justify-between gap-1 mb-6 overflow-x-auto pb-2">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <div key={layer.name} className="flex items-center">
              <div className="flex flex-col items-center min-w-[70px]">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center mb-1
                  ${layer.type === 'input' ? 'bg-primary/20 text-primary' :
                    layer.type === 'lstm' ? 'bg-accent/20 text-accent' :
                    layer.type === 'regularization' ? 'bg-muted text-muted-foreground' :
                    layer.type === 'dense' ? 'bg-chart-purple/20 text-chart-purple' :
                    'bg-success/20 text-success'}
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-foreground">{layer.name}</p>
                <p className="text-[10px] text-muted-foreground">{layer.units}</p>
              </div>
              {index < layers.length - 1 && (
                <div className="w-4 h-0.5 bg-border mx-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Input Features */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Input Features (12)</h3>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <span 
              key={feature}
              className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-mono"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Training Config */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Training Configuration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-2 rounded-md bg-secondary/30">
            <p className="text-muted-foreground">Sequence Length</p>
            <p className="font-mono font-medium text-foreground">60 timesteps</p>
          </div>
          <div className="p-2 rounded-md bg-secondary/30">
            <p className="text-muted-foreground">Optimizer</p>
            <p className="font-mono font-medium text-foreground">Adam</p>
          </div>
          <div className="p-2 rounded-md bg-secondary/30">
            <p className="text-muted-foreground">Loss Function</p>
            <p className="font-mono font-medium text-foreground">CrossEntropy</p>
          </div>
          <div className="p-2 rounded-md bg-secondary/30">
            <p className="text-muted-foreground">Early Stop Patience</p>
            <p className="font-mono font-medium text-foreground">10 epochs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
