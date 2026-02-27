import type {
  TickerQuote,
  ValuationMultiples,
  FinancialSummary,
  PricePoint,
  OrderBook,
  SupplyChainNode,
  AnalystConsensus,
  NewsItem,
  RiskFactor,
  InsiderTrade,
  PoliticianTrade,
} from '../src/types/financial';

const now = new Date().toISOString();

const stockDatabase: Record<string, {
  quote: TickerQuote;
  multiples: ValuationMultiples;
  financials: FinancialSummary;
  supplyChain: SupplyChainNode[];
  consensus: AnalystConsensus;
  news: NewsItem[];
  risks: RiskFactor[];
  insiderTrades: InsiderTrade[];
  politicianTrades: PoliticianTrade[];
}> = {
  NVDA: {
    quote: {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 875.42,
      change: 12.38,
      changePercent: 1.43,
      open: 862.50,
      high: 879.10,
      low: 858.20,
      prevClose: 863.04,
      volume: 42_800_000,
      avgVolume: 38_500_000,
      marketCap: 2_150_000_000_000,
      week52High: 974.00,
      week52Low: 473.20,
      timestamp: now,
    },
    multiples: {
      symbol: 'NVDA',
      pe: 65.2,
      forwardPe: 38.4,
      evEbitda: 52.1,
      evRevenue: 28.5,
      pFcf: 58.3,
      peg: 1.12,
      debtEquity: 0.41,
      grossMargin: 74.8,
      operatingMargin: 61.2,
      netMargin: 55.8,
      fcfYield: 1.72,
      revenueGrowthYoY: 122.4,
      revenueGrowthQoQ: 18.5,
    },
    financials: {
      symbol: 'NVDA',
      quarters: [
        { period: 'Q4 2024', revenue: 22_103, grossProfit: 16_533, operatingIncome: 13_615, netIncome: 12_285, eps: 4.93, grossMargin: 74.8, operatingMargin: 61.6, netMargin: 55.6, fcf: 11_200 },
        { period: 'Q3 2024', revenue: 18_120, grossProfit: 13_400, operatingIncome: 10_417, netIncome: 9_243, eps: 3.71, grossMargin: 73.9, operatingMargin: 57.5, netMargin: 51.0, fcf: 7_040 },
        { period: 'Q2 2024', revenue: 13_507, grossProfit: 9_462, operatingIncome: 6_800, netIncome: 6_188, eps: 2.48, grossMargin: 70.1, operatingMargin: 50.3, netMargin: 45.8, fcf: 6_100 },
        { period: 'Q1 2024', revenue: 7_192, grossProfit: 4_648, operatingIncome: 2_140, netIncome: 2_043, eps: 0.82, grossMargin: 64.6, operatingMargin: 29.8, netMargin: 28.4, fcf: 2_900 },
      ],
      ttm: { period: 'TTM', revenue: 60_922, grossProfit: 44_043, operatingIncome: 32_972, netIncome: 29_759, eps: 11.94, grossMargin: 72.3, operatingMargin: 54.1, netMargin: 48.8, fcf: 27_240 },
      forwardEstimates: { source: 'Consensus (FactSet)', revenueEstimate: 89_500, epsEstimate: 16.80, revenueGrowth: 46.9 },
    },
    supplyChain: [
      { name: 'TSMC', ticker: 'TSM', type: 'supplier', revenueExposure: 100, relationship: 'Sole foundry for advanced GPU manufacturing (4nm/5nm)' },
      { name: 'Samsung', ticker: '005930.KS', type: 'supplier', revenueExposure: 25, relationship: 'HBM3E memory supply for H100/B100' },
      { name: 'SK Hynix', ticker: '000660.KS', type: 'supplier', revenueExposure: 40, relationship: 'Primary HBM3E memory supplier' },
      { name: 'Microsoft', ticker: 'MSFT', type: 'customer', revenueExposure: 19, relationship: 'Azure AI infrastructure, largest cloud GPU buyer' },
      { name: 'Meta', ticker: 'META', type: 'customer', revenueExposure: 13, relationship: 'AI training infrastructure for LLaMA models' },
      { name: 'Amazon', ticker: 'AMZN', type: 'customer', revenueExposure: 11, relationship: 'AWS AI/ML instance infrastructure' },
      { name: 'Google', ticker: 'GOOGL', type: 'customer', revenueExposure: 9, relationship: 'GCP AI accelerator infrastructure' },
      { name: 'Tesla', ticker: 'TSLA', type: 'customer', revenueExposure: 4, relationship: 'Dojo training cluster, FSD compute' },
    ],
    consensus: {
      symbol: 'NVDA',
      targetHigh: 1200,
      targetLow: 650,
      targetMean: 1020,
      targetMedian: 1050,
      strongBuy: 28,
      buy: 15,
      hold: 5,
      sell: 1,
      strongSell: 0,
      ratings: [
        { firm: 'Morgan Stanley', analyst: 'Joseph Moore', rating: 'Strong Buy', priceTarget: 1160, date: '2024-11-22' },
        { firm: 'Goldman Sachs', analyst: 'Toshiya Hari', rating: 'Buy', priceTarget: 1100, date: '2024-11-21' },
        { firm: 'KeyBanc', analyst: 'John Vinh', rating: 'Strong Buy', priceTarget: 1200, date: '2024-11-20' },
        { firm: 'JP Morgan', analyst: 'Harlan Sur', rating: 'Strong Buy', priceTarget: 1150, date: '2024-11-19' },
        { firm: 'Bank of America', analyst: 'Vivek Arya', rating: 'Buy', priceTarget: 1100, date: '2024-11-18' },
        { firm: 'Bernstein', analyst: 'Stacy Rasgon', rating: 'Strong Buy', priceTarget: 1175, date: '2024-11-15' },
        { firm: 'Barclays', analyst: 'Tom O\'Neill', rating: 'Buy', priceTarget: 1050, date: '2024-11-14' },
        { firm: 'Citi', analyst: 'Atif Malik', rating: 'Buy', priceTarget: 1030, date: '2024-11-12' },
      ],
    },
    news: [
      { headline: 'NVIDIA Blackwell B200 GPUs seeing unprecedented demand, supply constrained through H2 2025', source: 'Reuters', timestamp: '2024-11-27T14:30:00Z', url: '#', sentiment: 'positive' },
      { headline: 'NVIDIA reports record Q3 revenue of $18.1B, beats estimates by $1.2B', source: 'Bloomberg', timestamp: '2024-11-21T16:05:00Z', url: '#', sentiment: 'positive' },
      { headline: 'China export restrictions could impact $5B+ in annual NVIDIA revenue', source: 'Financial Times', timestamp: '2024-11-20T09:15:00Z', url: '#', sentiment: 'negative' },
      { headline: 'NVIDIA announces new NIM microservices platform for enterprise AI deployment', source: 'TechCrunch', timestamp: '2024-11-19T11:00:00Z', url: '#', sentiment: 'positive' },
      { headline: 'Analysts debate sustainability of AI infrastructure spending cycle', source: 'WSJ', timestamp: '2024-11-18T08:30:00Z', url: '#', sentiment: 'neutral' },
      { headline: 'NVIDIA partners with Oracle to bring sovereign AI to enterprise cloud', source: 'CNBC', timestamp: '2024-11-15T13:45:00Z', url: '#', sentiment: 'positive' },
      { headline: 'EU proposes new semiconductor subsidy framework benefiting NVIDIA\'s European operations', source: 'Politico', timestamp: '2024-11-14T10:20:00Z', url: '#', sentiment: 'positive' },
      { headline: 'NVIDIA CUDA ecosystem faces first serious challenge from AMD ROCm improvements', source: 'The Information', timestamp: '2024-11-13T15:00:00Z', url: '#', sentiment: 'negative' },
      { headline: 'Sovereign AI push drives NVIDIA data center revenue in emerging markets', source: 'Nikkei Asia', timestamp: '2024-11-12T07:15:00Z', url: '#', sentiment: 'positive' },
      { headline: 'NVIDIA stock added to three new ESG-focused index funds', source: 'Barron\'s', timestamp: '2024-11-11T09:30:00Z', url: '#', sentiment: 'neutral' },
    ],
    risks: [
      { title: 'Customer Concentration Risk', summary: 'Top 4 hyperscale customers represent ~52% of data center revenue; loss of any major customer would materially impact financials.', severity: 'high', source: '10-K FY2024' },
      { title: 'China Export Controls', summary: 'US government restrictions on AI chip exports to China could reduce addressable market by $5-8B annually.', severity: 'high', source: '10-K FY2024' },
      { title: 'TSMC Single-Source Dependency', summary: 'All advanced GPUs manufactured at TSMC; geopolitical risk in Taiwan could disrupt entire product line.', severity: 'high', source: '10-K FY2024' },
      { title: 'AI Spending Cyclicality', summary: 'Current AI infrastructure buildout may face digestion period; capex cycles historically lead to demand corrections.', severity: 'medium', source: '10-K FY2024' },
      { title: 'Competitive Threats', summary: 'Custom ASICs from Google (TPU), Amazon (Trainium), and Microsoft (Maia) could erode GPU market share in training/inference.', severity: 'medium', source: '10-K FY2024' },
    ],
    insiderTrades: [
      { name: 'Jensen Huang', title: 'CEO', type: 'Sell', shares: 240_000, price: 870.50, value: 208_920_000, date: '2024-11-22' },
      { name: 'Colette Kress', title: 'CFO', type: 'Sell', shares: 30_000, price: 865.20, value: 25_956_000, date: '2024-11-18' },
      { name: 'Debora Shoquist', title: 'EVP Operations', type: 'Sell', shares: 15_000, price: 858.00, value: 12_870_000, date: '2024-11-15' },
    ],
    politicianTrades: [
      { politician: 'Nancy Pelosi', chamber: 'House', type: 'Purchase', amount: '$1M - $5M', date: '2024-06-20' },
      { politician: 'Tommy Tuberville', chamber: 'Senate', type: 'Purchase', amount: '$250K - $500K', date: '2024-09-12' },
    ],
  },
  AMD: {
    quote: {
      symbol: 'AMD',
      name: 'Advanced Micro Devices',
      price: 142.85,
      change: -2.15,
      changePercent: -1.48,
      open: 145.00,
      high: 146.20,
      low: 141.50,
      prevClose: 145.00,
      volume: 58_200_000,
      avgVolume: 52_000_000,
      marketCap: 230_800_000_000,
      week52High: 227.30,
      week52Low: 120.55,
      timestamp: now,
    },
    multiples: {
      symbol: 'AMD',
      pe: 46.8,
      forwardPe: 28.5,
      evEbitda: 35.2,
      evRevenue: 10.1,
      pFcf: 42.3,
      peg: 0.85,
      debtEquity: 0.04,
      grossMargin: 52.1,
      operatingMargin: 22.3,
      netMargin: 18.5,
      fcfYield: 2.36,
      revenueGrowthYoY: 18.2,
      revenueGrowthQoQ: 12.1,
    },
    financials: {
      symbol: 'AMD',
      quarters: [
        { period: 'Q3 2024', revenue: 6_819, grossProfit: 3_553, operatingIncome: 1_720, netIncome: 1_462, eps: 0.92, grossMargin: 52.1, operatingMargin: 25.2, netMargin: 21.4, fcf: 1_120 },
        { period: 'Q2 2024', revenue: 5_835, grossProfit: 2_917, operatingIncome: 1_264, netIncome: 1_126, eps: 0.69, grossMargin: 50.0, operatingMargin: 21.7, netMargin: 19.3, fcf: 900 },
        { period: 'Q1 2024', revenue: 5_473, grossProfit: 2_681, operatingIncome: 831, netIncome: 786, eps: 0.48, grossMargin: 49.0, operatingMargin: 15.2, netMargin: 14.4, fcf: 820 },
        { period: 'Q4 2023', revenue: 6_168, grossProfit: 2_961, operatingIncome: 342, netIncome: 667, eps: 0.41, grossMargin: 48.0, operatingMargin: 5.5, netMargin: 10.8, fcf: 750 },
      ],
      ttm: { period: 'TTM', revenue: 24_295, grossProfit: 12_112, operatingIncome: 4_157, netIncome: 4_041, eps: 2.50, grossMargin: 49.8, operatingMargin: 17.1, netMargin: 16.6, fcf: 3_590 },
      forwardEstimates: { source: 'Consensus (FactSet)', revenueEstimate: 32_100, epsEstimate: 5.00, revenueGrowth: 32.1 },
    },
    supplyChain: [
      { name: 'TSMC', ticker: 'TSM', type: 'supplier', revenueExposure: 100, relationship: 'Sole foundry for all advanced processors' },
      { name: 'Microsoft', ticker: 'MSFT', type: 'customer', revenueExposure: 15, relationship: 'Xbox SoC, Azure MI300X instances' },
      { name: 'Sony', ticker: 'SONY', type: 'customer', revenueExposure: 8, relationship: 'PlayStation 5 custom APU' },
    ],
    consensus: {
      symbol: 'AMD',
      targetHigh: 250,
      targetLow: 120,
      targetMean: 190,
      targetMedian: 195,
      strongBuy: 15,
      buy: 20,
      hold: 8,
      sell: 2,
      strongSell: 0,
      ratings: [
        { firm: 'Morgan Stanley', analyst: 'Joseph Moore', rating: 'Buy', priceTarget: 206, date: '2024-10-30' },
        { firm: 'Bernstein', analyst: 'Stacy Rasgon', rating: 'Buy', priceTarget: 200, date: '2024-10-29' },
      ],
    },
    news: [
      { headline: 'AMD MI300X gains traction in cloud inference workloads', source: 'Reuters', timestamp: '2024-11-25T10:00:00Z', url: '#', sentiment: 'positive' },
      { headline: 'AMD ROCm software stack narrows gap with CUDA ecosystem', source: 'The Information', timestamp: '2024-11-20T14:00:00Z', url: '#', sentiment: 'positive' },
    ],
    risks: [
      { title: 'AI GPU Market Share', summary: 'NVIDIA dominates >80% of AI training GPU market; AMD MI300 must prove software ecosystem viability.', severity: 'high', source: '10-K FY2023' },
      { title: 'TSMC Concentration', summary: 'Single-source manufacturing dependency on TSMC for all advanced products.', severity: 'high', source: '10-K FY2023' },
      { title: 'PC Market Cyclicality', summary: 'Client segment revenue tied to consumer PC refresh cycle which remains weak.', severity: 'medium', source: '10-K FY2023' },
    ],
    insiderTrades: [],
    politicianTrades: [],
  },
  AVGO: {
    quote: {
      symbol: 'AVGO',
      name: 'Broadcom Inc.',
      price: 168.50,
      change: 3.20,
      changePercent: 1.94,
      open: 165.30,
      high: 170.15,
      low: 164.80,
      prevClose: 165.30,
      volume: 28_500_000,
      avgVolume: 25_000_000,
      marketCap: 785_000_000_000,
      week52High: 186.42,
      week52Low: 99.01,
      timestamp: now,
    },
    multiples: {
      symbol: 'AVGO',
      pe: 38.5,
      forwardPe: 26.3,
      evEbitda: 24.8,
      evRevenue: 15.2,
      pFcf: 30.1,
      peg: 1.45,
      debtEquity: 1.02,
      grossMargin: 74.2,
      operatingMargin: 36.5,
      netMargin: 28.9,
      fcfYield: 3.32,
      revenueGrowthYoY: 44.1,
      revenueGrowthQoQ: 8.3,
    },
    financials: {
      symbol: 'AVGO',
      quarters: [
        { period: 'Q4 FY2024', revenue: 14_054, grossProfit: 10_428, operatingIncome: 5_893, netIncome: 4_324, eps: 0.93, grossMargin: 74.2, operatingMargin: 41.9, netMargin: 30.8, fcf: 5_600 },
        { period: 'Q3 FY2024', revenue: 13_072, grossProfit: 9_550, operatingIncome: 5_100, netIncome: 3_524, eps: 0.76, grossMargin: 73.1, operatingMargin: 39.0, netMargin: 27.0, fcf: 4_900 },
        { period: 'Q2 FY2024', revenue: 12_487, grossProfit: 9_002, operatingIncome: 4_485, netIncome: 2_121, eps: 0.46, grossMargin: 72.1, operatingMargin: 35.9, netMargin: 17.0, fcf: 4_700 },
        { period: 'Q1 FY2024', revenue: 11_961, grossProfit: 8_492, operatingIncome: 3_823, netIncome: 1_325, eps: 0.29, grossMargin: 71.0, operatingMargin: 32.0, netMargin: 11.1, fcf: 4_500 },
      ],
      ttm: { period: 'TTM', revenue: 51_574, grossProfit: 37_472, operatingIncome: 19_301, netIncome: 11_294, eps: 2.44, grossMargin: 72.6, operatingMargin: 37.4, netMargin: 21.9, fcf: 19_700 },
      forwardEstimates: { source: 'Consensus (FactSet)', revenueEstimate: 60_500, epsEstimate: 6.40, revenueGrowth: 17.3 },
    },
    supplyChain: [
      { name: 'TSMC', ticker: 'TSM', type: 'supplier', revenueExposure: 70, relationship: 'Advanced node manufacturing for networking/custom AI chips' },
      { name: 'Apple', ticker: 'AAPL', type: 'customer', revenueExposure: 20, relationship: 'Wi-Fi, Bluetooth, and custom connectivity chips for iPhone/Mac' },
      { name: 'Google', ticker: 'GOOGL', type: 'customer', revenueExposure: 12, relationship: 'Custom TPU design and networking ASICs' },
    ],
    consensus: {
      symbol: 'AVGO',
      targetHigh: 225,
      targetLow: 140,
      targetMean: 195,
      targetMedian: 200,
      strongBuy: 18,
      buy: 12,
      hold: 4,
      sell: 0,
      strongSell: 0,
      ratings: [
        { firm: 'Bernstein', analyst: 'Stacy Rasgon', rating: 'Strong Buy', priceTarget: 215, date: '2024-12-13' },
      ],
    },
    news: [
      { headline: 'Broadcom custom AI chip revenue expected to triple in FY2025', source: 'Bloomberg', timestamp: '2024-12-13T17:00:00Z', url: '#', sentiment: 'positive' },
    ],
    risks: [
      { title: 'VMware Integration Risk', summary: 'Massive $69B VMware acquisition integration complexity could distract from core semiconductor business.', severity: 'high', source: '10-K FY2024' },
      { title: 'Customer Concentration', summary: 'Apple represents ~20% of semiconductor revenue; any design loss would be material.', severity: 'high', source: '10-K FY2024' },
      { title: 'Leverage', summary: 'Elevated debt/equity of 1.0x from VMware acquisition limits financial flexibility.', severity: 'medium', source: '10-K FY2024' },
    ],
    insiderTrades: [],
    politicianTrades: [],
  },
  INTC: {
    quote: {
      symbol: 'INTC',
      name: 'Intel Corporation',
      price: 23.45,
      change: -0.82,
      changePercent: -3.38,
      open: 24.10,
      high: 24.50,
      low: 23.20,
      prevClose: 24.27,
      volume: 72_000_000,
      avgVolume: 65_000_000,
      marketCap: 100_200_000_000,
      week52High: 51.28,
      week52Low: 18.51,
      timestamp: now,
    },
    multiples: {
      symbol: 'INTC',
      pe: null,
      forwardPe: 22.1,
      evEbitda: 18.5,
      evRevenue: 1.8,
      pFcf: null,
      peg: null,
      debtEquity: 0.47,
      grossMargin: 41.4,
      operatingMargin: -3.2,
      netMargin: -16.5,
      fcfYield: null,
      revenueGrowthYoY: -2.1,
      revenueGrowthQoQ: -6.3,
    },
    financials: {
      symbol: 'INTC',
      quarters: [
        { period: 'Q3 2024', revenue: 13_284, grossProfit: 5_499, operatingIncome: -378, netIncome: -16_639, eps: -3.88, grossMargin: 41.4, operatingMargin: -2.8, netMargin: -125.2, fcf: -2_700 },
        { period: 'Q2 2024', revenue: 12_833, grossProfit: 5_006, operatingIncome: -198, netIncome: -1_610, eps: -0.38, grossMargin: 39.0, operatingMargin: -1.5, netMargin: -12.5, fcf: -1_200 },
        { period: 'Q1 2024', revenue: 12_724, grossProfit: 5_589, operatingIncome: 357, netIncome: -381, eps: -0.09, grossMargin: 43.9, operatingMargin: 2.8, netMargin: -3.0, fcf: -800 },
        { period: 'Q4 2023', revenue: 15_406, grossProfit: 7_011, operatingIncome: 2_584, netIncome: 2_669, eps: 0.63, grossMargin: 45.5, operatingMargin: 16.8, netMargin: 17.3, fcf: 500 },
      ],
      ttm: { period: 'TTM', revenue: 54_247, grossProfit: 23_105, operatingIncome: 2_365, netIncome: -15_961, eps: -3.72, grossMargin: 42.6, operatingMargin: 4.4, netMargin: -29.4, fcf: -4_200 },
      forwardEstimates: { source: 'Consensus (FactSet)', revenueEstimate: 54_800, epsEstimate: 1.06, revenueGrowth: 1.0 },
    },
    supplyChain: [
      { name: 'ASML', ticker: 'ASML', type: 'supplier', revenueExposure: 80, relationship: 'EUV lithography equipment for Intel 18A/20A process' },
      { name: 'Dell', ticker: 'DELL', type: 'customer', revenueExposure: 12, relationship: 'Server and PC processors' },
      { name: 'HP', ticker: 'HPQ', type: 'customer', revenueExposure: 10, relationship: 'PC processors' },
    ],
    consensus: {
      symbol: 'INTC',
      targetHigh: 42,
      targetLow: 17,
      targetMean: 28,
      targetMedian: 27,
      strongBuy: 1,
      buy: 5,
      hold: 28,
      sell: 8,
      strongSell: 3,
      ratings: [
        { firm: 'Bank of America', analyst: 'Vivek Arya', rating: 'Sell', priceTarget: 20, date: '2024-11-01' },
      ],
    },
    news: [
      { headline: 'Intel CEO Pat Gelsinger retires amid board pressure over turnaround strategy', source: 'WSJ', timestamp: '2024-12-01T06:00:00Z', url: '#', sentiment: 'negative' },
      { headline: 'Intel 18A process shows promising yield improvements in early production', source: 'DigiTimes', timestamp: '2024-11-28T08:00:00Z', url: '#', sentiment: 'positive' },
    ],
    risks: [
      { title: 'Foundry Execution', summary: 'Intel 18A process must achieve competitive yields to remain relevant; delays could be existential.', severity: 'high', source: '10-K FY2023' },
      { title: 'Market Share Erosion', summary: 'Continued loss of data center and PC market share to AMD and ARM-based alternatives.', severity: 'high', source: '10-K FY2023' },
      { title: 'Cash Burn', summary: 'Massive capex program for foundry buildout with negative FCF; requires sustained government subsidies.', severity: 'high', source: '10-K FY2023' },
      { title: 'Management Uncertainty', summary: 'CEO departure creates leadership vacuum during critical turnaround phase.', severity: 'high', source: 'Public filing' },
      { title: 'AI Competitive Gap', summary: 'Gaudi AI accelerators have failed to gain meaningful market share against NVIDIA and AMD.', severity: 'medium', source: '10-K FY2023' },
    ],
    insiderTrades: [],
    politicianTrades: [],
  },
  QCOM: {
    quote: {
      symbol: 'QCOM',
      name: 'Qualcomm Inc.',
      price: 167.30,
      change: 1.55,
      changePercent: 0.94,
      open: 165.80,
      high: 168.90,
      low: 164.50,
      prevClose: 165.75,
      volume: 8_200_000,
      avgVolume: 7_500_000,
      marketCap: 186_500_000_000,
      week52High: 230.63,
      week52Low: 149.12,
      timestamp: now,
    },
    multiples: {
      symbol: 'QCOM',
      pe: 18.2,
      forwardPe: 14.8,
      evEbitda: 13.5,
      evRevenue: 4.8,
      pFcf: 16.2,
      peg: 0.92,
      debtEquity: 0.56,
      grossMargin: 56.2,
      operatingMargin: 28.4,
      netMargin: 24.8,
      fcfYield: 6.17,
      revenueGrowthYoY: 18.7,
      revenueGrowthQoQ: 8.2,
    },
    financials: {
      symbol: 'QCOM',
      quarters: [
        { period: 'Q4 FY2024', revenue: 10_244, grossProfit: 5_757, operatingIncome: 3_127, netIncome: 2_920, eps: 2.69, grossMargin: 56.2, operatingMargin: 30.5, netMargin: 28.5, fcf: 3_100 },
        { period: 'Q3 FY2024', revenue: 9_393, grossProfit: 5_261, operatingIncome: 2_782, netIncome: 2_323, eps: 2.13, grossMargin: 56.0, operatingMargin: 29.6, netMargin: 24.7, fcf: 2_800 },
        { period: 'Q2 FY2024', revenue: 9_389, grossProfit: 5_230, operatingIncome: 2_520, netIncome: 2_326, eps: 2.13, grossMargin: 55.7, operatingMargin: 26.8, netMargin: 24.8, fcf: 2_700 },
        { period: 'Q1 FY2024', revenue: 9_935, grossProfit: 5_562, operatingIncome: 2_874, netIncome: 2_767, eps: 2.53, grossMargin: 56.0, operatingMargin: 28.9, netMargin: 27.8, fcf: 3_000 },
      ],
      ttm: { period: 'TTM', revenue: 38_961, grossProfit: 21_810, operatingIncome: 11_303, netIncome: 10_336, eps: 9.48, grossMargin: 56.0, operatingMargin: 29.0, netMargin: 26.5, fcf: 11_600 },
      forwardEstimates: { source: 'Consensus (FactSet)', revenueEstimate: 43_500, epsEstimate: 11.30, revenueGrowth: 11.6 },
    },
    supplyChain: [
      { name: 'TSMC', ticker: 'TSM', type: 'supplier', revenueExposure: 85, relationship: 'Primary foundry for Snapdragon SoCs' },
      { name: 'Apple', ticker: 'AAPL', type: 'customer', revenueExposure: 22, relationship: '5G modem supply (transitioning away)' },
      { name: 'Samsung', ticker: '005930.KS', type: 'customer', revenueExposure: 14, relationship: 'Snapdragon SoC for Galaxy smartphones' },
    ],
    consensus: {
      symbol: 'QCOM',
      targetHigh: 270,
      targetLow: 145,
      targetMean: 210,
      targetMedian: 215,
      strongBuy: 10,
      buy: 14,
      hold: 10,
      sell: 1,
      strongSell: 0,
      ratings: [],
    },
    news: [
      { headline: 'Qualcomm Snapdragon X Elite gains design wins in PC market', source: 'Reuters', timestamp: '2024-11-22T09:00:00Z', url: '#', sentiment: 'positive' },
    ],
    risks: [
      { title: 'Apple Modem Transition', summary: 'Apple developing in-house 5G modem; loss of Apple revenue (~22%) would be material headwind.', severity: 'high', source: '10-K FY2024' },
      { title: 'Licensing Revenue Durability', summary: 'QTL segment faces ongoing challenges from OEM pushback and potential regulatory changes.', severity: 'medium', source: '10-K FY2024' },
      { title: 'PC Market Penetration', summary: 'Snapdragon X Elite for PCs must compete against established x86 ecosystem from Intel/AMD.', severity: 'medium', source: '10-K FY2024' },
    ],
    insiderTrades: [],
    politicianTrades: [],
  },
  TSM: {
    quote: {
      symbol: 'TSM',
      name: 'Taiwan Semiconductor',
      price: 188.75,
      change: 4.25,
      changePercent: 2.30,
      open: 184.50,
      high: 190.20,
      low: 183.80,
      prevClose: 184.50,
      volume: 18_500_000,
      avgVolume: 16_200_000,
      marketCap: 978_000_000_000,
      week52High: 205.90,
      week52Low: 96.27,
      timestamp: now,
    },
    multiples: {
      symbol: 'TSM',
      pe: 28.5,
      forwardPe: 22.1,
      evEbitda: 17.8,
      evRevenue: 12.4,
      pFcf: 35.2,
      peg: 1.15,
      debtEquity: 0.24,
      grossMargin: 57.9,
      operatingMargin: 47.5,
      netMargin: 40.2,
      fcfYield: 2.84,
      revenueGrowthYoY: 36.0,
      revenueGrowthQoQ: 12.8,
    },
    financials: {
      symbol: 'TSM',
      quarters: [
        { period: 'Q3 2024', revenue: 23_501, grossProfit: 13_607, operatingIncome: 11_163, netIncome: 10_091, eps: 1.94, grossMargin: 57.9, operatingMargin: 47.5, netMargin: 42.9, fcf: 5_200 },
        { period: 'Q2 2024', revenue: 20_824, grossProfit: 11_102, operatingIncome: 8_987, netIncome: 7_649, eps: 1.48, grossMargin: 53.3, operatingMargin: 43.2, netMargin: 36.7, fcf: 4_800 },
        { period: 'Q1 2024', revenue: 18_871, grossProfit: 10_173, operatingIncome: 8_206, netIncome: 7_138, eps: 1.38, grossMargin: 53.9, operatingMargin: 43.5, netMargin: 37.8, fcf: 4_100 },
        { period: 'Q4 2023', revenue: 19_620, grossProfit: 10_437, operatingIncome: 8_372, netIncome: 7_585, eps: 1.46, grossMargin: 53.2, operatingMargin: 42.7, netMargin: 38.7, fcf: 4_500 },
      ],
      ttm: { period: 'TTM', revenue: 82_816, grossProfit: 45_319, operatingIncome: 36_728, netIncome: 32_463, eps: 6.26, grossMargin: 54.7, operatingMargin: 44.3, netMargin: 39.2, fcf: 18_600 },
      forwardEstimates: { source: 'Consensus (FactSet)', revenueEstimate: 102_000, epsEstimate: 8.55, revenueGrowth: 23.2 },
    },
    supplyChain: [
      { name: 'ASML', ticker: 'ASML', type: 'supplier', revenueExposure: 60, relationship: 'EUV lithography systems - critical manufacturing equipment' },
      { name: 'NVIDIA', ticker: 'NVDA', type: 'customer', revenueExposure: 11, relationship: 'All advanced GPU manufacturing' },
      { name: 'Apple', ticker: 'AAPL', type: 'customer', revenueExposure: 25, relationship: 'A-series and M-series chip manufacturing' },
      { name: 'AMD', ticker: 'AMD', type: 'customer', revenueExposure: 7, relationship: 'All AMD processor manufacturing' },
    ],
    consensus: {
      symbol: 'TSM',
      targetHigh: 250,
      targetLow: 155,
      targetMean: 215,
      targetMedian: 220,
      strongBuy: 22,
      buy: 10,
      hold: 3,
      sell: 0,
      strongSell: 0,
      ratings: [],
    },
    news: [
      { headline: 'TSMC Arizona fab begins 4nm production, yields improving ahead of schedule', source: 'Bloomberg', timestamp: '2024-11-26T11:00:00Z', url: '#', sentiment: 'positive' },
    ],
    risks: [
      { title: 'Geopolitical Risk - Taiwan Strait', summary: 'Cross-strait tensions represent existential risk to global semiconductor supply chain concentrated in Taiwan.', severity: 'high', source: '20-F FY2023' },
      { title: 'Customer Concentration', summary: 'Apple + NVIDIA represent ~36% of revenue; significant exposure to two customers\' demand cycles.', severity: 'high', source: '20-F FY2023' },
      { title: 'Capex Intensity', summary: '$32B+ annual capex required to maintain technology leadership; rising costs for each process node.', severity: 'medium', source: '20-F FY2023' },
    ],
    insiderTrades: [],
    politicianTrades: [],
  },
  ASML: {
    quote: {
      symbol: 'ASML',
      name: 'ASML Holding NV',
      price: 698.50,
      change: -8.40,
      changePercent: -1.19,
      open: 706.00,
      high: 710.20,
      low: 695.10,
      prevClose: 706.90,
      volume: 3_800_000,
      avgVolume: 3_200_000,
      marketCap: 274_500_000_000,
      week52High: 1110.09,
      week52Low: 600.70,
      timestamp: now,
    },
    multiples: {
      symbol: 'ASML',
      pe: 32.1,
      forwardPe: 25.8,
      evEbitda: 26.5,
      evRevenue: 10.8,
      pFcf: 38.5,
      peg: 2.10,
      debtEquity: 0.52,
      grossMargin: 51.4,
      operatingMargin: 35.6,
      netMargin: 28.4,
      fcfYield: 2.60,
      revenueGrowthYoY: 12.8,
      revenueGrowthQoQ: 20.1,
    },
    financials: {
      symbol: 'ASML',
      quarters: [
        { period: 'Q3 2024', revenue: 7_473, grossProfit: 3_841, operatingIncome: 2_776, netIncome: 2_077, eps: 5.28, grossMargin: 51.4, operatingMargin: 37.1, netMargin: 27.8, fcf: 1_800 },
        { period: 'Q2 2024', revenue: 6_243, grossProfit: 3_109, operatingIncome: 1_956, netIncome: 1_578, eps: 4.01, grossMargin: 49.8, operatingMargin: 31.3, netMargin: 25.3, fcf: 1_500 },
        { period: 'Q1 2024', revenue: 5_288, grossProfit: 2_644, operatingIncome: 1_562, netIncome: 1_224, eps: 3.11, grossMargin: 50.0, operatingMargin: 29.5, netMargin: 23.1, fcf: 1_200 },
        { period: 'Q4 2023', revenue: 7_237, grossProfit: 3_726, operatingIncome: 2_518, netIncome: 2_048, eps: 5.21, grossMargin: 51.5, operatingMargin: 34.8, netMargin: 28.3, fcf: 2_000 },
      ],
      ttm: { period: 'TTM', revenue: 26_241, grossProfit: 13_320, operatingIncome: 8_812, netIncome: 6_927, eps: 17.61, grossMargin: 50.7, operatingMargin: 33.6, netMargin: 26.4, fcf: 6_500 },
      forwardEstimates: { source: 'Consensus (FactSet)', revenueEstimate: 33_200, epsEstimate: 27.10, revenueGrowth: 26.5 },
    },
    supplyChain: [
      { name: 'Carl Zeiss SMT', type: 'supplier', revenueExposure: 50, relationship: 'Critical EUV optics supplier (exclusive)' },
      { name: 'TSMC', ticker: 'TSM', type: 'customer', revenueExposure: 32, relationship: 'Largest EUV customer for leading-edge nodes' },
      { name: 'Samsung', ticker: '005930.KS', type: 'customer', revenueExposure: 18, relationship: 'EUV systems for foundry and memory' },
      { name: 'Intel', ticker: 'INTC', type: 'customer', revenueExposure: 15, relationship: 'EUV systems for Intel 18A/20A process' },
    ],
    consensus: {
      symbol: 'ASML',
      targetHigh: 1050,
      targetLow: 650,
      targetMean: 850,
      targetMedian: 870,
      strongBuy: 14,
      buy: 10,
      hold: 6,
      sell: 1,
      strongSell: 0,
      ratings: [],
    },
    news: [
      { headline: 'ASML warns China export controls will reduce 2025 bookings by 10-15%', source: 'Reuters', timestamp: '2024-10-16T06:30:00Z', url: '#', sentiment: 'negative' },
    ],
    risks: [
      { title: 'China Export Controls', summary: 'Dutch government restrictions on DUV exports to China reduce addressable market significantly.', severity: 'high', source: '20-F FY2023' },
      { title: 'Cyclical Demand', summary: 'Semiconductor capex cycles create lumpy revenue; bookings can swing 30-50% quarter-to-quarter.', severity: 'high', source: '20-F FY2023' },
      { title: 'Technology Execution', summary: 'High-NA EUV ($350M+ per system) adoption pace uncertain; pushouts would impact revenue growth.', severity: 'medium', source: '20-F FY2023' },
    ],
    insiderTrades: [],
    politicianTrades: [],
  },
};

export function getQuote(symbol: string): TickerQuote | null {
  return stockDatabase[symbol.toUpperCase()]?.quote ?? null;
}

export function getMultiples(symbol: string): ValuationMultiples | null {
  return stockDatabase[symbol.toUpperCase()]?.multiples ?? null;
}

export function getFinancials(symbol: string): FinancialSummary | null {
  return stockDatabase[symbol.toUpperCase()]?.financials ?? null;
}

export function getSupplyChain(symbol: string): SupplyChainNode[] {
  return stockDatabase[symbol.toUpperCase()]?.supplyChain ?? [];
}

export function getConsensus(symbol: string): AnalystConsensus | null {
  return stockDatabase[symbol.toUpperCase()]?.consensus ?? null;
}

export function getNews(symbol: string): NewsItem[] {
  return stockDatabase[symbol.toUpperCase()]?.news ?? [];
}

export function getRisks(symbol: string): RiskFactor[] {
  return stockDatabase[symbol.toUpperCase()]?.risks ?? [];
}

export function getInsiderTrades(symbol: string): InsiderTrade[] {
  return stockDatabase[symbol.toUpperCase()]?.insiderTrades ?? [];
}

export function getPoliticianTrades(symbol: string): PoliticianTrade[] {
  return stockDatabase[symbol.toUpperCase()]?.politicianTrades ?? [];
}

export function getOrderBook(symbol: string): OrderBook | null {
  const quote = getQuote(symbol);
  if (!quote) return null;
  const mid = quote.price;
  const bids: OrderBookLevel[] = [];
  const asks: OrderBookLevel[] = [];
  let bidTotal = 0;
  let askTotal = 0;
  for (let i = 0; i < 15; i++) {
    const bidSize = Math.round(500 + Math.random() * 2000);
    bidTotal += bidSize;
    bids.push({ price: +(mid - 0.01 * (i + 1)).toFixed(2), size: bidSize, total: bidTotal });
    const askSize = Math.round(500 + Math.random() * 2000);
    askTotal += askSize;
    asks.push({ price: +(mid + 0.01 * (i + 1)).toFixed(2), size: askSize, total: askTotal });
  }
  return { bids, asks, spread: 0.02, spreadPercent: +((0.02 / mid) * 100).toFixed(4), timestamp: new Date().toISOString() };
}

export function generatePriceHistory(symbol: string, range: string): PricePoint[] {
  const quote = getQuote(symbol);
  if (!quote) return [];
  const currentPrice = quote.price;
  const points: PricePoint[] = [];
  let count: number;
  let intervalMs: number;
  let volatility: number;

  switch (range) {
    case '1D': count = 78; intervalMs = 5 * 60 * 1000; volatility = 0.002; break;
    case '1W': count = 5 * 13; intervalMs = 30 * 60 * 1000; volatility = 0.005; break;
    case '1M': count = 22; intervalMs = 24 * 60 * 60 * 1000; volatility = 0.015; break;
    case '3M': count = 66; intervalMs = 24 * 60 * 60 * 1000; volatility = 0.02; break;
    case '1Y': count = 252; intervalMs = 24 * 60 * 60 * 1000; volatility = 0.025; break;
    case '5Y': count = 260; intervalMs = 7 * 24 * 60 * 60 * 1000; volatility = 0.04; break;
    default: count = 252; intervalMs = 24 * 60 * 60 * 1000; volatility = 0.025;
  }

  let price = currentPrice * (0.7 + Math.random() * 0.3);
  const drift = (currentPrice - price) / count;
  const startTime = Date.now() - count * intervalMs;

  for (let i = 0; i < count; i++) {
    const change = price * volatility * (Math.random() - 0.45);
    price += drift + change;
    const open = price;
    const close = open + open * volatility * (Math.random() - 0.5);
    const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.5);
    const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.5);
    const volume = Math.round(quote.avgVolume * (0.5 + Math.random()));
    const time = new Date(startTime + i * intervalMs).toISOString();
    points.push({ time, open: +open.toFixed(2), high: +high.toFixed(2), low: +low.toFixed(2), close: +close.toFixed(2), volume });
    price = close;
  }
  return points;
}

export function getAllSymbols(): string[] {
  return Object.keys(stockDatabase);
}
