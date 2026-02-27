import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { SupplyChainNode } from '../types/financial';
import { ChevronRight, ChevronLeft } from 'lucide-react';

function ExposureBar({ value }: { value: number }) {
  const color = value >= 50 ? 'bg-amber-400' : value >= 20 ? 'bg-blue-400' : 'bg-slate-500';
  return (
    <div className="flex items-center gap-1.5 mt-1.5">
      <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className="text-[9px] font-mono text-amber-400 font-semibold w-7 text-right">{value}%</span>
    </div>
  );
}

function ChainNode({ node, onNavigate }: { node: SupplyChainNode; onNavigate: (ticker: string) => void }) {
  return (
    <div className="group bg-surface-0/60 border border-white/[0.05] rounded-lg p-3 hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all duration-200 cursor-pointer"
      onClick={() => node.ticker && onNavigate(node.ticker)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[12px] font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
          {node.name}
        </span>
        {node.ticker && (
          <span className="text-[9px] font-mono text-blue-400/60 bg-blue-500/10 px-1.5 py-0.5 rounded">
            {node.ticker}
          </span>
        )}
      </div>
      <div className="text-[10px] text-slate-500 leading-relaxed">{node.relationship}</div>
      <ExposureBar value={node.revenueExposure} />
    </div>
  );
}

export function SupplyChainMap() {
  const { activeTicker, setActiveTicker } = useTerminalStore();
  const { data: chain } = useApi<SupplyChainNode[]>(`/supply-chain/${activeTicker}`, [activeTicker]);

  if (!chain || chain.length === 0) {
    return (
      <div className="panel">
        <div className="panel-header"><div className="panel-dot" /> Supply Chain Map</div>
        <div className="text-xs text-slate-500 text-center py-8">No supply chain data available.</div>
      </div>
    );
  }

  const suppliers = chain.filter((n) => n.type === 'supplier');
  const customers = chain.filter((n) => n.type === 'customer');

  return (
    <div className="panel" id="supply-chain">
      <div className="panel-header">
        <div className="panel-dot" />
        Supply Chain Map
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-3">
        {/* Suppliers */}
        <div>
          <div className="text-[9px] uppercase tracking-[0.15em] text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-blue-400" />
            Suppliers
          </div>
          <div className="space-y-2 stagger">
            {suppliers.map((node) => (
              <ChainNode key={node.name} node={node} onNavigate={setActiveTicker} />
            ))}
          </div>
        </div>

        {/* Center: Target */}
        <div className="flex flex-col items-center justify-center px-2">
          {/* Flow lines */}
          <div className="flex-1 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-blue-500/40" />
          <div className="my-3 relative">
            <div className="absolute -inset-3 bg-blue-500/10 rounded-xl blur-lg" />
            <div className="relative bg-surface-1 border-2 border-blue-500/40 rounded-xl px-5 py-4 text-center">
              <div className="text-lg font-extrabold text-blue-400 tracking-tight">{activeTicker}</div>
              <div className="text-[9px] uppercase tracking-[0.15em] text-slate-500 mt-1">Target</div>
            </div>
          </div>
          <div className="flex-1 w-px bg-gradient-to-b from-blue-500/40 via-blue-500/20 to-transparent" />
        </div>

        {/* Customers */}
        <div>
          <div className="text-[9px] uppercase tracking-[0.15em] text-slate-500 font-semibold mb-2 flex items-center justify-end gap-1.5">
            Customers
            <ChevronLeft className="w-3 h-3 text-blue-400" />
          </div>
          <div className="space-y-2 stagger">
            {customers.map((node) => (
              <ChainNode key={node.name} node={node} onNavigate={setActiveTicker} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] text-slate-600 text-center">
        Revenue exposure shown as percentage of total. Click to navigate.
      </div>
    </div>
  );
}
