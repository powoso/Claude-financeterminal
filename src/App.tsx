import { HeaderBar } from './components/HeaderBar';
import { TickerSelector } from './components/TickerSelector';
import { ValuationPanel } from './components/ValuationPanel';
import { FinancialSummary } from './components/FinancialSummary';
import { PriceChart } from './components/PriceChart';
import { OrderBookPanel } from './components/OrderBookPanel';
import { SupplyChainMap } from './components/SupplyChainMap';
import { AnalystConsensusPanel } from './components/AnalystConsensusPanel';
import { NewsFeed } from './components/NewsFeed';
import { RiskFactors } from './components/RiskFactors';
import { InsiderTradesPanel } from './components/InsiderTradesPanel';
import { PdfExport } from './components/PdfExport';
import { useTerminalStore } from './store';

export default function App() {
  const { activeTicker } = useTerminalStore();

  return (
    <div className="min-h-screen bg-terminal-bg" key={activeTicker}>
      {/* Header */}
      <HeaderBar />

      {/* Controls bar */}
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between py-3">
          <TickerSelector />
          <PdfExport />
        </div>
        <div className="glow-line" />
      </div>

      {/* Main dashboard grid */}
      <div className="px-4 lg:px-6 py-4 space-y-4 stagger">
        {/* Row 1: Price Chart + Order Book */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 animate-fade-in">
            <PriceChart />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '60ms' }}>
            <OrderBookPanel />
          </div>
        </div>

        {/* Row 2: Valuation Multiples (full width peer comparison) */}
        <div className="animate-fade-in" style={{ animationDelay: '120ms' }}>
          <ValuationPanel />
        </div>

        {/* Row 3: Financials + Supply Chain */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          <div className="xl:col-span-3 animate-fade-in" style={{ animationDelay: '180ms' }}>
            <FinancialSummary />
          </div>
          <div className="xl:col-span-2 animate-fade-in" style={{ animationDelay: '240ms' }}>
            <SupplyChainMap />
          </div>
        </div>

        {/* Row 4: Analyst Consensus + News Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <AnalystConsensusPanel />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '360ms' }}>
            <NewsFeed />
          </div>
        </div>

        {/* Row 5: Risk Factors + Insider/Politician Trades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="animate-fade-in" style={{ animationDelay: '420ms' }}>
            <RiskFactors />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '480ms' }}>
            <InsiderTradesPanel />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-4 border-t border-white/[0.04] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
              <span className="text-[10px] text-slate-500 font-medium">LIVE</span>
            </div>
            <span className="text-[10px] text-slate-600">|</span>
            <span className="text-[10px] text-slate-500 font-mono">v1.0.0</span>
          </div>
          <div className="text-[10px] text-slate-600 text-center">
            Data for illustrative purposes only &middot; Not investment advice &middot; All analysis requires independent verification
          </div>
          <div className="text-[10px] text-slate-600 font-mono">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </footer>
    </div>
  );
}
