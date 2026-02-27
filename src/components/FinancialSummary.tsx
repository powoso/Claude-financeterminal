import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { FinancialSummary as FinancialSummaryType, QuarterlyFinancial } from '../types/financial';
import { formatRevenueM, formatPercent } from '../utils/format';
import { clsx } from 'clsx';

type MetricConfig = {
  label: string;
  getValue: (q: QuarterlyFinancial) => string;
  getColor: (q: QuarterlyFinancial) => string;
  fwd?: (f: FinancialSummaryType['forwardEstimates']) => string;
};

const metricRows: MetricConfig[] = [
  { label: 'Revenue', getValue: (q) => formatRevenueM(q.revenue), getColor: () => 'text-slate-200', fwd: (f) => formatRevenueM(f.revenueEstimate) },
  { label: 'Gross Profit', getValue: (q) => formatRevenueM(q.grossProfit), getColor: () => 'text-slate-300' },
  { label: 'Op. Income', getValue: (q) => formatRevenueM(q.operatingIncome), getColor: (q) => q.operatingIncome < 0 ? 'text-rose-400' : 'text-slate-300' },
  { label: 'Net Income', getValue: (q) => formatRevenueM(q.netIncome), getColor: (q) => q.netIncome < 0 ? 'text-rose-400' : 'text-slate-300' },
  { label: 'EPS', getValue: (q) => `$${q.eps.toFixed(2)}`, getColor: (q) => q.eps < 0 ? 'text-rose-400' : 'text-slate-200', fwd: (f) => `$${f.epsEstimate.toFixed(2)}` },
  { label: 'Gross Margin', getValue: (q) => formatPercent(q.grossMargin), getColor: () => 'text-slate-300' },
  { label: 'Op. Margin', getValue: (q) => formatPercent(q.operatingMargin), getColor: (q) => q.operatingMargin < 0 ? 'text-rose-400' : 'text-slate-300' },
  { label: 'Net Margin', getValue: (q) => formatPercent(q.netMargin), getColor: (q) => q.netMargin < 0 ? 'text-rose-400' : 'text-slate-300' },
  { label: 'FCF', getValue: (q) => formatRevenueM(q.fcf), getColor: (q) => q.fcf < 0 ? 'text-rose-400' : 'text-emerald-400/80' },
];

export function FinancialSummary() {
  const { activeTicker } = useTerminalStore();
  const { data } = useApi<FinancialSummaryType>(`/financials/${activeTicker}`, [activeTicker]);

  if (!data) {
    return (
      <div className="panel">
        <div className="panel-header"><div className="panel-dot" /> Financial Summary</div>
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => <div key={i} className="skeleton h-4 w-full" />)}
        </div>
      </div>
    );
  }

  const periods = [...data.quarters, data.ttm];

  return (
    <div className="panel overflow-x-auto">
      <div className="panel-header">
        <div className="panel-dot" />
        Financial Summary
        <span className="text-slate-500 font-normal normal-case ml-1">({data.symbol})</span>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-white/[0.06]">
            <th className="text-left py-2.5 pr-3 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Metric</th>
            {periods.map((q) => (
              <th
                key={q.period}
                className={clsx(
                  'text-right py-2.5 px-2.5 text-[10px] uppercase tracking-wider font-semibold',
                  q.period === 'TTM' ? 'text-blue-400' : 'text-slate-500'
                )}
              >
                {q.period === 'TTM' && <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mr-1 align-middle" />}
                {q.period}
              </th>
            ))}
            <th className="text-right py-2.5 px-2.5 text-[10px] uppercase tracking-wider font-semibold text-amber-400">
              Fwd Est.
            </th>
          </tr>
        </thead>
        <tbody>
          {metricRows.map((metric) => (
            <tr key={metric.label} className="border-b border-white/[0.02] hover:bg-white/[0.015] transition-colors">
              <td className="py-2 pr-3 text-slate-400 font-medium">{metric.label}</td>
              {periods.map((q) => (
                <td
                  key={q.period}
                  className={clsx(
                    'text-right py-2 px-2.5 font-mono text-[12px]',
                    q.period === 'TTM' && 'font-semibold',
                    metric.getColor(q)
                  )}
                >
                  {metric.getValue(q)}
                </td>
              ))}
              <td className="text-right py-2 px-2.5 font-mono text-[12px] text-amber-400/80 font-medium">
                {metric.fwd ? metric.fwd(data.forwardEstimates) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-slate-500">
        <span>Source: {data.forwardEstimates.source}</span>
        <span className="badge badge-blue">
          Fwd Rev Growth: {formatPercent(data.forwardEstimates.revenueGrowth)}
        </span>
      </div>
    </div>
  );
}
