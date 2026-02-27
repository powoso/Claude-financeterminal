import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { AnalystConsensus } from '../types/financial';
import { formatCurrency } from '../utils/format';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

const ratingColors: Record<string, string> = {
  'Strong Buy': '#22c55e',
  Buy: '#4ade80',
  Hold: '#eab308',
  Sell: '#f87171',
  'Strong Sell': '#ef4444',
};

export function AnalystConsensusPanel() {
  const { activeTicker } = useTerminalStore();
  const { data } = useApi<AnalystConsensus>(`/consensus/${activeTicker}`, [activeTicker]);

  if (!data) {
    return (
      <div className="panel">
        <div className="panel-header">Analyst Consensus</div>
        <div className="animate-pulse space-y-2">
          {[...Array(4)].map((_, i) => <div key={i} className="h-4 bg-terminal-border rounded" />)}
        </div>
      </div>
    );
  }

  const distributionData = [
    { name: 'Strong Buy', value: data.strongBuy },
    { name: 'Buy', value: data.buy },
    { name: 'Hold', value: data.hold },
    { name: 'Sell', value: data.sell },
    { name: 'Strong Sell', value: data.strongSell },
  ];

  const total = data.strongBuy + data.buy + data.hold + data.sell + data.strongSell;

  return (
    <div className="panel terminal-glow" id="analyst-consensus">
      <div className="panel-header flex items-center gap-2">
        <span className="text-terminal-accent">&#9632;</span> Analyst Consensus — {data.symbol}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left: Target range */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-terminal-muted">Price Target Range</span>
            <span className="text-terminal-accent font-medium">
              {formatCurrency(data.targetLow)} — {formatCurrency(data.targetHigh)}
            </span>
          </div>

          {/* Visual range bar */}
          <div className="relative h-6 bg-terminal-bg rounded border border-terminal-border mb-3">
            <div
              className="absolute top-0 bottom-0 bg-terminal-accent/20 rounded"
              style={{
                left: `${((data.targetLow - data.targetLow * 0.9) / (data.targetHigh * 1.1 - data.targetLow * 0.9)) * 100}%`,
                right: `${100 - ((data.targetHigh - data.targetLow * 0.9) / (data.targetHigh * 1.1 - data.targetLow * 0.9)) * 100}%`,
              }}
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-terminal-accent"
              style={{
                left: `${((data.targetMean - data.targetLow * 0.9) / (data.targetHigh * 1.1 - data.targetLow * 0.9)) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-terminal-bg rounded p-2 text-center">
              <div className="stat-label">Mean Target</div>
              <div className="text-sm font-bold text-terminal-accent">{formatCurrency(data.targetMean)}</div>
            </div>
            <div className="bg-terminal-bg rounded p-2 text-center">
              <div className="stat-label">Median Target</div>
              <div className="text-sm font-bold text-terminal-text">{formatCurrency(data.targetMedian)}</div>
            </div>
          </div>

          {/* Recent ratings */}
          {data.ratings.length > 0 && (
            <div className="mt-3">
              <div className="text-[10px] text-terminal-muted uppercase tracking-wider mb-1">Recent Ratings</div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {data.ratings.slice(0, 6).map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] py-0.5">
                    <span className="text-terminal-text truncate flex-1">{r.firm}</span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-medium mx-1"
                      style={{ backgroundColor: `${ratingColors[r.rating]}20`, color: ratingColors[r.rating] }}
                    >
                      {r.rating}
                    </span>
                    <span className="text-terminal-accent font-mono w-14 text-right">{formatCurrency(r.priceTarget, 0)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Distribution chart */}
        <div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 8, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#1e293b' }}
                />
                <YAxis tick={{ fontSize: 9, fill: '#64748b' }} tickLine={false} axisLine={false} width={25} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #1e293b',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: '#e2e8f0',
                  }}
                />
                <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                  {distributionData.map((entry) => (
                    <Cell key={entry.name} fill={ratingColors[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-[10px] text-terminal-muted mt-1">
            {total} analysts covering &middot; {((data.strongBuy + data.buy) / total * 100).toFixed(0)}% Buy or better
          </div>
        </div>
      </div>
    </div>
  );
}
