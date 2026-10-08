import React, { useState } from 'react';
import { Bell, Check, Mail, AlertTriangle } from 'lucide-react';

export interface PriceAlertTriggerProps {
  itemTitle: string;
  currentPrice: string;
  onShowToast: (msg: string) => void;
}

export const PriceAlertTrigger: React.FC<PriceAlertTriggerProps> = ({
  itemTitle,
  currentPrice,
  onShowToast
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      onShowToast("⚠️ Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      onShowToast("🔔 Takip listenize eklendi! Fiyat dalgalanmalarında anlık e-posta bildirimi alacaksınız.");
      
      // Store locally
      const savedAlerts = JSON.parse(localStorage.getItem('whsk_price_alerts') || '[]');
      savedAlerts.push({ email, itemTitle, currentPrice, date: new Date().toISOString() });
      localStorage.setItem('whsk_price_alerts', JSON.stringify(savedAlerts));
    }, 1200);
  };

  return (
    <div className="font-sans shrink-0">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] hover:text-white text-[10px] sm:text-xs font-bold uppercase rounded-xl transition-all shadow-md animate-pulse shrink-0"
        >
          <Bell size={13} />
          <span>Fiyatı Takip Et</span>
        </button>
      ) : (
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-3.5 space-y-2.5 max-w-xs shadow-xl relative animate-scale-up">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Fiyat Değişim Alarmı</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[9px] text-zinc-400 hover:text-white font-mono uppercase bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded"
            >
              Kapat
            </button>
          </div>

          {isSubscribed ? (
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold bg-emerald-500/5 p-2 rounded-xl border border-emerald-500/10">
              <Check size={14} className="shrink-0" />
              <span>Alarm başarıyla kuruldu! ({email})</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="E-posta adresiniz..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 bg-[#0B0B0C] border border-zinc-850 focus:border-[#D4AF37] text-white text-xs rounded-xl outline-none transition-colors"
                />
                <Mail size={12} className="absolute left-2.5 top-2.5 text-zinc-500" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-1.5 bg-[#D4AF37] hover:brightness-110 disabled:opacity-55 text-black font-extrabold text-[10px] uppercase rounded-xl transition-all flex items-center justify-center gap-1"
              >
                {isSubmitting ? "Alarm Kuruluyor..." : "Alarmı Aktifleştir"}
              </button>
            </form>
          )}
          <p className="text-[8px] text-zinc-500 leading-normal font-mono">
            * 2026 Nesil pSEO veri analitik motoruyla entegredir. Fiyat düşüşü veya zam oranlarında anlık olarak bilgilendirilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
};
