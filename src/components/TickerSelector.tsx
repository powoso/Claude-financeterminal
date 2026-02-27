import { useState } from 'react';
import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import { Search } from 'lucide-react';

export function TickerSelector() {
  const { activeTicker, setActiveTicker, peerGroup } = useTerminalStore();
  const { data: symbols } = useApi<string[]>('/symbols');
  const [search, setSearch] = useState('');

  const allTickers = symbols ?? [];
  const filtered = search
    ? allTickers.filter((s) => s.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="flex items-center gap-3 py-2">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-terminal-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
          placeholder="Search ticker..."
          className="bg-terminal-panel border border-terminal-border rounded pl-7 pr-3 py-1.5 text-xs text-terminal-text placeholder:text-terminal-muted focus:outline-none focus:border-terminal-accent w-40"
        />
        {search && filtered.length > 0 && (
          <div className="absolute top-full left-0 mt-1 bg-terminal-panel border border-terminal-border rounded shadow-xl z-50 w-40 max-h-48 overflow-y-auto">
            {filtered.map((s) => (
              <button
                key={s}
                onClick={() => { setActiveTicker(s); setSearch(''); }}
                className="block w-full text-left px-3 py-1.5 text-xs hover:bg-terminal-accent/20 text-terminal-text"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ticker chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {[activeTicker, ...peerGroup.filter((p) => p !== activeTicker)].map((ticker) => (
          <button
            key={ticker}
            onClick={() => setActiveTicker(ticker)}
            className={`ticker-chip ${ticker === activeTicker ? 'ticker-chip-active' : 'ticker-chip-inactive'}`}
          >
            {ticker}
          </button>
        ))}
      </div>
    </div>
  );
}
