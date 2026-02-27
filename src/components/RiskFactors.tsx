import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { RiskFactor } from '../types/financial';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const severityConfig = {
  high: {
    icon: AlertTriangle,
    color: 'text-rose-400',
    bg: 'bg-rose-500/[0.06]',
    border: 'border-rose-500/15',
    badge: 'badge-red',
    barColor: 'bg-rose-400',
    barWidth: 'w-full',
  },
  medium: {
    icon: AlertCircle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/[0.06]',
    border: 'border-amber-500/15',
    badge: 'badge-yellow',
    barColor: 'bg-amber-400',
    barWidth: 'w-2/3',
  },
  low: {
    icon: Info,
    color: 'text-blue-400',
    bg: 'bg-blue-500/[0.06]',
    border: 'border-blue-500/15',
    badge: 'badge-blue',
    barColor: 'bg-blue-400',
    barWidth: 'w-1/3',
  },
};

export function RiskFactors() {
  const { activeTicker } = useTerminalStore();
  const { data: risks } = useApi<RiskFactor[]>(`/risks/${activeTicker}`, [activeTicker]);

  const highCount = (risks ?? []).filter((r) => r.severity === 'high').length;

  return (
    <div className="panel" id="risk-factors">
      <div className="panel-header">
        <div className="panel-dot" style={{ backgroundColor: highCount > 2 ? '#f87171' : '#3b82f6', boxShadow: highCount > 2 ? '0 0 6px rgba(248,113,113,0.5)' : undefined }} />
        Key Risk Factors
        {highCount > 0 && (
          <span className="badge badge-red ml-auto">{highCount} High</span>
        )}
      </div>

      <div className="space-y-2.5 stagger">
        {(risks ?? []).map((risk, i) => {
          const config = severityConfig[risk.severity];
          const Icon = config.icon;
          return (
            <div
              key={i}
              className={`border ${config.border} rounded-lg overflow-hidden transition-all duration-200 hover:border-opacity-40`}
            >
              {/* Severity bar at top */}
              <div className="h-0.5 bg-white/[0.02]">
                <div className={`h-full ${config.barColor} ${config.barWidth} rounded-r-full opacity-60`} />
              </div>

              <div className={`p-3.5 ${config.bg}`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`p-1 rounded-md ${config.bg}`}>
                    <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                  </div>
                  <span className={`text-[12px] font-semibold ${config.color}`}>{risk.title}</span>
                  <span className={`badge ${config.badge} ml-auto text-[8px]`}>
                    {risk.severity.toUpperCase()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300/80 leading-relaxed pl-8">
                  {risk.summary}
                </div>
                <div className="text-[9px] text-slate-600 mt-2 pl-8 font-mono">
                  Source: {risk.source}
                </div>
              </div>
            </div>
          );
        })}
        {(!risks || risks.length === 0) && (
          <div className="text-xs text-slate-500 text-center py-8">No risk data available.</div>
        )}
      </div>
    </div>
  );
}
