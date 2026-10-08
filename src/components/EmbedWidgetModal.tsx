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

  // Frame URL based on type
  const embedCode = `<iframe src="https://webdehepseek.com" width="100%" height="450" frameborder="0"></iframe><p><a href="https://webdehepseek.com">Altyapı: WebdeHepSeek</a></p>`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(embedCode);
      setCopied(true);
      onShowToast("📋 Embed kodu başarıyla panoya kopyalandı!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0B0B0C] border border-[#D4AF37]/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(212,175,55,0.15)] text-left font-sans animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div className="space-y-1 pr-8">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest bg-[#D4AF37]/10 px-2.5 py-0.5 rounded w-max">
            White-Label Dağıtım Modülü
          </div>
          <h4 className="text-base font-serif font-black text-white flex items-center gap-2 mt-2">
            <Code size={16} className="text-[#D4AF37]" />
            Bu Aracı Sitene Ekle
          </h4>
          <p className="text-xs text-zinc-400">
            Aşağıdaki HTML kodunu kendi sitenize yapıştırarak bu profesyonel hesaplama widget'ını sıfır lisans ücretiyle yayınlayabilirsiniz.
          </p>
        </div>

        {/* Text Area */}
        <div className="mt-4 space-y-2">
          <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">HTML Embed Kodu:</label>
          <div className="relative bg-[#121214] border border-zinc-850 rounded-2xl p-3.5">
            <textarea
              readOnly
              value={embedCode}
              className="w-full h-24 bg-transparent text-zinc-300 font-mono text-[10px] sm:text-xs leading-relaxed resize-none outline-none select-all"
            />
          </div>
        </div>

        {/* Features / Benefits */}
        <div className="mt-4 p-3 bg-zinc-900/50 border border-zinc-850 rounded-2xl flex gap-3 text-[10px] text-zinc-400 leading-relaxed font-sans">
          <Shield size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Tam Sorumluluk Reddi:</strong> Widget responsive olarak çalışır. CSS stilleri sitenize otomatik uyum sağlar. Reklam içermez, hızı etkilemez.
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
            className="flex-1 py-2.5 bg-[#D4AF37] hover:brightness-110 text-black font-extrabold text-xs rounded-xl transition-all uppercase flex items-center justify-center gap-1.5"
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
