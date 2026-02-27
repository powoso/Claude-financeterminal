import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { ValuationMultiples } from '../types/financial';
import { formatMultiple, formatPercent } from '../utils/format';
import { clsx } from 'clsx';

interface PeerData {
  quote: { symbol: string } | null;
  multiples: ValuationMultiples | null;
}

const metrics: { key: keyof ValuationMultiples; label: string; format: (v: number | null) => string; higherIsBetter?: boolean }[] = [
  { key: 'pe', label: 'P/E', format: (v) => formatMultiple(v, 'x') },
  { key: 'forwardPe', label: 'Fwd P/E', format: (v) => formatMultiple(v, 'x') },
  { key: 'evEbitda', label: 'EV/EBITDA', format: (v) => formatMultiple(v, 'x') },
  { key: 'evRevenue', label: 'EV/Revenue', format: (v) => formatMultiple(v, 'x') },
  { key: 'pFcf', label: 'P/FCF', format: (v) => formatMultiple(v, 'x') },
  { key: 'peg', label: 'PEG', format: (v) => formatMultiple(v, 'x') },
  { key: 'debtEquity', label: 'Debt/Equity', format: (v) => formatMultiple(v, 'x') },
  { key: 'grossMargin', label: 'Gross Margin', format: (v) => formatPercent(v), higherIsBetter: true },
  { key: 'operatingMargin', label: 'Op. Margin', format: (v) => formatPercent(v), higherIsBetter: true },
  { key: 'netMargin', label: 'Net Margin', format: (v) => formatPercent(v), higherIsBetter: true },
  { key: 'fcfYield', label: 'FCF Yield', format: (v) => formatPercent(v), higherIsBetter: true },
  { key: 'revenueGrowthYoY', label: 'Rev Growth YoY', format: (v) => formatPercent(v), higherIsBetter: true },
  { key: 'revenueGrowthQoQ', label: 'Rev Growth QoQ', format: (v) => formatPercent(v), higherIsBetter: true },
];

function getCellColor(value: number | null, allValues: (number | null)[], higherIsBetter = false): string {
  if (value === null) return '';
  const valid = allValues.filter((v): v is number => v !== null);
  if (valid.length < 2) return '';
  const sorted = [...valid].sort((a, b) => a - b);
  const rank = sorted.indexOf(value);
  const pct = rank / (sorted.length - 1);
  if (higherIsBetter) {
    if (pct >= 0.75) return 'bg-terminal-green/10 text-terminal-green';
    if (pct <= 0.25) return 'bg-terminal-red/10 text-terminal-red';
  } else {
    if (pct <= 0.25) return 'bg-terminal-green/10 text-terminal-green';
    if (pct >= 0.75) return 'bg-terminal-red/10 text-terminal-red';
  }
  return '';
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

  return (
    <div className="panel terminal-glow overflow-x-auto" id="valuation-panel">
      <div className="panel-header flex items-center gap-2">
        <span className="text-terminal-accent">&#9632;</span> Valuation Multiples — Peer Comparison
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-terminal-border">
            <th className="text-left py-2 pr-4 text-terminal-muted font-medium">Metric</th>
            {allSymbols.map((s) => (
              <th
                key={s}
                className={clsx(
                  'text-right py-2 px-2 font-medium',
                  s === activeTicker ? 'text-terminal-accent' : 'text-terminal-muted'
                )}
              >
                {s}
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
            return (
              <tr key={metric.key} className="border-b border-terminal-border/50 hover:bg-terminal-border/20">
                <td className="py-1.5 pr-4 text-terminal-muted">{metric.label}</td>
                {allSymbols.map((s, i) => (
                  <td
                    key={s}
                    className={clsx(
                      'text-right py-1.5 px-2 font-mono',
                      s === activeTicker && 'font-semibold',
                      getCellColor(allValues[i], allValues, metric.higherIsBetter)
                    )}
                  >
                    {metric.format(allValues[i])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
