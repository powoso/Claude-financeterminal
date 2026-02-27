import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { InsiderTrade, PoliticianTrade } from '../types/financial';
import { formatCurrency, formatLargeNumber, formatNumber } from '../utils/format';
import { Users, Landmark } from 'lucide-react';

export function InsiderTradesPanel() {
  const { activeTicker } = useTerminalStore();
  const { data: insiderTrades } = useApi<InsiderTrade[]>(`/insider-trades/${activeTicker}`, [activeTicker]);
  const { data: politicianTrades } = useApi<PoliticianTrade[]>(`/politician-trades/${activeTicker}`, [activeTicker]);

  return (
    <div className="panel" id="insider-trades">
      {/* Insider Trades Section */}
      <div className="mb-5">
        <div className="panel-header">
          <div className="panel-dot" />
          <Users className="w-3.5 h-3.5 text-blue-400" />
          Insider Transactions
        </div>

        {insiderTrades && insiderTrades.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="text-left pr-3">Name</th>
                  <th className="text-left pr-3">Title</th>
                  <th className="text-center px-2">Type</th>
                  <th className="text-right px-2">Shares</th>
                  <th className="text-right px-2">Price</th>
                  <th className="text-right px-2">Value</th>
                  <th className="text-right pl-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {insiderTrades.map((trade, i) => (
                  <tr key={i}>
                    <td className="pr-3 font-medium text-slate-200">{trade.name}</td>
                    <td className="pr-3 text-slate-500">{trade.title}</td>
                    <td className="text-center px-2">
                      <span className={`badge ${trade.type === 'Buy' ? 'badge-green' : 'badge-red'}`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="text-right px-2 font-mono">{formatNumber(trade.shares)}</td>
                    <td className="text-right px-2 font-mono">{formatCurrency(trade.price)}</td>
                    <td className="text-right px-2 font-mono text-amber-400">{formatLargeNumber(trade.value)}</td>
                    <td className="text-right pl-2 text-slate-500 font-mono">{trade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-xs text-slate-500 text-center py-4 bg-white/[0.02] rounded-lg border border-white/[0.03]">
            No recent insider transactions.
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="glow-line mb-5" />

      {/* Politician Trades Section */}
      <div>
        <div className="panel-header">
          <Landmark className="w-3.5 h-3.5 text-amber-400" />
          Politician Trading
          {politicianTrades && politicianTrades.length > 0 && (
            <span className="badge badge-yellow ml-auto">{politicianTrades.length} trades</span>
          )}
        </div>

        {politicianTrades && politicianTrades.length > 0 ? (
          <div className="space-y-2">
            {politicianTrades.map((trade, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg hover:bg-white/[0.03] transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-slate-200">{trade.politician}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{trade.chamber}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{trade.date}</div>
                </div>
                <span className={`badge ${trade.type === 'Purchase' ? 'badge-green' : 'badge-red'}`}>
                  {trade.type}
                </span>
                <span className="text-sm font-bold text-amber-400 font-mono">{trade.amount}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-500 text-center py-4 bg-white/[0.02] rounded-lg border border-white/[0.03]">
            No politician trading activity found.
          </div>
        )}
      </div>
    </div>
  );
}
