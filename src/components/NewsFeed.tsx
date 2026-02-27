import { useTerminalStore } from '../store';
import { useApi } from '../hooks/useApi';
import type { NewsItem } from '../types/financial';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const sentimentConfig = {
  positive: { icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400' },
  negative: { icon: ArrowDownRight, color: 'text-rose-400', bg: 'bg-rose-500/10', dot: 'bg-rose-400' },
  neutral: { icon: Minus, color: 'text-slate-400', bg: 'bg-white/[0.04]', dot: 'bg-slate-500' },
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
    <div className="panel" id="news-feed">
      <div className="panel-header">
        <div className="panel-dot" />
        Material News
        <span className="ml-auto text-[10px] text-slate-500 normal-case font-normal tracking-normal">
          {(news ?? []).length} stories
        </span>
      </div>

      <div className="space-y-0 max-h-[420px] overflow-y-auto">
        {(news ?? []).map((item, i) => {
          const sentiment = sentimentConfig[item.sentiment];
          const Icon = sentiment.icon;
          return (
            <div
              key={i}
              className="group flex items-start gap-3 py-3 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.015] rounded-lg px-2 -mx-1 transition-all duration-150 cursor-pointer"
            >
              {/* Sentiment indicator */}
              <div className={`mt-0.5 p-1.5 rounded-lg ${sentiment.bg} flex-shrink-0`}>
                <Icon className={`w-3.5 h-3.5 ${sentiment.color}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-slate-200 leading-snug group-hover:text-white transition-colors font-medium">
                  {item.headline}
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-semibold text-blue-400">{item.source}</span>
                  <div className="w-0.5 h-0.5 rounded-full bg-slate-600" />
                  <span className="text-[10px] text-slate-500">{timeAgo(item.timestamp)}</span>
                  <div className="w-0.5 h-0.5 rounded-full bg-slate-600" />
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${sentiment.dot}`} />
                    <span className={`text-[9px] uppercase tracking-wider ${sentiment.color} font-medium`}>
                      {item.sentiment}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {(!news || news.length === 0) && (
          <div className="text-xs text-slate-500 text-center py-8">No recent news available.</div>
        )}
      </div>
    </div>
  );
}
