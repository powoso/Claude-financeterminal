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

export default function App() {
  return (
    <div className="min-h-screen bg-terminal-bg">
      <HeaderBar />
      <div className="px-3 pb-4 space-y-3">
        <div className="flex items-center justify-between">
          <TickerSelector />
          <PdfExport />
        </div>

        {/* Row 1: Price Chart + Order Book */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <PriceChart />
          </div>
          <div>
            <OrderBookPanel />
          </div>
        </div>

        {/* Row 2: Valuation Multiples (full width peer comparison) */}
        <ValuationPanel />

        {/* Row 3: Financials + Supply Chain */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <FinancialSummary />
          <SupplyChainMap />
        </div>

        {/* Row 4: Analyst Consensus + News Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <AnalystConsensusPanel />
          <NewsFeed />
        </div>

        {/* Row 5: Risk Factors + Insider/Politician Trades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <RiskFactors />
          <InsiderTradesPanel />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-terminal-border px-4 py-3 text-center text-[10px] text-terminal-muted">
        Financial Intelligence Terminal v1.0.0 &middot; Data for illustrative purposes only &middot; Not investment advice &middot; All analysis requires independent verification
      </footer>
    </div>
  );
}
