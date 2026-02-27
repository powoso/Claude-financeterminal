import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { RiskFactor } from '../types/financial';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const severityConfig = {
  high: { icon: AlertTriangle, color: 'text-terminal-red', bg: 'bg-terminal-red/10', border: 'border-terminal-red/30' },
  medium: { icon: AlertCircle, color: 'text-terminal-yellow', bg: 'bg-terminal-yellow/10', border: 'border-terminal-yellow/30' },
  low: { icon: Info, color: 'text-terminal-accent', bg: 'bg-terminal-accent/10', border: 'border-terminal-accent/30' },
};

export function RiskFactors() {
  const { activeTicker } = useTerminalStore();
  const { data: risks } = useApi<RiskFactor[]>(`/risks/${activeTicker}`, [activeTicker]);

  return (
    <div className="panel terminal-glow" id="risk-factors">
      <div className="panel-header flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-terminal-red" />
        Key Risk Factors — {activeTicker}
      </div>

      <div className="space-y-2">
        {(risks ?? []).map((risk, i) => {
          const config = severityConfig[risk.severity];
          const Icon = config.icon;
          return (
            <div
              key={i}
              className={`border ${config.border} rounded p-2.5 ${config.bg}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                <span className={`text-xs font-medium ${config.color}`}>{risk.title}</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-terminal-bg text-terminal-muted ml-auto">
                  {risk.severity}
                </span>
              </div>
              <div className="text-[11px] text-terminal-text/80 leading-relaxed pl-5">
                {risk.summary}
              </div>
              <div className="text-[9px] text-terminal-muted mt-1 pl-5">Source: {risk.source}</div>
            </div>
          );
        })}
        {(!risks || risks.length === 0) && (
          <div className="text-xs text-terminal-muted text-center py-4">No risk data available.</div>
        )}
      </div>
    </div>
  );
}
