import React, { useState } from 'react';
import { X, Copy, Check, Code, Shield } from 'lucide-react';

export interface EmbedWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgetType?: string;
  onShowToast: (msg: string) => void;
}

export const EmbedWidgetModal: React.FC<EmbedWidgetModalProps> = ({
  isOpen,
  onClose,
  widgetType = 'finans',
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Frame URL based on type with dofollow backlink credit
  const embedCode = `<iframe src="https://webdehepseek.com/widget/${widgetType}" width="100%" height="480" frameborder="0" loading="lazy"></iframe><p><a href="https://webdehepseek.com" target="_blank" title="WebdeHepSeek Finans & Teknoloji Araçları">Kaynak & Altyapı: WebdeHepSeek</a></p>`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(embedCode);
      setCopied(true);
      onShowToast("📋 Embed widget backlink kodu panoya kopyalandı!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#111827] border border-[#2563EB]/40 rounded-3xl p-6 shadow-2xl text-left font-sans">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div className="space-y-1 pr-8">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#2563EB] font-bold uppercase tracking-widest bg-[#2563EB]/10 px-2.5 py-0.5 rounded w-max border border-[#2563EB]/30">
            White-Label Widget Dağıtım & Backlink Modülü
          </div>
          <h4 className="text-base font-serif font-black text-white flex items-center gap-2 mt-2">
            <Code size={16} className="text-[#2563EB]" />
            Bu Hesaplayıcıyı Sitene Ekle
          </h4>
          <p className="text-xs text-zinc-400">
            Aşağıdaki HTML kodunu web sitenize yapıştırarak bu interaktif hesaplama aracını ücretsiz yayınlayabilir ve ziyaretçilerinize sunabilirsiniz.
          </p>
        </div>

        {/* Text Area */}
        <div className="mt-4 space-y-2">
          <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">HTML Embed & Backlink Kodu:</label>
          <div className="relative bg-[#0A0E17] border border-zinc-800 rounded-2xl p-3.5">
            <textarea
              readOnly
              value={embedCode}
              className="w-full h-24 bg-transparent text-zinc-300 font-mono text-[10px] sm:text-xs leading-relaxed resize-none outline-none select-all"
            />
          </div>
        </div>

        {/* Features / Benefits */}
        <div className="mt-4 p-3 bg-[#0A0E17] border border-zinc-800 rounded-2xl flex gap-3 text-[10px] text-zinc-400 leading-relaxed font-sans">
          <Shield size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Otomatik Uyumlu & Hızlı:</strong> Widget mobil uyumludur, sitenizin hızını etkilemez.
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition-all uppercase"
          >
            Kapat
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 bg-[#2563EB] hover:brightness-110 text-white font-extrabold text-xs rounded-xl transition-all uppercase flex items-center justify-center gap-1.5 shadow-lg"
          >
            {copied ? (
              <>
                <Check size={13} />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
