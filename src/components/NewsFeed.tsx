import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { NewsItem } from '../types/financial';
import { Newspaper, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const sentimentConfig = {
  positive: { icon: TrendingUp, color: 'text-terminal-green', bg: 'bg-terminal-green/10' },
  negative: { icon: TrendingDown, color: 'text-terminal-red', bg: 'bg-terminal-red/10' },
  neutral: { icon: Minus, color: 'text-terminal-muted', bg: 'bg-terminal-border' },
};

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export function NewsFeed() {
  const { activeTicker } = useTerminalStore();
  const { data: news } = useApi<NewsItem[]>(`/news/${activeTicker}`, [activeTicker]);

  return (
    <div className="panel terminal-glow" id="news-feed">
      <div className="panel-header flex items-center gap-2">
        <Newspaper className="w-3.5 h-3.5 text-terminal-accent" />
        Material News — {activeTicker}
      </div>

      <div className="space-y-1 max-h-80 overflow-y-auto">
        {(news ?? []).map((item, i) => {
          const sentiment = sentimentConfig[item.sentiment];
          const Icon = sentiment.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-2 py-1.5 border-b border-terminal-border/50 last:border-0 hover:bg-terminal-border/10 rounded px-1 transition-colors"
            >
              <div className={`mt-0.5 p-1 rounded ${sentiment.bg}`}>
                <Icon className={`w-3 h-3 ${sentiment.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-terminal-text leading-tight">{item.headline}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-terminal-accent">{item.source}</span>
                  <span className="text-[10px] text-terminal-muted">{timeAgo(item.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        })}
        {(!news || news.length === 0) && (
          <div className="text-xs text-terminal-muted text-center py-4">No recent news available.</div>
        )}
      </div>
    </div>
  );
}
