import { useState, useRef, useEffect } from 'react';
import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import { Search, X } from 'lucide-react';

export function TickerSelector() {
  const { activeTicker, setActiveTicker, peerGroup } = useTerminalStore();
  const { data: symbols } = useApi<string[]>('/symbols');
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allTickers = symbols ?? [];
  const filtered = search
    ? allTickers.filter((s) => s.toLowerCase().includes(search.toLowerCase()))
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3">
      {/* Search input */}
      <div className="relative" ref={dropdownRef}>
        <div className={`flex items-center bg-white/[0.03] border rounded-lg transition-all duration-200 ${
          focused ? 'border-blue-500/40 bg-white/[0.05] shadow-[0_0_12px_rgba(59,130,246,0.1)]' : 'border-white/[0.06]'
        }`}>
          <Search className="ml-2.5 w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
            onFocus={() => setFocused(true)}
            placeholder="Search ticker..."
            className="bg-transparent pl-2 pr-2 py-1.5 text-[12px] text-slate-200 placeholder:text-slate-600 focus:outline-none w-32 font-mono"
          />
          {search && (
            <button onClick={() => { setSearch(''); inputRef.current?.focus(); }} className="mr-2 p-0.5 hover:bg-white/[0.06] rounded">
              <X className="w-3 h-3 text-slate-500" />
            </button>
          )}
        </div>

        {focused && search && filtered.length > 0 && (
          <div className="absolute top-full left-0 mt-1.5 bg-surface-1 border border-white/[0.08] rounded-lg shadow-2xl z-50 w-full overflow-hidden backdrop-blur-xl">
            {filtered.map((s) => (
              <button
                key={s}
                onClick={() => { setActiveTicker(s); setSearch(''); setFocused(false); }}
                className="flex items-center w-full text-left px-3 py-2 text-xs font-mono hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <span className="font-semibold">{s}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="h-5 w-px bg-white/[0.06]" />

      {/* Ticker chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {[activeTicker, ...peerGroup.filter((p) => p !== activeTicker)].map((ticker) => (
          <button
            key={ticker}
            onClick={() => setActiveTicker(ticker)}
            className={`ticker-chip font-mono ${ticker === activeTicker ? 'ticker-chip-active' : 'ticker-chip-inactive'}`}
          >
            {ticker}
          </button>
        ))}
      </div>
    </div>
  );
}
