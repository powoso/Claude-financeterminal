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
  ReferenceLine,
} from 'recharts';

const timeRanges: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

function formatXAxis(time: string, range: TimeRange): string {
  const d = new Date(time);
  if (range === '1D') return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  if (range === '1W') return d.toLocaleDateString('en-US', { weekday: 'short' });
  if (range === '1M' || range === '3M') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  const close = payload.find((p) => p.dataKey === 'close')?.value;
  const vol = payload.find((p) => p.dataKey === 'volume')?.value;
  return (
    <div className="bg-surface-1/95 backdrop-blur-md border border-white/[0.08] rounded-lg px-3 py-2 shadow-2xl">
      <div className="text-[10px] text-slate-500 mb-1 font-medium">{label}</div>
      {close !== undefined && (
        <div className="text-sm font-bold text-white font-mono">{formatCurrency(close)}</div>
      )}
      {vol !== undefined && (
        <div className="text-[10px] text-slate-400 font-mono mt-0.5">Vol: {formatVolume(vol)}</div>
      )}
    </div>
  );
}

export function PriceChart() {
  const { activeTicker, timeRange, setTimeRange } = useTerminalStore();
  const { data: priceData, loading } = useApi<PricePoint[]>(
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
  const avgPrice = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
  const isPositive = chartData.length >= 2 && chartData[chartData.length - 1].close >= chartData[0].close;
  const accentColor = isPositive ? '#34d399' : '#f87171';

  // Stats
  const lastPrice = prices[prices.length - 1] ?? 0;
  const firstPrice = prices[0] ?? 0;
  const periodChange = firstPrice ? ((lastPrice - firstPrice) / firstPrice) * 100 : 0;

  return (
    <div className="panel h-full" id="price-chart">
      <div className="flex items-center justify-between mb-4">
        <div className="panel-header mb-0">
          <div className="panel-dot" />
          Price History
          <span className="text-slate-500 font-normal normal-case ml-1">({activeTicker})</span>
          {/* Period return badge */}
          {chartData.length > 0 && (
            <span className={`ml-2 badge ${periodChange >= 0 ? 'badge-green' : 'badge-red'}`}>
              {periodChange >= 0 ? '+' : ''}{periodChange.toFixed(2)}%
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-lg p-0.5">
          {timeRanges.map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide transition-all duration-200 ${
                r === timeRange
                  ? 'bg-blue-500/20 text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="skeleton w-full h-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 8, right: 8, bottom: 4, left: 4 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accentColor} stopOpacity={0.2} />
                  <stop offset="50%" stopColor={accentColor} stopOpacity={0.05} />
                  <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.03)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 9, fill: '#475569', fontFamily: 'JetBrains Mono' }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.04)' }}
                interval="preserveStartEnd"
              />
              <YAxis
                yAxisId="price"
                domain={[minPrice, maxPrice]}
                tick={{ fontSize: 9, fill: '#475569', fontFamily: 'JetBrains Mono' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `$${v.toFixed(0)}`}
                width={50}
              />
              <YAxis
                yAxisId="volume"
                orientation="right"
                tick={false}
                axisLine={false}
                domain={[0, (max: number) => max * 5]}
                width={0}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeDasharray: '3 3' }} />
              <ReferenceLine
                yAxisId="price"
                y={avgPrice}
                stroke="rgba(59,130,246,0.15)"
                strokeDasharray="4 4"
                label={false}
              />
              <Bar
                yAxisId="volume"
                dataKey="volume"
                fill="url(#volumeGradient)"
                radius={[1, 1, 0, 0]}
              />
              <Area
                yAxisId="price"
                type="monotone"
                dataKey="close"
                stroke={accentColor}
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: accentColor,
                  stroke: '#0c1121',
                  strokeWidth: 2,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
