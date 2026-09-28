import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RealTimeChartProps {
  title: string;
  data: any[];
  dataKey: string;
  unit: string;
  color: string;
}

export default function RealTimeChart({ title, data, dataKey, unit, color }: RealTimeChartProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="glass-panel rounded-lg p-4">
      <h3 className="text-sm font-bold text-cyan mb-4">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a3a5c" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              stroke="#7893A8"
              fontSize={10}
            />
            <YAxis stroke="#7893A8" fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#081C2B',
                border: '1px solid #00C8FF',
                borderRadius: '8px',
              }}
              labelFormatter={formatTime}
              formatter={(value: number) => [value.toFixed(2), unit]}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
