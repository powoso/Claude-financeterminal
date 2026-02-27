import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { SupplyChainNode } from '../types/financial';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function SupplyChainMap() {
  const { activeTicker, setActiveTicker } = useTerminalStore();
  const { data: chain } = useApi<SupplyChainNode[]>(`/supply-chain/${activeTicker}`, [activeTicker]);

  if (!chain || chain.length === 0) {
    return (
      <div className="panel">
        <div className="panel-header">Supply Chain Map</div>
        <div className="text-xs text-terminal-muted">No supply chain data available.</div>
      </div>
    );
  }

  const suppliers = chain.filter((n) => n.type === 'supplier');
  const customers = chain.filter((n) => n.type === 'customer');

  return (
    <div className="panel terminal-glow" id="supply-chain">
      <div className="panel-header flex items-center gap-2">
        <span className="text-terminal-accent">&#9632;</span> Supply Chain Map — {activeTicker}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Suppliers */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-terminal-muted mb-2 text-center">Suppliers</div>
          <div className="space-y-2">
            {suppliers.map((node) => (
              <div
                key={node.name}
                className="bg-terminal-bg border border-terminal-border rounded p-2 hover:border-terminal-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => node.ticker && setActiveTicker(node.ticker)}
                    className="text-xs font-medium text-terminal-text hover:text-terminal-accent transition-colors"
                  >
                    {node.name}
                  </button>
                  <span className="text-[10px] text-terminal-yellow font-mono">{node.revenueExposure}%</span>
                </div>
                <div className="text-[9px] text-terminal-muted mt-1 leading-tight">{node.relationship}</div>
                {node.ticker && (
                  <div className="text-[9px] text-terminal-accent mt-0.5">{node.ticker}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Target Company */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-terminal-muted mb-4">
            <ArrowRight className="w-4 h-4" />
          </div>
          <div className="bg-terminal-accent/20 border-2 border-terminal-accent rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-terminal-accent">{activeTicker}</div>
            <div className="text-[10px] text-terminal-muted mt-1">Target Company</div>
          </div>
          <div className="flex items-center gap-2 text-terminal-muted mt-4">
            <ArrowLeft className="w-4 h-4" />
          </div>
        </div>

        {/* Customers */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-terminal-muted mb-2 text-center">Customers</div>
          <div className="space-y-2">
            {customers.map((node) => (
              <div
                key={node.name}
                className="bg-terminal-bg border border-terminal-border rounded p-2 hover:border-terminal-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => node.ticker && setActiveTicker(node.ticker)}
                    className="text-xs font-medium text-terminal-text hover:text-terminal-accent transition-colors"
                  >
                    {node.name}
                  </button>
                  <span className="text-[10px] text-terminal-yellow font-mono">{node.revenueExposure}%</span>
                </div>
                <div className="text-[9px] text-terminal-muted mt-1 leading-tight">{node.relationship}</div>
                {node.ticker && (
                  <div className="text-[9px] text-terminal-accent mt-0.5">{node.ticker}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 text-[10px] text-terminal-muted">
        Percentages indicate estimated revenue dependency. Click company names to navigate.
      </div>
    </div>
  );
}
