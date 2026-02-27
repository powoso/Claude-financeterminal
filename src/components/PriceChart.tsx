import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { PricePoint, TimeRange } from '../types/financial';
import { formatCurrency, formatVolume } from '../utils/format';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const timeRanges: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

function formatXAxis(time: string, range: TimeRange): string {
  const d = new Date(time);
  if (range === '1D') return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  if (range === '1W') return d.toLocaleDateString('en-US', { weekday: 'short' });
  if (range === '1M' || range === '3M') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

export function PriceChart() {
  const { activeTicker, timeRange, setTimeRange } = useTerminalStore();
  const { data: priceData } = useApi<PricePoint[]>(
    `/price-history/${activeTicker}?range=${timeRange}`,
    [activeTicker, timeRange]
  );

  const chartData = priceData?.map((p) => ({
    ...p,
    label: formatXAxis(p.time, timeRange),
  })) ?? [];

  const prices = chartData.map((d) => d.close);
  const minPrice = prices.length ? Math.min(...prices) * 0.995 : 0;
  const maxPrice = prices.length ? Math.max(...prices) * 1.005 : 100;
  const isPositive = chartData.length >= 2 && chartData[chartData.length - 1].close >= chartData[0].close;

  return (
    <div className="panel terminal-glow" id="price-chart">
      <div className="flex items-center justify-between mb-3">
        <div className="panel-header mb-0">
          <span className="text-terminal-accent">&#9632;</span> Price History — {activeTicker}
        </div>
        <div className="flex gap-1">
          {timeRanges.map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                r === timeRange
                  ? 'bg-terminal-accent text-white'
                  : 'text-terminal-muted hover:text-terminal-text hover:bg-terminal-border'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 9, fill: '#64748b' }}
              tickLine={false}
              axisLine={{ stroke: '#1e293b' }}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="price"
              domain={[minPrice, maxPrice]}
              tick={{ fontSize: 9, fill: '#64748b' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `$${v.toFixed(0)}`}
              width={55}
            />
            <YAxis
              yAxisId="volume"
              orientation="right"
              tick={false}
              axisLine={false}
              domain={[0, (max: number) => max * 4]}
              width={0}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid #1e293b',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#e2e8f0',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'close') return [formatCurrency(value), 'Close'];
                if (name === 'volume') return [formatVolume(value), 'Volume'];
                return [value, name];
              }}
              labelFormatter={(label: string) => label}
            />
            <Bar yAxisId="volume" dataKey="volume" fill="#1e293b" opacity={0.5} />
            <Area
              yAxisId="price"
              type="monotone"
              dataKey="close"
              stroke={isPositive ? '#22c55e' : '#ef4444'}
              strokeWidth={1.5}
              fill="url(#priceGrad)"
              dot={false}
              activeDot={{ r: 3, fill: isPositive ? '#22c55e' : '#ef4444' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
