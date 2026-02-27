import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { TickerQuote } from '../types/financial';
import { formatCurrency, formatLargeNumber, formatVolume, formatPercent, colorForValue } from '../utils/format';
import { Activity, TrendingUp, BarChart3 } from 'lucide-react';

export function HeaderBar() {
  const { activeTicker } = useTerminalStore();
  const { data: quote } = useApi<TickerQuote>(`/quote/${activeTicker}`, [activeTicker]);

  if (!quote) {
    return (
      <div className="border-b border-terminal-border px-4 py-3">
        <div className="animate-pulse flex items-center gap-4">
          <div className="h-6 w-32 bg-terminal-border rounded" />
          <div className="h-6 w-24 bg-terminal-border rounded" />
        </div>
      </div>
    );
  }

  const changeColor = colorForValue(quote.change);

  return (
    <div className="border-b border-terminal-border px-4 py-3 terminal-glow">
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Left: Logo + Ticker Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-terminal-accent" />
            <span className="text-sm font-bold text-terminal-accent tracking-wider">FIN TERMINAL</span>
          </div>
          <div className="h-6 w-px bg-terminal-border" />
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">{quote.symbol}</span>
            <span className="text-sm text-terminal-muted">{quote.name}</span>
          </div>
        </div>

        {/* Center: Price */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{formatCurrency(quote.price)}</div>
            <div className={`text-sm font-medium ${changeColor}`}>
              {quote.change >= 0 ? '+' : ''}{formatCurrency(quote.change)} ({formatPercent(quote.changePercent)})
            </div>
          </div>
        </div>

        {/* Right: Key stats */}
        <div className="flex items-center gap-5 text-xs">
          <div>
            <div className="stat-label">52W Range</div>
            <div className="text-terminal-text">
              {formatCurrency(quote.week52Low)} — {formatCurrency(quote.week52High)}
            </div>
          </div>
          <div>
            <div className="stat-label">Market Cap</div>
            <div className="text-terminal-text flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-terminal-muted" />
              {formatLargeNumber(quote.marketCap)}
            </div>
          </div>
          <div>
            <div className="stat-label">Volume</div>
            <div className="text-terminal-text flex items-center gap-1">
              <BarChart3 className="w-3 h-3 text-terminal-muted" />
              {formatVolume(quote.volume)}
            </div>
          </div>
          <div>
            <div className="stat-label">Avg Volume</div>
            <div className="text-terminal-text">{formatVolume(quote.avgVolume)}</div>
          </div>
          <div>
            <div className="stat-label">Open</div>
            <div className="text-terminal-text">{formatCurrency(quote.open)}</div>
          </div>
          <div>
            <div className="stat-label">High / Low</div>
            <div className="text-terminal-text">
              {formatCurrency(quote.high)} / {formatCurrency(quote.low)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
