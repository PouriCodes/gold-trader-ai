import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { TrainingMetrics } from "@/lib/tradingData";
import { AlertTriangle, CheckCircle, Zap, Layers } from "lucide-react";

interface TrainingPanelProps {
  metrics: TrainingMetrics[];
}

export const TrainingPanel = ({ metrics }: TrainingPanelProps) => {
  const finalEpoch = metrics[metrics.length - 1];
  const bestEpoch = metrics.reduce((best, current) => 
    current.valLoss < best.valLoss ? current : best
  );
  const earlyStopped = metrics.length < 100;

  const modelConfig = {
    layers: [64, 128, 64],
    batchSize: 32,
    learningRate: 0.001,
    dropout: 0.2,
    optimizer: 'Adam',
  };

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">LSTM Model Training</h2>
        {earlyStopped && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs">
            <AlertTriangle className="h-3 w-3" />
            Early Stopped @ Epoch {metrics.length}
          </div>
        )}
      </div>

      {/* Model Architecture */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-secondary/30">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <Layers className="h-3 w-3" />
            Layers
          </div>
          <p className="font-mono text-sm text-foreground">
            {modelConfig.layers.join(' → ')}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30">
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
            <Zap className="h-3 w-3" />
            Batch Size
          </div>
          <p className="font-mono text-sm text-foreground">{modelConfig.batchSize}</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30">
          <div className="text-muted-foreground text-xs mb-1">Learning Rate</div>
          <p className="font-mono text-sm text-foreground">{modelConfig.learningRate}</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30">
          <div className="text-muted-foreground text-xs mb-1">Dropout</div>
          <p className="font-mono text-sm text-foreground">{modelConfig.dropout}</p>
        </div>
      </div>

      {/* Training Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={metrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="epoch" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            domain={[0, 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          
          <Line
            type="monotone"
            dataKey="trainLoss"
            name="Train Loss"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="valLoss"
            name="Val Loss"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={false}
          />
          
          <ReferenceLine
            x={bestEpoch.epoch}
            stroke="hsl(var(--success))"
            strokeDasharray="3 3"
            label={{
              value: 'Best',
              fill: 'hsl(var(--success))',
              fontSize: 10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Final Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Final Train Loss</p>
          <p className="font-mono text-lg font-semibold text-primary">
            {finalEpoch?.trainLoss.toFixed(4)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Best Val Loss</p>
          <p className="font-mono text-lg font-semibold text-accent">
            {bestEpoch?.valLoss.toFixed(4)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Final Accuracy</p>
          <p className="font-mono text-lg font-semibold text-success">
            {(finalEpoch?.accuracy * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};
