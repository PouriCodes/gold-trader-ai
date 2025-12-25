import { ComposedChart, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Bar } from "recharts";
import { CandleData } from "@/lib/tradingData";

interface PriceChartProps {
  data: CandleData[];
}

export const PriceChart = ({ data }: PriceChartProps) => {
  const chartData = data.slice(-50).map(d => ({
    ...d,
    time: new Date(d.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    candleColor: d.close >= d.open ? 'hsl(142, 72%, 45%)' : 'hsl(0, 72%, 51%)',
    bodyHeight: Math.abs(d.close - d.open),
    bodyY: Math.min(d.open, d.close),
  }));

  const minPrice = Math.min(...chartData.map(d => d.low)) - 5;
  const maxPrice = Math.max(...chartData.map(d => d.high)) + 5;

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Price Action & Technical Indicators</h2>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary rounded" />
            <span className="text-muted-foreground">EMA 12</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-accent rounded" />
            <span className="text-muted-foreground">EMA 26</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-chart-purple rounded" />
            <span className="text-muted-foreground">VWAP</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="ichimokuCloud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={[minPrice, maxPrice]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            tickFormatter={(value) => `$${value}`}
            width={60}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
            itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
            formatter={(value: number, name: string) => [
              `$${value.toFixed(2)}`,
              name.toUpperCase()
            ]}
          />

          {/* Ichimoku Cloud */}
          <Area
            type="monotone"
            dataKey="ichimokuSenkouA"
            stroke="none"
            fill="url(#ichimokuCloud)"
          />

          {/* Candlestick approximation with bars */}
          <Bar 
            dataKey="high" 
            fill="transparent"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1}
          />

          {/* Price lines */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
            dot={false}
          />
          
          <Line
            type="monotone"
            dataKey="ema12"
            stroke="hsl(var(--primary))"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="0"
          />
          
          <Line
            type="monotone"
            dataKey="ema26"
            stroke="hsl(var(--accent))"
            strokeWidth={1.5}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="vwap"
            stroke="hsl(var(--chart-purple))"
            strokeWidth={1}
            dot={false}
            strokeDasharray="5 5"
          />

          <ReferenceLine 
            y={chartData[chartData.length - 1]?.close} 
            stroke="hsl(var(--primary))"
            strokeDasharray="3 3"
            strokeOpacity={0.5}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
