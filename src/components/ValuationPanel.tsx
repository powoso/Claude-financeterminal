import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { ValuationMultiples } from '../types/financial';
import { formatMultiple, formatPercent } from '../utils/format';
import { clsx } from 'clsx';

interface PeerData {
  quote: { symbol: string } | null;
  multiples: ValuationMultiples | null;
}

const metrics: { key: keyof ValuationMultiples; label: string; format: (v: number | null) => string; higherIsBetter?: boolean; group: string }[] = [
  { key: 'pe', label: 'P/E', format: (v) => formatMultiple(v, 'x'), group: 'Valuation' },
  { key: 'forwardPe', label: 'Fwd P/E', format: (v) => formatMultiple(v, 'x'), group: 'Valuation' },
  { key: 'evEbitda', label: 'EV/EBITDA', format: (v) => formatMultiple(v, 'x'), group: 'Valuation' },
  { key: 'evRevenue', label: 'EV/Revenue', format: (v) => formatMultiple(v, 'x'), group: 'Valuation' },
  { key: 'pFcf', label: 'P/FCF', format: (v) => formatMultiple(v, 'x'), group: 'Valuation' },
  { key: 'peg', label: 'PEG Ratio', format: (v) => formatMultiple(v, 'x'), group: 'Valuation' },
  { key: 'debtEquity', label: 'Debt/Equity', format: (v) => formatMultiple(v, 'x'), group: 'Leverage' },
  { key: 'grossMargin', label: 'Gross Margin', format: (v) => formatPercent(v), higherIsBetter: true, group: 'Profitability' },
  { key: 'operatingMargin', label: 'Op. Margin', format: (v) => formatPercent(v), higherIsBetter: true, group: 'Profitability' },
  { key: 'netMargin', label: 'Net Margin', format: (v) => formatPercent(v), higherIsBetter: true, group: 'Profitability' },
  { key: 'fcfYield', label: 'FCF Yield', format: (v) => formatPercent(v), higherIsBetter: true, group: 'Profitability' },
  { key: 'revenueGrowthYoY', label: 'Rev Growth YoY', format: (v) => formatPercent(v), higherIsBetter: true, group: 'Growth' },
  { key: 'revenueGrowthQoQ', label: 'Rev Growth QoQ', format: (v) => formatPercent(v), higherIsBetter: true, group: 'Growth' },
];

function getHeatmapStyle(value: number | null, allValues: (number | null)[], higherIsBetter = false): string {
  if (value === null) return 'text-slate-600';
  const valid = allValues.filter((v): v is number => v !== null);
  if (valid.length < 2) return 'text-slate-300';
  const sorted = [...valid].sort((a, b) => a - b);
  const rank = sorted.indexOf(value);
  const pct = rank / (sorted.length - 1);

  const effectivePct = higherIsBetter ? pct : 1 - pct;

  if (effectivePct >= 0.8) return 'text-emerald-400 bg-emerald-500/[0.08]';
  if (effectivePct >= 0.6) return 'text-emerald-400/70';
  if (effectivePct <= 0.2) return 'text-rose-400 bg-rose-500/[0.08]';
  if (effectivePct <= 0.4) return 'text-rose-400/70';
  return 'text-slate-300';
}

export function ValuationPanel() {
  const { activeTicker, peerGroup } = useTerminalStore();
  const allSymbols = [activeTicker, ...peerGroup.filter((p) => p !== activeTicker)];
  const { data: peers } = useApi<PeerData[]>(
    `/peer-comparison?symbols=${allSymbols.join(',')}`,
    [activeTicker, peerGroup.join(',')]
  );

  const multiplesMap: Record<string, ValuationMultiples | null> = {};
  if (peers) {
    peers.forEach((p) => {
      if (p.quote && p.multiples) multiplesMap[p.quote.symbol] = p.multiples;
    });
  }

  let lastGroup = '';

  return (
    <div className="panel overflow-x-auto" id="valuation-panel">
      <div className="panel-header">
        <div className="panel-dot" />
        Valuation Multiples
        <span className="text-slate-500 font-normal normal-case ml-1">Peer Comparison</span>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-white/[0.06]">
            <th className="text-left py-2.5 pr-4 text-[10px] uppercase tracking-wider text-slate-500 font-semibold w-36">Metric</th>
            {allSymbols.map((s) => (
              <th
                key={s}
                className={clsx(
                  'text-right py-2.5 px-3 text-[10px] uppercase tracking-wider font-semibold',
                  s === activeTicker ? 'text-blue-400' : 'text-slate-500'
                )}
              >
                <div className="flex items-center justify-end gap-1.5">
                  {s === activeTicker && <div className="w-1 h-1 rounded-full bg-blue-400" />}
                  {s}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => {
            const allValues = allSymbols.map((s) => {
              const m = multiplesMap[s];
              return m ? (m[metric.key] as number | null) : null;
            });

            const showGroupHeader = metric.group !== lastGroup;
            lastGroup = metric.group;

            return (
              <>
                {showGroupHeader && (
                  <tr key={`group-${metric.group}`}>
                    <td colSpan={allSymbols.length + 1} className="pt-3 pb-1">
                      <div className="text-[9px] uppercase tracking-[0.15em] text-blue-400/50 font-semibold">{metric.group}</div>
                    </td>
                  </tr>
                )}
                <tr
                  key={metric.key}
                  className="border-b border-white/[0.02] hover:bg-white/[0.015] transition-colors"
                >
                  <td className="py-2 pr-4 text-slate-400 font-medium">{metric.label}</td>
                  {allSymbols.map((s, i) => (
                    <td
                      key={s}
                      className={clsx(
                        'text-right py-2 px-3 font-mono text-[12px] rounded-sm transition-colors',
                        s === activeTicker && 'font-bold',
                        getHeatmapStyle(allValues[i], allValues, metric.higherIsBetter)
                      )}
                    >
                      {metric.format(allValues[i])}
                    </td>
                  ))}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
