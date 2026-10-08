import React, { useState, useEffect } from 'react';
import { X, Flame, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

export interface ExitIntentRetentionProps {
  onSelectArticle: (articleId: string) => void;
  onShowToast: (msg: string) => void;
}

export const ExitIntentRetention: React.FC<ExitIntentRetentionProps> = ({
  onSelectArticle,
  onShowToast
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if exit intent was already shown in this visit/session using localStorage
    const wasShown = localStorage.getItem('whsk_exit_intent_shown_2026');
    if (wasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse left through the top edge (clientX/Y coordinates)
      if (e.clientY <= 0) {
        setIsOpen(true);
        localStorage.setItem('whsk_exit_intent_shown_2026', 'true');
        onShowToast("⚡ Ayrılmadan önce size özel derlediğimiz fırsatları kaçırmayın!");
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [onShowToast]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleArticleClick = (id: string) => {
    setIsOpen(false);
    onSelectArticle(id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-55 bg-[#0B0B0C]/95 border-t-2 border-[#D4AF37] shadow-[0_-10px_50px_rgba(212,175,55,0.2)] backdrop-blur-md p-4 sm:p-5 text-left font-sans animate-slide-up">
      <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row items-center justify-between gap-4 pr-10">
        {/* Close Icon on top right */}
        <button 
          onClick={handleClose}
          className="absolute -top-1 -right-1 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
          title="Kapat"
        >
          <X size={14} />
        </button>

        {/* Text Area */}
        <div className="space-y-1 max-w-xl text-center lg:text-left shrink-0">
          <div className="inline-flex items-center gap-1.5 text-[8px] font-mono text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/20 uppercase tracking-widest">
            <Flame size={10} className="animate-pulse" />
            Ayrılmadan Önce Sınırlı Fırsat
          </div>
          <h3 className="text-xs sm:text-sm font-serif font-black text-white leading-tight">
            Ayrılmadan Önce: <span className="text-[#D4AF37]">2026'nın En Çok Okunan Teknoloji ve Finans Fırsatlarına</span> Göz Atın
          </h3>
          <p className="text-[10px] text-zinc-400">
            Arama analitik motorlarımız ve pSEO algoritmalarımızla derlenen otonom raporlar sizi bekliyor.
          </p>
        </div>

        {/* Content - 2 Popular pSEO Guides side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
          {/* Guide 1 */}
          <div 
            onClick={() => handleArticleClick('PSEO-01')}
            className="group cursor-pointer p-2.5 bg-[#121214] hover:bg-zinc-900 border border-zinc-850 hover:border-[#D4AF37]/50 rounded-xl transition-all flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Sparkles size={12} />
            </div>
            <div className="truncate text-left">
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">Gözlük Kıyaslama</span>
              <h4 className="text-[11px] font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                Apple Vision Pro vs Meta Quest 4 İncelemesi
              </h4>
            </div>
          </div>

          {/* Guide 2 */}
          <div 
            onClick={() => handleArticleClick('PSEO-02')}
            className="group cursor-pointer p-2.5 bg-[#121214] hover:bg-zinc-900 border border-zinc-850 hover:border-[#D4AF37]/50 rounded-xl transition-all flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
              <TrendingUp size={12} />
            </div>
            <div className="truncate text-left">
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">AI Ücretleri</span>
              <h4 className="text-[11px] font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                ChatGPT Plus 2026 Türkiye Fiyatı Ne Kadar?
              </h4>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex gap-2 w-full lg:w-auto shrink-0 justify-end">
          <button
            onClick={() => handleArticleClick('PSEO-01')}
            className="px-4 py-2 bg-[#D4AF37] hover:brightness-110 text-black text-[10px] font-extrabold uppercase rounded-xl transition-all flex items-center gap-1 shadow-md whitespace-nowrap"
          >
            <span>Fırsatları İncele</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};
