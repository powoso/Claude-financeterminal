import express from 'express';
import cors from 'cors';
import {
  getQuote,
  getMultiples,
  getFinancials,
  getSupplyChain,
  getConsensus,
  getNews,
  getRisks,
  getInsiderTrades,
  getPoliticianTrades,
  getOrderBook,
  generatePriceHistory,
  getAllSymbols,
} from './mockData';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/symbols', (_req, res) => {
  res.json(getAllSymbols());
});

app.get('/api/quote/:symbol', (req, res) => {
  const data = getQuote(req.params.symbol);
  if (!data) return res.status(404).json({ error: 'Symbol not found' });
  res.json(data);
});

app.get('/api/multiples/:symbol', (req, res) => {
  const data = getMultiples(req.params.symbol);
  if (!data) return res.status(404).json({ error: 'Symbol not found' });
  res.json(data);
});

app.get('/api/financials/:symbol', (req, res) => {
  const data = getFinancials(req.params.symbol);
  if (!data) return res.status(404).json({ error: 'Symbol not found' });
  res.json(data);
});

app.get('/api/supply-chain/:symbol', (req, res) => {
  res.json(getSupplyChain(req.params.symbol));
});

app.get('/api/consensus/:symbol', (req, res) => {
  const data = getConsensus(req.params.symbol);
  if (!data) return res.status(404).json({ error: 'Symbol not found' });
  res.json(data);
});

app.get('/api/news/:symbol', (req, res) => {
  res.json(getNews(req.params.symbol));
});

app.get('/api/risks/:symbol', (req, res) => {
  res.json(getRisks(req.params.symbol));
});

app.get('/api/insider-trades/:symbol', (req, res) => {
  res.json(getInsiderTrades(req.params.symbol));
});

app.get('/api/politician-trades/:symbol', (req, res) => {
  res.json(getPoliticianTrades(req.params.symbol));
});

app.get('/api/order-book/:symbol', (req, res) => {
  const data = getOrderBook(req.params.symbol);
  if (!data) return res.status(404).json({ error: 'Symbol not found' });
  res.json(data);
});

app.get('/api/price-history/:symbol', (req, res) => {
  const range = (req.query.range as string) || '1Y';
  res.json(generatePriceHistory(req.params.symbol, range));
});

// Batch endpoint for peer comparison
app.get('/api/peer-comparison', (req, res) => {
  const symbols = ((req.query.symbols as string) || '').split(',').filter(Boolean);
  const result = symbols.map((s) => ({
    quote: getQuote(s),
    multiples: getMultiples(s),
  }));
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Financial Intelligence Terminal API running on port ${PORT}`);
});
