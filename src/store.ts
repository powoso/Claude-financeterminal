import { create } from 'zustand';
import type { TimeRange } from './types/financial';

interface TerminalStore {
  activeTicker: string;
  peerGroup: string[];
  timeRange: TimeRange;
  setActiveTicker: (ticker: string) => void;
  setPeerGroup: (peers: string[]) => void;
  setTimeRange: (range: TimeRange) => void;
}

export const useTerminalStore = create<TerminalStore>((set) => ({
  activeTicker: 'NVDA',
  peerGroup: ['AMD', 'AVGO', 'INTC', 'QCOM', 'TSM', 'ASML'],
  timeRange: '1Y',
  setActiveTicker: (ticker) => set({ activeTicker: ticker }),
  setPeerGroup: (peers) => set({ peerGroup: peers }),
  setTimeRange: (range) => set({ timeRange: range }),
}));
