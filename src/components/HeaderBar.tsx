import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { TickerQuote } from '../types/financial';
import { formatCurrency, formatLargeNumber, formatVolume, formatPercent } from '../utils/format';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

function StatBlock({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="px-3">
      <div className="text-[9px] uppercase tracking-[0.15em] text-slate-600 font-medium mb-0.5">{label}</div>
      <div className="text-[13px] font-semibold text-slate-200 font-mono leading-tight">{value}</div>
      {sub && <div className="text-[10px] text-slate-500 font-mono">{sub}</div>}
    </div>
  );
}

export function HeaderBar() {
  const { activeTicker } = useTerminalStore();
  const { data: quote } = useApi<TickerQuote>(`/quote/${activeTicker}`, [activeTicker]);

  if (!quote) {
    return (
      <div className="border-b border-white/[0.04] px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="skeleton h-5 w-28" />
          <div className="skeleton h-8 w-32" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
    );
  }

  const isPositive = quote.change >= 0;
  const Arrow = isPositive ? ArrowUpRight : ArrowDownRight;

  // 52-week position as percentage
  const weekRange = quote.week52High - quote.week52Low;
  const weekPos = weekRange > 0 ? ((quote.price - quote.week52Low) / weekRange) * 100 : 50;

  return (
    <header className="relative border-b border-white/[0.04] px-4 lg:px-6 py-4">
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left: Brand + Ticker */}
        <div className="flex items-center gap-5">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Activity className="w-5 h-5 text-blue-400" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
            </div>
            <div>
              <div className="text-[13px] font-bold tracking-[0.08em] text-white">FIN<span className="text-blue-400">TERMINAL</span></div>
              <div className="text-[8px] uppercase tracking-[0.2em] text-slate-600 -mt-0.5">Real-time Intelligence</div>
            </div>
          </div>

          <div className="h-10 w-px bg-white/[0.06]" />

          {/* Ticker + Name */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white tracking-tight">{quote.symbol}</span>
              <span className="badge badge-blue">{quote.name.includes('Corporation') ? 'Corp' : quote.name.split(' ').pop()}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">{quote.name}</div>
          </div>
        </div>

        {/* Center: Price block */}
        <div className="flex items-baseline gap-4">
          <div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {formatCurrency(quote.price)}
            </div>
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${
            isPositive ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'
          }`}>
            <Arrow className={`w-4 h-4 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`} />
            <div>
              <span className={`text-sm font-bold font-mono ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPositive ? '+' : ''}{formatCurrency(quote.change)}
              </span>
              <span className={`text-xs ml-1 font-mono ${isPositive ? 'text-emerald-400/70' : 'text-rose-400/70'}`}>
                ({formatPercent(quote.changePercent)})
              </span>
            </div>
          </div>
        </div>

        {/* Right: Key stats */}
        <div className="flex items-center divide-x divide-white/[0.06]">
          <StatBlock label="Market Cap" value={formatLargeNumber(quote.marketCap)} />
          <StatBlock label="Volume" value={formatVolume(quote.volume)} sub={`Avg: ${formatVolume(quote.avgVolume)}`} />
          <StatBlock label="Day Range" value={`${formatCurrency(quote.low)} — ${formatCurrency(quote.high)}`} />
          <div className="px-3">
            <div className="text-[9px] uppercase tracking-[0.15em] text-slate-600 font-medium mb-1">52W Range</div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500">{formatCurrency(quote.week52Low, 0)}</span>
              <div className="relative w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-rose-500/60 via-amber-500/60 to-emerald-500/60"
                  style={{ width: `${weekPos}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border-2 border-blue-500"
                  style={{ left: `calc(${weekPos}% - 4px)` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-500">{formatCurrency(quote.week52High, 0)}</span>
            </div>
          </div>
          <StatBlock label="Prev Close" value={formatCurrency(quote.prevClose)} />
        </div>
      </div>
    </header>
  );
}
