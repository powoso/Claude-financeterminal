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

## Installation on macOS

### Prerequisites

You need **Node.js** (v18 or later) and **npm** installed. If you don't have them, the easiest way is via Homebrew.

#### 1. Install Homebrew (if not already installed)

Open **Terminal** (Applications > Utilities > Terminal) and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen instructions. After installation, make sure Homebrew is on your PATH. On Apple Silicon Macs (M1/M2/M3/M4), add this to your shell profile:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

#### 2. Install Node.js

```bash
brew install node
```

Verify the installation:

```bash
node --version   # Should show v18.x or later
npm --version    # Should show 9.x or later
```

#### 3. Clone the repository

```bash
git clone https://github.com/powoso/Claude-financeterminal.git
cd Claude-financeterminal
```

#### 4. Install dependencies

```bash
npm install
```

This will download all required packages (~200MB). It may take a minute or two depending on your internet connection.

#### 5. Start the terminal

```bash
npm run dev
```

This starts two processes concurrently:
- **API server** on `http://localhost:3001`
- **Frontend** on `http://localhost:5173`

Open **http://localhost:5173** in your browser (Safari, Chrome, Firefox, or Arc all work).

#### 6. Stop the terminal

Press `Ctrl + C` in the Terminal window to stop both servers.

### Alternative: Using nvm (Node Version Manager)

If you prefer managing multiple Node.js versions:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Restart your terminal, then:

```bash
nvm install 20
nvm use 20
```

Then proceed from step 3 above.

### Troubleshooting (macOS)

| Issue | Solution |
|-------|----------|
| `command not found: node` | Restart your terminal, or run `source ~/.zprofile` |
| `command not found: brew` | On Apple Silicon, run `eval "$(/opt/homebrew/bin/brew shellenv)"` |
| Port 5173 already in use | Another process is using the port. Run `lsof -i :5173` to find it, then `kill <PID>` |
| Port 3001 already in use | Same as above but with `lsof -i :3001` |
| `EACCES` permission error | Don't use `sudo npm install`. Fix permissions: `sudo chown -R $(whoami) ~/.npm` |
| Slow install on Apple Silicon | Make sure you're using the native ARM version of Node, not Rosetta. Check with `node -p process.arch` (should show `arm64`) |
| Build fails with memory error | Increase Node memory: `export NODE_OPTIONS="--max-old-space-size=4096"` then retry |

## Production Build

```bash
npm run build
npm run preview
```

The `build` command compiles TypeScript and bundles the frontend into the `dist/` directory. The `preview` command serves the production build locally.

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
