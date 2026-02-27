export interface TickerQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  volume: number;
  avgVolume: number;
  marketCap: number;
  week52High: number;
  week52Low: number;
  timestamp: string;
}

export interface ValuationMultiples {
  symbol: string;
  pe: number | null;
  forwardPe: number | null;
  evEbitda: number | null;
  evRevenue: number | null;
  pFcf: number | null;
  peg: number | null;
  debtEquity: number | null;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  fcfYield: number | null;
  revenueGrowthYoY: number;
  revenueGrowthQoQ: number;
}

export interface QuarterlyFinancial {
  period: string;
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  eps: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  fcf: number;
}

export interface FinancialSummary {
  symbol: string;
  quarters: QuarterlyFinancial[];
  ttm: QuarterlyFinancial;
  forwardEstimates: {
    source: string;
    revenueEstimate: number;
    epsEstimate: number;
    revenueGrowth: number;
  };
}

export interface PricePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  spreadPercent: number;
  timestamp: string;
}

export interface SupplyChainNode {
  name: string;
  ticker?: string;
  type: 'supplier' | 'customer';
  revenueExposure: number;
  relationship: string;
}

export interface AnalystRating {
  firm: string;
  analyst: string;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  priceTarget: number;
  date: string;
}

export interface AnalystConsensus {
  symbol: string;
  targetHigh: number;
  targetLow: number;
  targetMean: number;
  targetMedian: number;
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
  ratings: AnalystRating[];
}

export interface NewsItem {
  headline: string;
  source: string;
  timestamp: string;
  url: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface RiskFactor {
  title: string;
  summary: string;
  severity: 'high' | 'medium' | 'low';
  source: string;
}

export interface InsiderTrade {
  name: string;
  title: string;
  type: 'Buy' | 'Sell';
  shares: number;
  price: number;
  value: number;
  date: string;
}

export interface PoliticianTrade {
  politician: string;
  chamber: string;
  type: 'Purchase' | 'Sale';
  amount: string;
  date: string;
}

export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

export interface TerminalState {
  activeTicker: string;
  peerGroup: string[];
  timeRange: TimeRange;
  setActiveTicker: (ticker: string) => void;
  setPeerGroup: (peers: string[]) => void;
  setTimeRange: (range: TimeRange) => void;
}
