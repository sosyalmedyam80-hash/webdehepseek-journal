import React, { useState } from 'react';
import { X, Send, Award, Zap, HelpCircle, Check } from 'lucide-react';

export interface PressReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const PressReleaseModal: React.FC<PressReleaseModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [selectedPrPackage, setSelectedPrPackage] = useState<'standard' | 'headline' | 'authority'>('headline');
  const [prCompanyName, setPrCompanyName] = useState('');
  const [pressReleaseTitle, setPressReleaseTitle] = useState('');
  const [pressReleaseBody, setPressReleaseBody] = useState('');
  const [prEmail, setPrEmail] = useState('');
  const [prPhone, setPrPhone] = useState('');
  const [isPressReleaseSubmitting, setIsPressReleaseSubmitting] = useState(false);
  const [isSuccess, setIsPrSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePressReleaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prCompanyName || !pressReleaseTitle || !pressReleaseBody || !prEmail || !prPhone) {
      onShowToast("⚠️ Lütfen tüm alanları eksiksiz doldurunuz.");
      return;
    }

    setIsPressReleaseSubmitting(true);
    setTimeout(() => {
      setIsPressReleaseSubmitting(false);
      setIsPrSuccess(true);
      onShowToast("🚀 Basın bülteni talebiniz başarıyla editör masasına iletildi!");
      
      // Save locally
      const savedPRs = JSON.parse(localStorage.getItem('whsk_press_releases') || '[]');
      savedPRs.push({
        selectedPrPackage,
        prCompanyName,
        pressReleaseTitle,
        pressReleaseBody,
        prEmail,
        prPhone,
        date: new Date().toISOString()
      });
      localStorage.setItem('whsk_press_releases', JSON.stringify(savedPRs));
    }, 1500);
  };

  const getWhatsAppLink = () => {
    const packageName = selectedPrPackage === 'standard' 
      ? 'Standart Bülten (1.500 TL)' 
      : selectedPrPackage === 'headline' 
        ? 'Manşet PR Paketi (3.500 TL)' 
        : 'Maksimum Otorite & Sosyal Medya (6.000 TL)';
    
    const text = `Merhaba WebdeHepSeeK Editör Masası, PR Paket Siparişi vermek istiyorum.\nSeçilen Paket: ${packageName}\nŞirket: ${prCompanyName || 'Belirtilmedi'}\nBaşlık: ${pressReleaseTitle || 'Belirtilmedi'}`;
    return `https://wa.me/905000000000?text=${encodeURIComponent(text)}`;
  };

  const getEmailLink = () => {
    const subject = "WebdeHepSeeK PR Sponsorlu Bülten Talebi";
    const body = `Şirket: ${prCompanyName}\nPaket: ${selectedPrPackage}\nBaşlık: ${pressReleaseTitle}\nİçerik: ${pressReleaseBody}\nTelefon: ${prPhone}\nE-posta: ${prEmail}`;
    return `mailto:sosyalmedyam80@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121215] border border-[#D4AF37] max-w-xl w-full rounded-3xl p-6 space-y-5 shadow-2xl my-8 relative text-left font-sans">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Send className="text-[#D4AF37]" size={18} />
          <h3 className="text-lg font-serif font-black text-white">
            Sponsorlu Basın Bülteni & PR Portalı
          </h3>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <Check size={24} />
            </div>
            <h4 className="text-sm font-bold text-white font-serif uppercase tracking-wider">
              PR Talebiniz Editör Masasına Gönderildi!
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
              Şirketiniz adına basın bülteniniz uzman heyetimiz tarafından incelendikten sonra maksimum 2 saat içinde yayına alınacaktır. Ödeme doğrulaması ve aktivasyon için sizinle iletişime geçeceğiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>Hemen WhatsApp ile Onayla</span>
              </a>
              <button
                onClick={() => {
                  setIsPrSuccess(false);
                  setPrCompanyName('');
                  setPressReleaseTitle('');
                  setPrEmail('');
                  setPrPhone('');
                  setPressReleaseBody('');
                  onClose();
                }}
                className="px-5 py-2.5 bg-[#0B0B0C] border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-bold uppercase rounded-xl transition-all"
              >
                Kapat
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePressReleaseSubmit} className="space-y-4">
            {/* PR PACKAGES */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">1. Basın Bülteni Yayın Paketini Seçin</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'standard', name: 'Standart Bülten', price: '1.500 TL', feature: 'Google News İndeksli' },
                  { id: 'headline', name: 'Manşet PR Paketi', price: '3.500 TL', feature: 'Öne Çıkan Ana Manşet', badge: 'POPÜLER' },
                  { id: 'authority', name: 'Otorite Paketi', price: '6.000 TL', feature: 'Maksimum Sosyal Medya Yayımı' }
                ].map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPrPackage(pkg.id as any)}
                    className={`cursor-pointer p-3 rounded-2xl border text-center relative transition-all flex flex-col justify-between h-28 ${
                      selectedPrPackage === pkg.id
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                        : 'bg-[#0B0B0C] border-zinc-850 hover:border-zinc-700'
                    }`}
                  >
                    {pkg.badge && (
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[7px] font-mono font-bold bg-[#D4AF37] text-black px-1.5 py-0.2 rounded-full">
                        {pkg.badge}
                      </span>
                    )}
                    <h5 className="text-[10px] font-bold text-white uppercase truncate">{pkg.name}</h5>
                    <div className="text-xs font-black text-[#D4AF37] font-mono my-1">{pkg.price}</div>
                    <span className="text-[8px] text-zinc-400 leading-tight block line-clamp-2">{pkg.feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAILS FORM */}
            <div className="space-y-3 pt-1 text-xs">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">2. Şirket ve Bülten Detayları</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-zinc-500 block mb-1">Şirket / Kurum Adı:</label>
                  <input
                    type="text"
                    required
                    value={prCompanyName}
                    onChange={(e) => setPrCompanyName(e.target.value)}
                    placeholder="Şirket ismi..."
                    className="w-full bg-[#0B0B0C] border border-zinc-850 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-500 block mb-1">Bülten Başlığı:</label>
                  <input
                    type="text"
                    required
                    value={pressReleaseTitle}
                    onChange={(e) => setPressReleaseTitle(e.target.value)}
                    placeholder="PR Başlığı..."
                    className="w-full bg-[#0B0B0C] border border-zinc-850 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-500 block mb-1">Basın Bülteni Metni (E-E-A-T Uyumlu):</label>
                <textarea
                  required
                  value={pressReleaseBody}
                  onChange={(e) => setPressReleaseBody(e.target.value)}
                  placeholder="Yayınlanmasını istediğiniz haber veya lansman bülteni içeriği..."
                  className="w-full h-20 bg-[#0B0B0C] border border-zinc-850 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-zinc-500 block mb-1">E-Posta:</label>
                  <input
                    type="email"
                    required
                    value={prEmail}
                    onChange={(e) => setPrEmail(e.target.value)}
                    placeholder="örnek@firma.com"
                    className="w-full bg-[#0B0B0C] border border-zinc-850 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-500 block mb-1">Telefon / WhatsApp:</label>
                  <input
                    type="tel"
                    required
                    value={prPhone}
                    onChange={(e) => setPrPhone(e.target.value)}
                    placeholder="05xx..."
                    className="w-full bg-[#0B0B0C] border border-zinc-850 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 bg-zinc-900/50 border border-zinc-850 rounded-2xl flex gap-2 text-[9px] text-zinc-400 leading-normal">
              <HelpCircle size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                * Gönderilen bültenler Google News yayın akışı kriterlerimize ve spam politikalarımıza göre kalite onayından geçirilir. Onaylanmayan içeriklerin bedeli iade edilir.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 sm:flex-1 text-center"
              >
                <span>WhatsApp İletişimi</span>
              </a>
              <a
                href={getEmailLink()}
                className="py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 sm:flex-1 text-center"
              >
                <span>E-posta İletişimi</span>
              </a>
              <button
                type="submit"
                disabled={isPressReleaseSubmitting}
                className="py-2.5 bg-[#D4AF37] hover:brightness-110 disabled:opacity-55 text-black font-extrabold text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-1 sm:flex-1"
              >
                {isPressReleaseSubmitting ? "Gönderiliyor..." : "Editörlük Onayına Sun"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
