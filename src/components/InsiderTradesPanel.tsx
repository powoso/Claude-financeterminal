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
    <div className="panel terminal-glow" id="insider-trades">
      {/* Insider Trades */}
      <div className="mb-4">
        <div className="panel-header flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-terminal-accent" />
          Insider Transactions — {activeTicker}
        </div>

        {insiderTrades && insiderTrades.length > 0 ? (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-terminal-border">
                <th className="text-left py-1 text-terminal-muted font-medium">Name</th>
                <th className="text-left py-1 text-terminal-muted font-medium">Title</th>
                <th className="text-center py-1 text-terminal-muted font-medium">Type</th>
                <th className="text-right py-1 text-terminal-muted font-medium">Shares</th>
                <th className="text-right py-1 text-terminal-muted font-medium">Price</th>
                <th className="text-right py-1 text-terminal-muted font-medium">Value</th>
                <th className="text-right py-1 text-terminal-muted font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {insiderTrades.map((trade, i) => (
                <tr key={i} className="border-b border-terminal-border/50">
                  <td className="py-1.5 text-terminal-text">{trade.name}</td>
                  <td className="py-1.5 text-terminal-muted">{trade.title}</td>
                  <td className="py-1.5 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      trade.type === 'Buy'
                        ? 'bg-terminal-green/10 text-terminal-green'
                        : 'bg-terminal-red/10 text-terminal-red'
                    }`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-1.5 text-right font-mono">{formatNumber(trade.shares)}</td>
                  <td className="py-1.5 text-right font-mono">{formatCurrency(trade.price)}</td>
                  <td className="py-1.5 text-right font-mono">{formatLargeNumber(trade.value)}</td>
                  <td className="py-1.5 text-right text-terminal-muted">{trade.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-xs text-terminal-muted text-center py-3">No recent insider transactions.</div>
        )}
      </div>

      {/* Politician Trades */}
      <div>
        <div className="panel-header flex items-center gap-2">
          <Landmark className="w-3.5 h-3.5 text-terminal-yellow" />
          Politician Trading Activity — {activeTicker}
        </div>

        {politicianTrades && politicianTrades.length > 0 ? (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-terminal-border">
                <th className="text-left py-1 text-terminal-muted font-medium">Politician</th>
                <th className="text-left py-1 text-terminal-muted font-medium">Chamber</th>
                <th className="text-center py-1 text-terminal-muted font-medium">Type</th>
                <th className="text-right py-1 text-terminal-muted font-medium">Amount</th>
                <th className="text-right py-1 text-terminal-muted font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {politicianTrades.map((trade, i) => (
                <tr key={i} className="border-b border-terminal-border/50">
                  <td className="py-1.5 text-terminal-text">{trade.politician}</td>
                  <td className="py-1.5 text-terminal-muted">{trade.chamber}</td>
                  <td className="py-1.5 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      trade.type === 'Purchase'
                        ? 'bg-terminal-green/10 text-terminal-green'
                        : 'bg-terminal-red/10 text-terminal-red'
                    }`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-1.5 text-right font-mono text-terminal-yellow">{trade.amount}</td>
                  <td className="py-1.5 text-right text-terminal-muted">{trade.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-xs text-terminal-muted text-center py-3">No politician trading activity found.</div>
        )}
      </div>
    </div>
  );
}
