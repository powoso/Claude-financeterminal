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
        <div className="panel-header"><div className="panel-dot" /> Order Book</div>
        <div className="space-y-1.5">
          {[...Array(15)].map((_, i) => <div key={i} className="skeleton h-3.5 w-full" />)}
        </div>
      </div>
    );
  }

  const maxTotal = Math.max(
    book.bids[book.bids.length - 1]?.total ?? 0,
    book.asks[book.asks.length - 1]?.total ?? 0
  );
  const midPrice = (book.asks[0]?.price + book.bids[0]?.price) / 2;

  return (
    <div className="panel h-full" id="order-book">
      <div className="panel-header justify-between">
        <span className="flex items-center gap-2">
          <div className="panel-dot" />
          Order Book
        </span>
        <span className="badge badge-blue font-mono normal-case">
          Spread: {book.spreadPercent.toFixed(3)}%
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-3 text-[9px] uppercase tracking-wider text-slate-600 font-semibold mb-1.5 px-1">
        <span>Price</span>
        <span className="text-center">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (reversed — highest at top) */}
      <div className="space-y-0">
        {[...book.asks].reverse().map((level, i) => {
          const pct = (level.total / maxTotal) * 100;
          return (
            <div
              key={`ask-${i}`}
              className="relative grid grid-cols-3 text-[10px] font-mono py-[3px] px-1 rounded-sm group hover:bg-rose-500/[0.04] transition-colors"
            >
              <div
                className="absolute inset-y-0 right-0 rounded-sm opacity-60 transition-opacity group-hover:opacity-100"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(270deg, rgba(248, 113, 113, 0.10) 0%, rgba(248, 113, 113, 0.02) 100%)',
                }}
              />
              <span className="relative text-rose-400/90">{formatCurrency(level.price)}</span>
              <span className="relative text-center text-slate-400">{formatNumber(level.size)}</span>
              <span className="relative text-right text-slate-500">{formatNumber(level.total)}</span>
            </div>
          );
        })}
      </div>

      {/* Spread / Mid indicator */}
      <div className="my-2 relative">
        <div className="glow-line" />
        <div className="flex items-center justify-center -mt-2.5">
          <div className="bg-surface-1 border border-blue-500/30 rounded-full px-3 py-0.5 flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-blue-400 pulse-dot" />
            <span className="text-[11px] font-bold text-blue-400 font-mono">{formatCurrency(midPrice)}</span>
          </div>
        </div>
      </div>

      {/* Bids */}
      <div className="space-y-0">
        {book.bids.map((level, i) => {
          const pct = (level.total / maxTotal) * 100;
          return (
            <div
              key={`bid-${i}`}
              className="relative grid grid-cols-3 text-[10px] font-mono py-[3px] px-1 rounded-sm group hover:bg-emerald-500/[0.04] transition-colors"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-sm opacity-60 transition-opacity group-hover:opacity-100"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, rgba(52, 211, 153, 0.10) 0%, rgba(52, 211, 153, 0.02) 100%)',
                }}
              />
              <span className="relative text-emerald-400/90">{formatCurrency(level.price)}</span>
              <span className="relative text-center text-slate-400">{formatNumber(level.size)}</span>
              <span className="relative text-right text-slate-500">{formatNumber(level.total)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
