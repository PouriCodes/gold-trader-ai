import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis } from "recharts";
import { EDAStats, DistributionData, CandleData, getFeatureDistribution } from "@/lib/tradingData";
import { useState } from "react";
import { Button } from "./ui/button";

interface EDAPanelProps {
  stats: EDAStats[];
  data: CandleData[];
}

export const EDAPanel = ({ stats, data }: EDAPanelProps) => {
  const [selectedFeature, setSelectedFeature] = useState<keyof CandleData>('close');
  const distribution = getFeatureDistribution(data, selectedFeature);

  const correlationMatrix = [
    { name: 'Close', close: 1, volume: 0.12, rsi: 0.45, ema: 0.98, vwap: 0.95 },
    { name: 'Volume', close: 0.12, volume: 1, rsi: -0.15, ema: 0.1, vwap: 0.18 },
    { name: 'RSI', close: 0.45, volume: -0.15, rsi: 1, ema: 0.42, vwap: 0.38 },
    { name: 'EMA', close: 0.98, volume: 0.1, rsi: 0.42, ema: 1, vwap: 0.92 },
    { name: 'VWAP', close: 0.95, volume: 0.18, rsi: 0.38, ema: 0.92, vwap: 1 },
  ];

  const features: (keyof CandleData)[] = ['close', 'volume', 'rsi', 'ema12', 'vwap'];

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h2 className="text-lg font-semibold text-foreground mb-4">Exploratory Data Analysis</h2>

      {/* Feature Statistics Table */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 text-muted-foreground font-medium">Feature</th>
              <th className="text-right py-2 text-muted-foreground font-medium">Mean</th>
              <th className="text-right py-2 text-muted-foreground font-medium">Std</th>
              <th className="text-right py-2 text-muted-foreground font-medium">Min</th>
              <th className="text-right py-2 text-muted-foreground font-medium">Max</th>
              <th className="text-right py-2 text-muted-foreground font-medium">Corr</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.feature} className="border-b border-border/30 hover:bg-secondary/20">
                <td className="py-2 font-mono text-primary">{stat.feature}</td>
                <td className="py-2 text-right font-mono">{stat.mean.toLocaleString()}</td>
                <td className="py-2 text-right font-mono text-muted-foreground">{stat.std.toLocaleString()}</td>
                <td className="py-2 text-right font-mono text-destructive">{stat.min.toLocaleString()}</td>
                <td className="py-2 text-right font-mono text-success">{stat.max.toLocaleString()}</td>
                <td className="py-2 text-right">
                  <span className={`font-mono px-2 py-0.5 rounded ${
                    stat.correlation > 0.7 ? 'bg-success/20 text-success' : 
                    stat.correlation > 0.4 ? 'bg-primary/20 text-primary' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {stat.correlation.toFixed(3)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feature Distribution */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">Feature Distribution</h3>
          <div className="flex gap-1">
            {features.map((feature) => (
              <Button
                key={feature}
                variant={selectedFeature === feature ? 'gold' : 'ghost'}
                size="sm"
                onClick={() => setSelectedFeature(feature)}
                className="text-xs px-2 py-1 h-7"
              >
                {feature.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={distribution} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis 
              dataKey="range" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [value, 'Count']}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {distribution.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(var(--primary) / ${0.4 + (index / distribution.length) * 0.6})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Correlation Heatmap */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Correlation Matrix</h3>
        <div className="grid grid-cols-6 gap-1 text-xs">
          <div></div>
          {['Close', 'Vol', 'RSI', 'EMA', 'VWAP'].map((header) => (
            <div key={header} className="text-center text-muted-foreground font-medium py-1">
              {header}
            </div>
          ))}
          {correlationMatrix.map((row) => (
            <>
              <div key={`label-${row.name}`} className="text-muted-foreground font-medium py-2 pr-2">
                {row.name}
              </div>
              {[row.close, row.volume, row.rsi, row.ema, row.vwap].map((value, i) => (
                <div
                  key={`${row.name}-${i}`}
                  className="text-center py-2 rounded font-mono"
                  style={{
                    backgroundColor: `hsl(var(--primary) / ${Math.abs(value) * 0.5})`,
                    color: Math.abs(value) > 0.5 ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                  }}
                >
                  {value.toFixed(2)}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
