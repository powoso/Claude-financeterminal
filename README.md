# Financial Intelligence Terminal

A real-time financial analysis terminal for equity research, portfolio monitoring, and investment analysis. Built with React, TypeScript, and Tailwind CSS.

![Terminal Theme](https://img.shields.io/badge/theme-dark_terminal-0c1121)
![React](https://img.shields.io/badge/react-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/typescript-5.5-3178c6)

## Features

- **Real-time Header** — Price, change, 52-week range with position indicator, market cap, volume
- **Interactive Price Chart** — 6 timeframes (1D–5Y), volume overlay, period return badge
- **Order Book Depth** — 15-level bid/ask visualization with gradient depth bars and mid-price indicator
- **Peer Comparison Table** — 13 valuation multiples across 7 companies with heat-map coloring
- **Financial Summary** — Quarterly results, TTM aggregates, and forward consensus estimates
- **Supply Chain Map** — Suppliers and customers with revenue exposure bars, clickable navigation
- **Analyst Consensus** — Target range visualization, rating distribution chart, recent actions
- **News Feed** — Sentiment-tagged headlines with source attribution
- **Risk Factors** — Severity-classified risks from 10-K filings with visual indicators
- **Insider & Politician Trading** — Transaction tracking with value highlights
- **PDF Export** — One-click snapshot to PDF

## Coverage

Pre-loaded data for semiconductor sector analysis:

| Ticker | Company |
|--------|---------|
| NVDA | NVIDIA Corporation |
| AMD | Advanced Micro Devices |
| AVGO | Broadcom Inc. |
| INTC | Intel Corporation |
| QCOM | Qualcomm Inc. |
| TSM | Taiwan Semiconductor |
| ASML | ASML Holding NV |

## Quick Start

```bash
npm install
npm run dev
```

This starts both the API server (port 3001) and the Vite dev server (port 5173).

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Recharts, Zustand, Lucide Icons
- **Backend**: Express.js with TypeScript
- **Build**: Vite 5
- **Export**: html2canvas + jsPDF

## Architecture

```
├── server/
│   ├── index.ts          # Express API with 12 endpoints
│   └── mockData.ts       # Comprehensive financial mock data
├── src/
│   ├── components/       # 11 dashboard panels
│   ├── hooks/            # useApi data fetching hook
│   ├── styles/           # Tailwind + custom animations
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Formatting utilities
│   ├── store.ts          # Zustand state management
│   └── App.tsx           # Dashboard layout
```

## Disclaimer

Data is for illustrative purposes only. Not investment advice. All analysis requires independent verification.
