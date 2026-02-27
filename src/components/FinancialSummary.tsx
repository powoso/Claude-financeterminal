import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { FinancialSummary as FinancialSummaryType } from '../types/financial';
import { formatRevenueM, formatPercent } from '../utils/format';
import { clsx } from 'clsx';

export function FinancialSummary() {
  const { activeTicker } = useTerminalStore();
  const { data } = useApi<FinancialSummaryType>(`/financials/${activeTicker}`, [activeTicker]);

  if (!data) {
    return (
      <div className="panel">
        <div className="panel-header">Financial Summary</div>
        <div className="animate-pulse space-y-2">
          {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-terminal-border rounded w-full" />)}
        </div>
      </div>
    );
  }

  const periods = [...data.quarters, data.ttm];

  return (
    <div className="panel terminal-glow overflow-x-auto">
      <div className="panel-header flex items-center gap-2">
        <span className="text-terminal-accent">&#9632;</span> Financial Summary — {data.symbol}
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-terminal-border">
            <th className="text-left py-2 pr-3 text-terminal-muted font-medium">Metric</th>
            {periods.map((q) => (
              <th
                key={q.period}
                className={clsx(
                  'text-right py-2 px-2 font-medium',
                  q.period === 'TTM' ? 'text-terminal-accent' : 'text-terminal-muted'
                )}
              >
                {q.period}
              </th>
            ))}
            <th className="text-right py-2 px-2 font-medium text-terminal-yellow">FWD Est.</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-terminal-border/50">
            <td className="py-1.5 pr-3 text-terminal-muted">Revenue</td>
            {periods.map((q) => (
              <td key={q.period} className="text-right py-1.5 px-2 font-mono">{formatRevenueM(q.revenue)}</td>
            ))}
            <td className="text-right py-1.5 px-2 font-mono text-terminal-yellow">{formatRevenueM(data.forwardEstimates.revenueEstimate)}</td>
          </tr>
          <tr className="border-b border-terminal-border/50">
            <td className="py-1.5 pr-3 text-terminal-muted">Gross Profit</td>
            {periods.map((q) => (
              <td key={q.period} className="text-right py-1.5 px-2 font-mono">{formatRevenueM(q.grossProfit)}</td>
            ))}
            <td className="text-right py-1.5 px-2 font-mono text-terminal-muted">—</td>
          </tr>
          <tr className="border-b border-terminal-border/50">
            <td className="py-1.5 pr-3 text-terminal-muted">Op. Income</td>
            {periods.map((q) => (
              <td key={q.period} className={clsx('text-right py-1.5 px-2 font-mono', q.operatingIncome < 0 && 'text-terminal-red')}>
                {formatRevenueM(q.operatingIncome)}
              </td>
            ))}
            <td className="text-right py-1.5 px-2 font-mono text-terminal-muted">—</td>
          </tr>
          <tr className="border-b border-terminal-border/50">
            <td className="py-1.5 pr-3 text-terminal-muted">Net Income</td>
            {periods.map((q) => (
              <td key={q.period} className={clsx('text-right py-1.5 px-2 font-mono', q.netIncome < 0 && 'text-terminal-red')}>
                {formatRevenueM(q.netIncome)}
              </td>
            ))}
            <td className="text-right py-1.5 px-2 font-mono text-terminal-muted">—</td>
          </tr>
          <tr className="border-b border-terminal-border/50">
            <td className="py-1.5 pr-3 text-terminal-muted">EPS</td>
            {periods.map((q) => (
              <td key={q.period} className={clsx('text-right py-1.5 px-2 font-mono', q.eps < 0 && 'text-terminal-red')}>
                ${q.eps.toFixed(2)}
              </td>
            ))}
            <td className="text-right py-1.5 px-2 font-mono text-terminal-yellow">${data.forwardEstimates.epsEstimate.toFixed(2)}</td>
          </tr>
          <tr className="border-b border-terminal-border/50">
            <td className="py-1.5 pr-3 text-terminal-muted">Gross Margin</td>
            {periods.map((q) => (
              <td key={q.period} className="text-right py-1.5 px-2 font-mono">{formatPercent(q.grossMargin)}</td>
            ))}
            <td className="text-right py-1.5 px-2 font-mono text-terminal-muted">—</td>
          </tr>
          <tr className="border-b border-terminal-border/50">
            <td className="py-1.5 pr-3 text-terminal-muted">Op. Margin</td>
            {periods.map((q) => (
              <td key={q.period} className={clsx('text-right py-1.5 px-2 font-mono', q.operatingMargin < 0 && 'text-terminal-red')}>
                {formatPercent(q.operatingMargin)}
              </td>
            ))}
            <td className="text-right py-1.5 px-2 font-mono text-terminal-muted">—</td>
          </tr>
          <tr className="border-b border-terminal-border/50">
            <td className="py-1.5 pr-3 text-terminal-muted">Net Margin</td>
            {periods.map((q) => (
              <td key={q.period} className={clsx('text-right py-1.5 px-2 font-mono', q.netMargin < 0 && 'text-terminal-red')}>
                {formatPercent(q.netMargin)}
              </td>
            ))}
            <td className="text-right py-1.5 px-2 font-mono text-terminal-muted">—</td>
          </tr>
          <tr>
            <td className="py-1.5 pr-3 text-terminal-muted">FCF</td>
            {periods.map((q) => (
              <td key={q.period} className={clsx('text-right py-1.5 px-2 font-mono', q.fcf < 0 && 'text-terminal-red')}>
                {formatRevenueM(q.fcf)}
              </td>
            ))}
            <td className="text-right py-1.5 px-2 font-mono text-terminal-muted">—</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-2 text-[10px] text-terminal-muted">
        Forward estimates source: {data.forwardEstimates.source} | Revenue growth: {formatPercent(data.forwardEstimates.revenueGrowth)}
      </div>
    </div>
  );
}
