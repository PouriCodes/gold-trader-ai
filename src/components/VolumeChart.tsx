import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { CandleData } from "@/lib/tradingData";

interface VolumeChartProps {
  data: CandleData[];
}

export const VolumeChart = ({ data }: VolumeChartProps) => {
  const chartData = data.slice(-50).map(d => ({
    time: new Date(d.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    volume: d.volume,
    isUp: d.close >= d.open,
  }));

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <h2 className="text-lg font-semibold text-foreground mb-4">Volume Analysis</h2>
      
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [`${(value / 1000).toFixed(1)}K`, 'Volume']}
          />
          <Bar dataKey="volume" radius={[2, 2, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.isUp ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
                fillOpacity={0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Volume Statistics */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Avg Volume</p>
          <p className="font-mono text-sm font-medium text-foreground">
            {(data.reduce((sum, d) => sum + d.volume, 0) / data.length / 1000).toFixed(1)}K
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Max Volume</p>
          <p className="font-mono text-sm font-medium text-success">
            {(Math.max(...data.map(d => d.volume)) / 1000).toFixed(1)}K
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Current</p>
          <p className="font-mono text-sm font-medium text-primary">
            {(data[data.length - 1].volume / 1000).toFixed(1)}K
          </p>
        </div>
      </div>
    </div>
  );
};
