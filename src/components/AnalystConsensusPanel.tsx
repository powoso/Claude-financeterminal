import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { AnalystConsensus, TickerQuote } from '../types/financial';
import { formatCurrency } from '../utils/format';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';

const ratingColors: Record<string, string> = {
  'Strong Buy': '#34d399',
  Buy: '#6ee7b7',
  Hold: '#fbbf24',
  Sell: '#f87171',
  'Strong Sell': '#ef4444',
};

export function AnalystConsensusPanel() {
  const { activeTicker } = useTerminalStore();
  const { data } = useApi<AnalystConsensus>(`/consensus/${activeTicker}`, [activeTicker]);
  const { data: quote } = useApi<TickerQuote>(`/quote/${activeTicker}`, [activeTicker]);

  if (!data) {
    return (
      <div className="panel">
        <div className="panel-header"><div className="panel-dot" /> Analyst Consensus</div>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-5 w-full" />)}
        </div>
      </div>
    );
  }

  const distributionData = [
    { name: 'Strong Buy', short: 'SB', value: data.strongBuy },
    { name: 'Buy', short: 'Buy', value: data.buy },
    { name: 'Hold', short: 'Hold', value: data.hold },
    { name: 'Sell', short: 'Sell', value: data.sell },
    { name: 'Strong Sell', short: 'SS', value: data.strongSell },
  ];

  const total = data.strongBuy + data.buy + data.hold + data.sell + data.strongSell;
  const bullPct = Math.round(((data.strongBuy + data.buy) / total) * 100);
  const currentPrice = quote?.price ?? 0;
  const upsideToMean = currentPrice ? ((data.targetMean - currentPrice) / currentPrice) * 100 : 0;

  // Position of current price within target range for the visual
  const rangeSpan = data.targetHigh - data.targetLow;
  const pricePos = rangeSpan > 0 ? ((currentPrice - data.targetLow) / rangeSpan) * 100 : 50;

  return (
    <div className="panel" id="analyst-consensus">
      <div className="panel-header">
        <div className="panel-dot" />
        Analyst Consensus
        <span className="ml-auto badge badge-blue font-mono normal-case">{total} analysts</span>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Left: Price targets */}
        <div>
          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="metric-card">
              <div className="stat-label">Mean Target</div>
              <div className="text-sm font-bold text-blue-400 font-mono">{formatCurrency(data.targetMean, 0)}</div>
            </div>
            <div className="metric-card">
              <div className="stat-label">Median</div>
              <div className="text-sm font-bold text-slate-200 font-mono">{formatCurrency(data.targetMedian, 0)}</div>
            </div>
            <div className="metric-card">
              <div className="stat-label">Upside</div>
              <div className={`text-sm font-bold font-mono ${upsideToMean >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {upsideToMean >= 0 ? '+' : ''}{upsideToMean.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Range visualization */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mb-1.5">
              <span>{formatCurrency(data.targetLow, 0)}</span>
              <span>{formatCurrency(data.targetHigh, 0)}</span>
            </div>
            <div className="relative h-2.5 bg-white/[0.04] rounded-full overflow-visible">
              {/* Range fill */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-blue-500/30 to-blue-500/20" />
              {/* Mean marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-400 rounded-full"
                style={{ left: `${((data.targetMean - data.targetLow) / rangeSpan) * 100}%` }}
              />
              {/* Current price marker */}
              {currentPrice > 0 && (
                <div
                  className="absolute -top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-lg shadow-blue-500/20"
                  style={{ left: `calc(${Math.max(0, Math.min(100, pricePos))}% - 8px)` }}
                >
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-blue-400 whitespace-nowrap">
                    Current
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent ratings list */}
          {data.ratings.length > 0 && (
            <div>
              <div className="text-[9px] uppercase tracking-[0.15em] text-slate-500 font-semibold mb-2">Recent Actions</div>
              <div className="space-y-1 max-h-36 overflow-y-auto">
                {data.ratings.slice(0, 8).map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] py-1 px-1 rounded hover:bg-white/[0.02] transition-colors">
                    <span className="text-slate-300 flex-1 truncate font-medium">{r.firm}</span>
                    <span
                      className="badge text-[9px]"
                      style={{ backgroundColor: `${ratingColors[r.rating]}15`, color: ratingColors[r.rating], borderColor: `${ratingColors[r.rating]}30` }}
                    >
                      {r.rating}
                    </span>
                    <span className="text-blue-400 font-mono font-semibold w-12 text-right text-[11px]">{formatCurrency(r.priceTarget, 0)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Distribution */}
        <div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
                <XAxis
                  dataKey="short"
                  tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'JetBrains Mono' }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.04)' }}
                />
                <YAxis tick={{ fontSize: 9, fill: '#475569' }} tickLine={false} axisLine={false} width={20} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {distributionData.map((entry) => (
                    <Cell key={entry.name} fill={ratingColors[entry.name]} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sentiment bar */}
          <div className="mt-3">
            <div className="flex h-2 rounded-full overflow-hidden bg-white/[0.04]">
              {distributionData.map((d) => (
                d.value > 0 && (
                  <div
                    key={d.name}
                    className="transition-all duration-500"
                    style={{ width: `${(d.value / total) * 100}%`, backgroundColor: ratingColors[d.name] }}
                  />
                )
              ))}
            </div>
            <div className="flex items-center justify-between mt-1.5 text-[10px]">
              <span className="text-emerald-400 font-semibold">{bullPct}% Bullish</span>
              <span className="text-slate-500">{100 - bullPct}% Other</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
