import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { OrderBook } from '../types/financial';
import { formatCurrency, formatNumber } from '../utils/format';

export function OrderBookPanel() {
  const { activeTicker } = useTerminalStore();
  const { data: book } = useApi<OrderBook>(`/order-book/${activeTicker}`, [activeTicker]);

  if (!book) {
    return (
      <div className="panel h-full">
        <div className="panel-header">Order Book</div>
        <div className="animate-pulse space-y-1">
          {[...Array(15)].map((_, i) => <div key={i} className="h-3 bg-terminal-border rounded" />)}
        </div>
      </div>
    );
  }

  const maxTotal = Math.max(
    book.bids[book.bids.length - 1]?.total ?? 0,
    book.asks[book.asks.length - 1]?.total ?? 0
  );

  return (
    <div className="panel h-full terminal-glow" id="order-book">
      <div className="panel-header flex items-center justify-between">
        <span>
          <span className="text-terminal-accent">&#9632;</span> Order Book — {activeTicker}
        </span>
        <span className="text-[10px] normal-case font-normal">
          Spread: {formatCurrency(book.spread)} ({book.spreadPercent.toFixed(3)}%)
        </span>
      </div>

      {/* Headers */}
      <div className="grid grid-cols-3 text-[10px] text-terminal-muted mb-1 px-1">
        <span>Price</span>
        <span className="text-center">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (reversed so highest is at top) */}
      <div className="space-y-px">
        {[...book.asks].reverse().map((level, i) => (
          <div key={`ask-${i}`} className="relative grid grid-cols-3 text-[10px] font-mono py-0.5 px-1">
            <div
              className="absolute inset-0 bg-terminal-red/8"
              style={{ width: `${(level.total / maxTotal) * 100}%`, right: 0, left: 'auto' }}
            />
            <span className="relative text-terminal-red">{formatCurrency(level.price)}</span>
            <span className="relative text-center text-terminal-text">{formatNumber(level.size)}</span>
            <span className="relative text-right text-terminal-muted">{formatNumber(level.total)}</span>
          </div>
        ))}
      </div>

      {/* Spread indicator */}
      <div className="my-1 py-1 border-y border-terminal-border text-center text-[10px] text-terminal-accent font-medium">
        {formatCurrency((book.asks[0]?.price + book.bids[0]?.price) / 2)} mid
      </div>

      {/* Bids */}
      <div className="space-y-px">
        {book.bids.map((level, i) => (
          <div key={`bid-${i}`} className="relative grid grid-cols-3 text-[10px] font-mono py-0.5 px-1">
            <div
              className="absolute inset-0 bg-terminal-green/8"
              style={{ width: `${(level.total / maxTotal) * 100}%` }}
            />
            <span className="relative text-terminal-green">{formatCurrency(level.price)}</span>
            <span className="relative text-center text-terminal-text">{formatNumber(level.size)}</span>
            <span className="relative text-right text-terminal-muted">{formatNumber(level.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
