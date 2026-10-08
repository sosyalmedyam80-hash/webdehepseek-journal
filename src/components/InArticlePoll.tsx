import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';

export interface InArticlePollProps {
  articleId: string;
  title: string;
}

export const InArticlePoll: React.FC<InArticlePollProps> = ({ articleId, title }) => {
  const storageKey = `whsk_poll_voted_${articleId}`;
  
  // Deterministic initial state based on articleId to give unique starting votes per article
  const initialVotes = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < articleId.length; i++) {
      hash = articleId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const yesCount = Math.abs((hash % 150) + 80); // between 80 and 230
    const noCount = Math.abs(((hash >> 3) % 90) + 40); // between 40 and 130
    return { yes: yesCount, no: noCount };
  }, [articleId]);

  const [votedOption, setVotedOption] = useState<'yes' | 'no' | null>(null);
  const [votes, setVotes] = useState({ yes: initialVotes.yes, no: initialVotes.no });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'yes' || saved === 'no') {
      setVotedOption(saved);
      // If voted, add +1 to the loaded counts to represent user's vote
      setVotes({
        yes: saved === 'yes' ? initialVotes.yes + 1 : initialVotes.yes,
        no: saved === 'no' ? initialVotes.no + 1 : initialVotes.no
      });
    }
  }, [storageKey, initialVotes]);

  const handleVote = (option: 'yes' | 'no') => {
    if (votedOption) return; // cannot vote twice
    
    localStorage.setItem(storageKey, option);
    setVotedOption(option);
    setVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
  };

  const totalVotes = votes.yes + votes.no;
  const yesPercentage = Math.round((votes.yes / totalVotes) * 100) || 50;
  const noPercentage = 100 - yesPercentage;

  return (
    <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-4 text-left font-sans shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-[#D4AF37]" size={16} />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            SAYFA İÇİ CANLI KAMUOYU ANKETİ
          </h4>
        </div>
        <span className="text-[9px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">
          MİKRO-OYLAMA
        </span>
      </div>

      <div className="space-y-3">
        <h5 className="text-sm font-serif font-extrabold text-white leading-relaxed">
          Görüşünüz Nedir? Bu teknoloji / fiyat sizce 2026 beklentilerini karşılıyor mu?
        </h5>
        
        {votedOption ? (
          // VOTED STATE: SHOW PERCENTAGE PROGRESS BARS
          <div className="space-y-3.5 pt-1">
            {/* Yes Option Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-300 flex items-center gap-1.5">
                  <ThumbsUp size={12} className={votedOption === 'yes' ? 'text-[#D4AF37]' : 'text-zinc-500'} />
                  <span>Kesinlikle Başarılı</span>
                  {votedOption === 'yes' && <span className="text-[9px] font-mono bg-[#D4AF37]/10 text-[#D4AF37] px-1 py-0.2 rounded font-bold">Tercihiniz</span>}
                </span>
                <span className="text-[#D4AF37] font-mono font-bold">{yesPercentage}% ({votes.yes} oy)</span>
              </div>
              <div className="w-full h-3 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-500 rounded-full transition-all duration-1000"
                  style={{ width: `${yesPercentage}%` }}
                />
              </div>
            </div>

            {/* No Option Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-300 flex items-center gap-1.5">
                  <ThumbsDown size={12} className={votedOption === 'no' ? 'text-[#D4AF37]' : 'text-zinc-500'} />
                  <span>Yetersiz / Pahalı</span>
                  {votedOption === 'no' && <span className="text-[9px] font-mono bg-[#D4AF37]/10 text-[#D4AF37] px-1 py-0.2 rounded font-bold">Tercihiniz</span>}
                </span>
                <span className="text-zinc-500 font-mono font-bold">{noPercentage}% ({votes.no} oy)</span>
              </div>
              <div className="w-full h-3 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-zinc-700 rounded-full transition-all duration-1000"
                  style={{ width: `${noPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/5 px-2.5 py-1.5 rounded-lg border border-emerald-500/10 justify-center">
              <CheckCircle size={10} />
              <span>Oyunuz güvenli olarak kaydedildi. Katılımınız için teşekkür ederiz! (Toplam Oy: {totalVotes})</span>
            </div>
          </div>
        ) : (
          // UNVOTED STATE: SHOW ACTION BUTTONS
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => handleVote('yes')}
              className="flex items-center justify-center gap-2 py-3 bg-[#0B0B0C] hover:bg-[#D4AF37]/10 border border-zinc-800 hover:border-[#D4AF37]/60 rounded-2xl text-zinc-300 hover:text-[#D4AF37] text-xs font-extrabold uppercase transition-all shadow-sm"
            >
              <ThumbsUp size={14} className="text-[#D4AF37]" />
              <span>👍 Kesinlikle Başarılı</span>
            </button>
            <button
              onClick={() => handleVote('no')}
              className="flex items-center justify-center gap-2 py-3 bg-[#0B0B0C] hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl text-zinc-300 hover:text-white text-xs font-extrabold uppercase transition-all shadow-sm"
            >
              <ThumbsDown size={14} className="text-rose-400" />
              <span>👎 Yetersiz / Pahalı</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
