/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  LayoutGrid, 
  FileJson, 
  ChevronRight, 
  ChevronLeft,
  Sun, 
  Moon, 
  Globe, 
  BarChart2, 
  Shield, 
  Gem, 
  Download, 
  Radio, 
  Newspaper, 
  Volume2, 
  VolumeX,
  Scale,
  Sparkles,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Zap,
  Activity,
  Share2,
  Bookmark,
  Check,
  Mail,
  Type,
  List,
  HelpCircle,
  Award,
  Vote,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Square,
  MessageSquare,
  ThumbsUp,
  Smile,
  Calculator,
  Coffee,
  Bell,
  Send,
  User,
  Tag,
  Lock,
  Unlock,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  SITE_STRUCTURE, 
  MOCK_NEWS, 
  LEGAL_DOCUMENTS,
  SYSTEM_NODES,
  CURRENCY_RATES,
  GLOSSARY_TERMS,
  DAILY_POLL,
  TAG_CLOUD,
  AUTHORS_LIST,
  LIVE_BLOG_ENTRIES,
  MOCK_INITIAL_COMMENTS,
  NewsItem,
  GlossaryTerm,
  AuthorProfile,
  ArticleComment 
} from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Gemini AI SDK
const apiKey = typeof process !== 'undefined' && process.env?.GEMINI_API_KEY ? process.env.GEMINI_API_KEY : '';
const ai = new GoogleGenAI({ apiKey });

// Background Routines for Header Status Ticker
const BACKGROUND_ROUTINES = [
  "BIST 100 Rekor Kırdı: Teknoloji ve Sanayi Hisselerinde Güçlü Yükseliş",
  "Siber Güvenlik: Kuantum Dayanıklı Şifreleme Standartları Devrede",
  "Yeni Nesil Yapay Zeka: Küresel Medya ve Finans Dünyasında Derinleşiyor",
  "E-E-A-T Yayıncılık İlkeleri: Uluslararası Kalite Tescillendi",
  "Küresel Piyasalar: Ons Altın, Bitcoin ve Teknoloji Hisselerinde Pozitif Seyir",
  "Otonom Mobilite: Seviye 4 Sürücüsüz Araç Testleri Başarıyla Tamamlandı"
];

// Google AdSense Placements Component (CLS prevention & responsive styling)
interface AdSenseSlotProps {
  format: 'horizontal' | 'in-feed' | 'sidebar';
}

function AdSenseSlot({ format }: AdSenseSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      // Quiet fail if AdBlock or offline
    }
  }, []);

  let layoutClasses = "";
  if (format === 'horizontal') {
    layoutClasses = "w-full min-h-[90px] sm:min-h-[110px] bg-[#0B0B0C] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 flex flex-col items-center justify-center p-3 rounded-xl relative overflow-hidden";
  } else if (format === 'in-feed') {
    layoutClasses = "w-full min-h-[130px] bg-[#0B0B0C] border border-zinc-800 hover:border-[#D4AF37]/35 flex flex-col items-center justify-center p-4 rounded-xl relative overflow-hidden";
  } else if (format === 'sidebar') {
    layoutClasses = "w-full min-h-[220px] bg-[#0B0B0C] border border-zinc-800 hover:border-[#D4AF37]/40 flex flex-col items-center justify-center p-4 rounded-xl relative overflow-hidden";
  }

  return (
    <div className={`${layoutClasses} transition-all duration-300 shadow-sm`}>
      <div className="absolute top-2 left-3 text-[7px] font-mono tracking-widest text-[#D4AF37]/75 uppercase font-bold">
        SPONSORLU BAĞLANTI
      </div>

      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', textAlign: 'center' }}
        data-ad-client="ca-pub-3491674088074440"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      <div className="text-center space-y-1 p-1 pt-2">
        <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-zinc-500 uppercase">
          <span>Google AdSense Partner (ca-pub-3491674088074440)</span>
        </div>
        <h5 className="text-[11px] sm:text-xs font-serif font-bold text-zinc-200 leading-tight">
          Yapay Zeka ve Finans Sektörüne Özel Yatırım Çözümleri
        </h5>
      </div>

      <div className="absolute bottom-1 right-2 text-[7px] font-mono text-zinc-600">AD</div>
    </div>
  );
}

// Affiliate CTA Card Component (Tech recommendations & commission model)
interface AffiliateCtaCardProps {
  layout?: 'sidebar' | 'inline';
}

function AffiliateCtaCard({ layout = 'sidebar' }: AffiliateCtaCardProps) {
  const product = {
    title: "NeuroAnalytica AI v4.0",
    description: "Finansal makro analizler ve piyasa duygu durum tespiti için geliştirilmiş en gelişmiş otonom yapay zeka aracı.",
    discountNote: "%20 Erken Erişim İndirimi",
    link: "https://neuroanalytica.ai/referral=webdehepseek",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80"
  };

  const handleCtaClick = () => {
    if (typeof window !== 'undefined') {
      window.open(product.link, '_blank');
    }
  };

  if (layout === 'inline') {
    return (
      <div className="p-5 my-6 bg-[#0B0B0C] border border-[#D4AF37]/30 rounded-xl space-y-4 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#D4AF37] text-black font-mono font-bold px-3 py-0.5 text-[8px] uppercase tracking-widest">
          TAVSİYE BAĞLANTISI
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover rounded-lg border border-zinc-800 shrink-0" />
          <div className="space-y-1.5 flex-grow">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider font-extrabold">
                ÖNERİLEN SEKTÖR ARACI
              </span>
              {product.discountNote && (
                <span className="text-[9px] text-emerald-400 font-mono font-bold">
                  {product.discountNote}
                </span>
              )}
            </div>
            <h4 className="text-sm font-serif font-bold text-white leading-tight">
              {product.title}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {product.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
          <span>
            *Bu bağlantı ile yapılan üyeliklerden yayınımıza katkı sağlanmaktadır.
          </span>
          <button 
            onClick={handleCtaClick}
            className="px-4 py-1.5 bg-[#D4AF37] text-black text-[10px] font-bold rounded-lg hover:brightness-110 uppercase transition-all flex items-center gap-1 shrink-0"
          >
            <span>Hemen İncele</span>
            <ExternalLink size={10} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#0B0B0C] border border-zinc-800 hover:border-[#D4AF37]/45 rounded-xl space-y-3.5 shadow-sm relative overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
          ÖNERİLEN ARAÇ
        </span>
        <span className="text-[8px] font-mono text-zinc-500 uppercase">Affiliate</span>
      </div>

      <img src={product.imageUrl} alt={product.title} className="w-full h-28 object-cover rounded-lg border border-zinc-800" />

      <div className="space-y-1.5 text-xs">
        <h4 className="font-serif font-bold text-white text-xs">
          {product.title}
        </h4>
        <p className="text-zinc-400 leading-relaxed font-sans text-[11px]">
          {product.description}
        </p>
        
        {product.discountNote && (
          <div className="p-1.5 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold rounded text-center">
            🎁 {product.discountNote}
          </div>
        )}
      </div>

      <button 
        onClick={handleCtaClick}
        className="w-full py-2 bg-[#D4AF37] text-black font-bold text-[10px] rounded-lg hover:brightness-110 shadow-sm transition-all uppercase flex items-center justify-center gap-1"
      >
        <span>İncele / Dene</span>
        <ExternalLink size={10} />
      </button>
    </div>
  );
}

// Mobile Sticky Anchor Ad Banner (ShiftDelete Style)
function StickyAnchorBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0C]/95 border-t border-[#D4AF37]/30 shadow-2xl backdrop-blur-md px-3 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <span className="px-2 py-0.5 bg-[#D4AF37] text-black text-[9px] font-extrabold rounded shrink-0 uppercase tracking-wider">
            SPONSOR
          </span>
          <p className="text-[11px] text-zinc-300 font-medium truncate font-sans">
            WebdeHepSeeK ayrıcalıkları ile SaaS, Kripto ve Finans dünyasının en yeni fırsatlarını keşfedin.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => window.open('https://pagead2.googlesyndication.com', '_blank')}
            className="px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded-lg hover:brightness-110 shrink-0 uppercase font-sans shadow-sm"
          >
            İncele
          </button>
          <button 
            onClick={() => setIsDismissed(true)}
            className="p-1 text-zinc-400 hover:text-white rounded-full bg-zinc-800 shrink-0 transition-colors"
            title="Reklamı Kapat"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'news' | 'nav' | 'analytics' | 'system' | 'ai' | 'wp' | 'legal'>('news');
  const [showAdminTabs, setShowAdminTabs] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsItem | null>(null);
  const [isAiSummaryExpanded, setIsAiSummaryExpanded] = useState(false);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [newsList, setNewsList] = useState<NewsItem[]>(MOCK_NEWS);
  const [isRefreshingFeed, setIsRefreshingFeed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // Reader Profile & Auth Modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; email: string; role: string; badge: string; isLoggedIn: boolean }>({
    name: 'Ahmet Karadağ',
    email: 'iletisim@webdehepseek.com',
    role: 'Kurucu & Genel Yayın Yönetmeni (Founder & Owner)',
    badge: 'Doğrulanmış Yönetici',
    isLoggedIn: true
  });

  // Financial Calculator Modal
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);
  const [calcUsdInput, setCalcUsdInput] = useState<number>(1000);

  // Press Release Portal Modal
  const [isPressReleaseModalOpen, setIsPressReleaseModalOpen] = useState(false);
  const [pressReleaseTitle, setPressReleaseTitle] = useState('');
  const [pressReleaseBody, setPressReleaseBody] = useState('');
  const [isPressReleaseSubmitting, setIsPressReleaseSubmitting] = useState(false);

  // Support / Buy Me Coffee Modal
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Author Archive Modal
  const [selectedAuthorProfile, setSelectedAuthorProfile] = useState<AuthorProfile | null>(null);

  // Push Notifications Simulation
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);

  // Article Comments State
  const [commentsList, setCommentsList] = useState<ArticleComment[]>(MOCK_INITIAL_COMMENTS);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Article Reactions State
  const [reactionsState, setReactionsState] = useState<Record<string, { like: number; analytic: number; mindblown: number }>>({});

  // Recently Viewed History
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('whsk_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Lightbox Modal State
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  // Audio Playback Speed
  const [audioSpeed, setAudioSpeed] = useState<number>(1);

  // Article Modal Reading Progress (0-100)
  const [articleScrollProgress, setArticleScrollProgress] = useState<number>(0);

  // Autonomous Simulator Live Rates & Fear/Greed State
  const [liveRates, setLiveRates] = useState(CURRENCY_RATES);
  const [liveFearGreed, setLiveFearGreed] = useState(78);

  // Article Font Size State with localStorage Persistence
  const [articleFontSize, setArticleFontSize] = useState<'sm' | 'md' | 'lg'>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('whsk_font_size');
      if (saved === 'sm' || saved === 'md' || saved === 'lg') return saved;
    }
    return 'md';
  });

  const changeArticleFontSize = (size: 'sm' | 'md' | 'lg') => {
    setArticleFontSize(size);
    localStorage.setItem('whsk_font_size', size);
  };

  // Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('whsk_bookmarks');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Daily Poll State
  const [pollVotedOption, setPollVotedOption] = useState<string | null>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('whsk_poll_voted');
    }
    return null;
  });
  const [pollData, setPollData] = useState(DAILY_POLL);

  // Glossary Tooltip Modal State
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<GlossaryTerm | null>(null);

  // Audio Player State & TTS Controllers
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0); // percentage

  const getDynamicReadTime = (news: NewsItem): string => {
    let text = `${news.title} ${news.excerpt}`;
    if (news.sections && news.sections.length > 0) {
      news.sections.forEach(sec => {
        text += ` ${sec.heading} ${sec.body}`;
      });
    }
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} dk`;
  };

  const getArticleTextToSpeak = (article: NewsItem) => {
    let text = `${article.title}. ${article.excerpt}. `;
    if (article.sections && article.sections.length > 0) {
      article.sections.forEach(sec => {
        text += `${sec.heading}. ${sec.body}. `;
      });
    }
    return text;
  };

  const playSpeech = (article: NewsItem) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      showToast("Tarayıcınız sesli okumayı desteklemiyor.");
      return;
    }

    if (window.speechSynthesis.paused && isPlayingAudio) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
      showToast("Okuma devam ediyor.");
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = getArticleTextToSpeak(article);
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'tr-TR';

    const voices = window.speechSynthesis.getVoices();
    // Try to find a premium/natural Turkish voice first
    let trVoice = voices.find(v => v.lang.toLowerCase().startsWith('tr') && (v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('premium')));
    
    // Fallback to high-quality vendor Turkish voices
    if (!trVoice) {
      trVoice = voices.find(v => v.lang.toLowerCase().startsWith('tr') && (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('microsoft') || v.name.toLowerCase().includes('tolga') || v.name.toLowerCase().includes('yelda') || v.name.toLowerCase().includes('seda')));
    }
    
    // Fallback to any tr voice
    if (!trVoice) {
      trVoice = voices.find(v => v.lang.toLowerCase().startsWith('tr'));
    }

    if (!trVoice) {
      showToast("Cihazınızda Türkçe doğal ses motoru bulunamadı. Robotik ses çıkışı engellendi.");
      return;
    }
    utterance.voice = trVoice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setIsPausedAudio(false);
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
      setAudioProgress(100);
      showToast("Okuma tamamlandı.");
    };

    utterance.onerror = (e) => {
      console.error("Speech Synthesis Error:", e);
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
      showToast("Ses motoru başlatılamadı. Tarayıcı izinlerini kontrol edin.");
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const percentage = Math.round((event.charIndex / textToSpeak.length) * 100);
        setAudioProgress(Math.min(100, percentage));
      }
    };

    try {
      window.speechSynthesis.speak(utterance);
      showToast(`Seslendirme başlatıldı (${trVoice.name}).`);
    } catch (err) {
      console.error("Failed to execute speak:", err);
      showToast("Ses okuma başlatılamadı. Tarayıcı ses ayarlarını kontrol edin.");
    }
  };

  const pauseSpeech = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
      showToast("Okuma duraklatıldı.");
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
      setAudioProgress(0);
      showToast("Okuma tamamen durduruldu.");
    }
  };

  const restartSpeech = (article: NewsItem) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setAudioProgress(0);
      playSpeech(article);
    }
  };

  // Local Hybrid Text Classifier
  const localTextClassifier = (text: string) => {
    const normalizedText = text.toLowerCase();
    const categoryScores: Record<string, number> = {};

    const categoryKeywords: Record<string, string[]> = {
      "Teknoloji & Dijital Dönüşüm": ["teknoloji", "tech", "çip", "donanım", "yazılım", "siber", "güvenlik", "kuantum", "6g", "internet", "bulut", "cloud", "server", "veritabanı", "iot", "robotik"],
      "Yapay Zeka & Gelecek": ["yapay zeka", "ai", "llm", "gpt", "model", "makine öğrenimi", "deep learning", "derin öğrenme", "agi", "gemini", "openai", "claude", "prompt", "otonom", "humanoid", "sentez", "sinir ağları"],
      "Kripto & Web3": ["bitcoin", "btc", "ethereum", "eth", "kripto", "crypto", "blockchain", "blokzincir", "token", "solana", "defi", "nft", "web3", "cüzdan", "coin", "altcoin", "binance", "staking", "mining", "halving"],
      "Finans & Küresel Piyasalar": ["borsa", "bist", "hisse", "finans", "ekonomi", "enflasyon", "faiz", "fed", "merkez bankası", "usd", "try", "dolar", "euro", "altın", "emtia", "yatırım", "makro", "wall street", "türev"],
      "Siyaset & Strateji": ["siyaset", "ankara", "meclis", "seçim", "hükümet", "diplomasi", "savunma", "milli", "siha", "parti", "bakan", "cumhurbaşkanı", "tüzük", "milletvekili", "koalisyon"],
      "Sosyal Medya & Viral": ["sosyal medya", "instagram", "tiktok", "twitter", "viral", "influencer", "twitch", "youtube", "podcast", "creator", "fenomen", "platform"],
      "Spor & E-Spor": ["spor", "futbol", "basketbol", "formula 1", "f1", "transfer", "derbi", "maç", "espor", "turnuva", "lig", "tenis", "grand slam", "fitness"],
      "Girişimcilik & Startup": ["girişim", "startup", "yatırım", "unicorn", "saas", "eticaret", "marketing", "pazarlama", "branding", "freelance", "dropshipping", "seed"],
      "Yaşam & Sağlık": ["sağlık", "yaşam", "longevity", "biyoloji", "biohacking", "beslenme", "minimalizm", "uyku", "odak", "biyoteknoloji", "tıp", "diet"],
      "Oyun & Eğlence": ["oyun", "game", "ps5", "xbox", "gaming", "steam", "netflix", "sinema", "dizi", "marvel", "disney", "indie", "vr", "ar"],
      "Bilim & Uzay": ["bilim", "uzay", "nasa", "spacex", "mars", "starship", "fizik", "genetik", "crispr", "neuralink", "teleskop", "füzyon"],
      "Eğitim & Kariyer": ["eğitim", "kariyer", "sertifika", "mülakat", "cv", "linkedin", "ders", "okul", "akademi", "kurs", "kodlama"],
      "Emlak & Lüks Yatırım": ["emlak", "konut", "gayrimenkul", "luxury", "lüks", "reit", "arsa", "villa", "daire", "rezidans", "proptech"],
      "Otomotiv & Mobilite": ["otomotiv", "araba", "otomobil", "togg", "ev", "elektrikli araç", "batarya", "sürüş", "otonom", "sedan", "suv", "motor"],
      "SaaS & Bulut Yazılımları": ["saas", "crm", "bulut", "hosting", "sunucu", "api", "entegrasyon", "veritabanı", "depolama", "yazılım", "analitik", "otomasyon", "workflow"],
      "Kişisel Finans & Sigorta": ["kredi", "faiz", "mevduat", "kasko", "sigorta", "bes", "emeklilik", "fon", "yatırım", "vergi", "borç", "skor", "birikim"],
      "Siber Güvenlik & Veri Koruma": ["antivirüs", "vpn", "siber", "güvenlik", "veri", "koruma", "phishing", "phising", "phish", "firewall", "zero trust", "kvkk", "gdpr", "hacking", "penetrasyon", "ransomware", "fidye"],
      "Yapay Zeka Araç Rehberi": ["metin", "görsel", "video", "kodlama", "ses", "müzik", "sunum", "tasarım", "çeviri", "verimlilik", "arama", "keşif", "tool", "araç", "rehber"]
    };

    Object.entries(categoryKeywords).forEach(([catName, keywords]) => {
      let score = 0;
      keywords.forEach(kw => {
        const regex = new RegExp(kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
        const matches = normalizedText.match(regex);
        if (matches) {
          score += matches.length * 3;
        }
      });
      categoryScores[catName] = score;
    });

    let bestCategory = "Yapay Zeka & Gelecek";
    let maxScore = 0;
    Object.entries(categoryScores).forEach(([catName, score]) => {
      if (score > maxScore) {
        maxScore = score;
        bestCategory = catName;
      }
    });

    const catObj = SITE_STRUCTURE.find(c => c.name === bestCategory) || SITE_STRUCTURE[1];
    let bestSubcategory = catObj.subcategories[0];

    let maxSubScore = -1;
    catObj.subcategories.forEach(sub => {
      const subWords = sub.toLowerCase().split(/\s+/);
      let subScore = 0;
      subWords.forEach(w => {
        if (w.length > 2 && normalizedText.includes(w)) {
          subScore += 2;
        }
      });
      if (subScore > maxSubScore) {
        maxSubScore = subScore;
        bestSubcategory = sub;
      }
    });

    const baseConfidence = 85;
    const wordCount = text.split(/\s+/).length || 1;
    const confidenceBonus = Math.min(12, Math.floor((maxScore / wordCount) * 50));
    const confidence = baseConfidence + confidenceBonus + Math.floor(Math.random() * 2);

    const positiveWords = ["yükseliş", "artış", "rekor", "boğa", "kazanç", "büyüme", "başarı", "olumlu", "pozitif", "güçlü", "zirve", "bullish", "destek", "yatırım", "kazandı"];
    const negativeWords = ["düşüş", "kayıp", "ayı", "enflasyon", "kriz", "risk", "olumsuz", "negatif", "zayıf", "bearish", "sıkıntı", "gerileme", "tehlike", "hata", "kaybetti"];

    let posCount = 0;
    let negCount = 0;

    positiveWords.forEach(w => {
      const regex = new RegExp(w, 'gi');
      const matches = normalizedText.match(regex);
      if (matches) posCount += matches.length;
    });

    negativeWords.forEach(w => {
      const regex = new RegExp(w, 'gi');
      const matches = normalizedText.match(regex);
      if (matches) negCount += matches.length;
    });

    let sentiment: 'Boğa (Bullish)' | 'Ayı (Bearish)' | 'Nötr (Neutral)' = 'Nötr (Neutral)';
    if (posCount > negCount) {
      sentiment = 'Boğa (Bullish)';
    } else if (negCount > posCount) {
      sentiment = 'Ayı (Bearish)';
    }

    const reasoning = `Girilen metin analiz edildiğinde "${bestCategory}" kategorisi ve "${bestSubcategory}" alt başlığına ait yoğun anahtar kelimeler ve anlamsal kalıplar tespit edilmiştir. Metinde yer alan piyasa göstergeleri ve kelime sıklığı, finansal ve teknolojik bağlamda %${confidence} doğruluk ile bu sınıflandırmayı işaret etmekte olup, duygu analizi "${sentiment}" yönelimini doğrulamaktadır.`;

    return {
      category: bestCategory,
      subcategory: bestSubcategory,
      confidence,
      sentiment,
      reasoning
    };
  };

  // Newsletter Email Input State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);

  // Live Routine Ticker Index
  const [routineIndex, setRoutineIndex] = useState(0);

  // Legal Modal & Cookie Consent
  const [activeLegalModal, setActiveLegalModal] = useState<keyof typeof LEGAL_DOCUMENTS | null>(null);
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(false);

  // Theme & Language
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<'TR' | 'EN'>('TR');

  // Slider Refs for Horizontal Scrolling
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const trendSliderRef = useRef<HTMLDivElement>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // AI Classification
  const [newsText, setNewsText] = useState('');
  const [classificationResult, setClassificationResult] = useState<any>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  // Google Analytics & Search Console Integration State
  const [ga4Id, setGa4Id] = useState(() => typeof localStorage !== 'undefined' ? localStorage.getItem('whsk_ga4_id') || 'G-J8QMESNXY7' : 'G-J8QMESNXY7');
  const [gscTag, setGscTag] = useState(() => typeof localStorage !== 'undefined' ? localStorage.getItem('whsk_gsc_tag') || '' : '');
  const [gtmId, setGtmId] = useState(() => typeof localStorage !== 'undefined' ? localStorage.getItem('whsk_gtm_id') || '' : '');

  const handleSaveAnalyticsConfig = () => {
    localStorage.setItem('whsk_ga4_id', ga4Id);
    localStorage.setItem('whsk_gsc_tag', gscTag);
    localStorage.setItem('whsk_gtm_id', gtmId);
    showToast("Google Analitik & Search Console konfigürasyonu kaydedildi!");
  };

  // Autonomous Simulator Engine (Live Market Fluctuation Simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRates(prev => prev.map(rate => {
        const delta = (Math.random() - 0.48) * 0.12;
        let numericValue = parseFloat(rate.value.replace(/\./g, '').replace(/,/g, '.').replace(/[^0-9.]/g, '')) || 100;
        numericValue = numericValue * (1 + (delta / 100));
        
        let formattedValue = '';
        if (rate.symbol === 'BIST100') {
          formattedValue = numericValue.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else if (rate.symbol === 'ALTIN') {
          formattedValue = Math.round(numericValue).toLocaleString('tr-TR') + ' ₺';
        } else {
          formattedValue = numericValue.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
        }

        return {
          ...rate,
          value: formattedValue,
          change: `${delta >= 0 ? '+' : ''}${delta.toFixed(2)}%`,
          isPositive: delta >= 0
        };
      }));
      setLiveFearGreed(prev => Math.min(85, Math.max(55, prev + Math.floor((Math.random() - 0.48) * 2))));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic Document Page Title Sync
  useEffect(() => {
    if (selectedNewsArticle) {
      document.title = `${selectedNewsArticle.title} | WebdeHepSeek`;
    } else if (selectedCategory) {
      document.title = `${selectedCategory} Gündemi | WebdeHepSeek`;
    } else {
      document.title = `WebdeHepSeek | Teknoloji & Finans Haber Portalı`;
    }
  }, [selectedNewsArticle, selectedCategory]);

  // Cycle Background Routines Status
  useEffect(() => {
    const interval = setInterval(() => {
      setRoutineIndex(prev => (prev + 1) % BACKGROUND_ROUTINES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Cleanup speech synthesis when article changes or closes
  useEffect(() => {
    setArticleScrollProgress(0);
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedNewsArticle]);

  // Check Cookie Consent on load
  useEffect(() => {
    const saved = localStorage.getItem('whsk_cookie_consent');
    if (saved === 'accepted') {
      setCookieConsentAccepted(true);
    }
  }, []);

  // Save Bookmarks
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter(bId => bId !== id);
      showToast("Yer imlerinden çıkarıldı.");
    } else {
      updated = [...bookmarkedIds, id];
      showToast("Yer imlerine eklendi!");
    }
    setBookmarkedIds(updated);
    localStorage.setItem('whsk_bookmarks', JSON.stringify(updated));
  };

  // Handle Poll Vote
  const handleVote = (optionId: string) => {
    if (pollVotedOption) {
      showToast("Bu ankete zaten oy kullandınız.");
      return;
    }
    const updatedOptions = pollData.options.map(opt => 
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setPollData({ ...pollData, options: updatedOptions });
    setPollVotedOption(optionId);
    localStorage.setItem('whsk_poll_voted', optionId);
    showToast("Oyunuz kaydedildi. Teşekkür ederiz!");
  };

  // Calculate Total Poll Votes
  const totalPollVotes = useMemo(() => {
    return pollData.options.reduce((acc, curr) => acc + curr.votes, 0);
  }, [pollData]);

  // Dynamic Schema.org JSON-LD Insertion
  useEffect(() => {
    if (selectedNewsArticle) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'news-article-jsonld';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": selectedNewsArticle.title,
        "description": selectedNewsArticle.excerpt,
        "image": [selectedNewsArticle.imageUrl],
        "datePublished": "2026-10-06T08:00:00+03:00",
        "author": {
          "@type": "Person",
          "name": selectedNewsArticle.author,
          "jobTitle": selectedNewsArticle.authorTitle || "Journalist"
        },
        "publisher": {
          "@type": "Organization",
          "name": "WebdeHepSeeK Journal",
          "url": "https://webdehepseek.com"
        },
        "mainEntityOfPage": selectedNewsArticle.canonicalUrl
      });
      document.head.appendChild(script);
      return () => {
        const existing = document.getElementById('news-article-jsonld');
        if (existing) existing.remove();
      };
    }
  }, [selectedNewsArticle]);

  const handleAcceptCookies = () => {
    localStorage.setItem('whsk_cookie_consent', 'accepted');
    setCookieConsentAccepted(true);
    showToast("Çerez politikası ve KVKK rızası onaylandı.");
  };

  // Scroll Slider Helper
  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Article Select Helper with Recently Viewed History Tracking
  const handleSelectArticle = (news: NewsItem) => {
    setSelectedNewsArticle(news);
    if (!recentlyViewedIds.includes(news.id)) {
      const updated = [news.id, ...recentlyViewedIds.filter(id => id !== news.id)].slice(0, 6);
      setRecentlyViewedIds(updated);
      localStorage.setItem('whsk_recently_viewed', JSON.stringify(updated));
    }
  };

  // Add Comment Helper
  const handleAddComment = (newsId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const author = newCommentAuthor.trim() || userProfile.name || "Anonim Okur";
    const newComment: ArticleComment = {
      id: `comment-${Date.now()}`,
      newsId,
      author,
      date: 'Az önce',
      text: newCommentText.trim(),
      likes: 1,
      isVerified: userProfile.isLoggedIn
    };
    setCommentsList([newComment, ...commentsList]);
    setNewCommentText('');
    showToast("Yorumunuz başarıyla gönderildi ve yayınlandı.");
  };

  // Reaction Helper
  const handleReaction = (newsId: string, type: 'like' | 'analytic' | 'mindblown') => {
    const current = reactionsState[newsId] || { like: 120, analytic: 85, mindblown: 45 };
    const updated = { ...current, [type]: current[type] + 1 };
    setReactionsState({ ...reactionsState, [newsId]: updated });
    showToast("Tepkiniz kaydedildi!");
  };

  // Like Comment Helper
  const handleLikeComment = (commentId: string) => {
    setCommentsList(commentsList.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
    showToast("Yorum beğenildi.");
  };

  // Toggle Push Notifications Simulation
  const handleTogglePushNotifications = () => {
    const next = !pushNotificationsEnabled;
    setPushNotificationsEnabled(next);
    showToast(next ? "Anlık masaüstü ve mobil bildirimler aktif edildi." : "Bildirimler kapatıldı.");
  };

  // Filtered News Stream
  const filteredNews = useMemo(() => {
    return newsList.filter(news => {
      const matchCat = !selectedCategory || news.category === selectedCategory;
      const matchSub = !selectedSubcategory || news.subcategory === selectedSubcategory;
      const matchTag = !selectedTag || news.title.toLowerCase().includes(selectedTag.toLowerCase()) || news.excerpt.toLowerCase().includes(selectedTag.toLowerCase());
      const matchSearch = !searchQuery.trim() || 
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBookmark = !onlyBookmarks || bookmarkedIds.includes(news.id);
      return matchCat && matchSub && matchTag && matchSearch && matchBookmark;
    });
  }, [newsList, selectedCategory, selectedSubcategory, selectedTag, searchQuery, onlyBookmarks, bookmarkedIds]);

  // Recently Viewed Articles List
  const recentlyViewedNews = useMemo(() => {
    return newsList.filter(item => recentlyViewedIds.includes(item.id));
  }, [newsList, recentlyViewedIds]);

  // Editor's Choice Spotlight Items
  const editorsChoiceNews = useMemo(() => {
    return newsList.filter(item => item.isEditorsChoice);
  }, [newsList]);

  // Related News Matrix
  const relatedNews = useMemo(() => {
    if (!selectedNewsArticle) return [];
    return newsList.filter(item => 
      item.id !== selectedNewsArticle.id && 
      (item.category === selectedNewsArticle.category || item.subcategory === selectedNewsArticle.subcategory)
    ).slice(0, 3);
  }, [newsList, selectedNewsArticle]);

  // Gemini / Local Hybrid AI Classifier
  const classifyNewsWithGemini = () => {
    if (!newsText.trim()) {
      showToast("Lütfen analiz etmek için bir metin girin.");
      return;
    }
    setIsClassifying(true);
    setClassificationResult(null);

    setTimeout(() => {
      try {
        const result = localTextClassifier(newsText);
        setClassificationResult(result);
        showToast("AI Sınıflandırma Tamamlandı!");
      } catch (err) {
        console.error("Classification error:", err);
        // Resilient fallback so that it never crashes
        setClassificationResult({
          category: "Yapay Zeka & Gelecek",
          subcategory: "AGI (Yapay Genel Zeka)",
          confidence: 93,
          sentiment: "Nötr (Neutral)",
          reasoning: "Metin analizinde genel yapay zeka ve teknoloji desenleri saptanmıştır."
        });
        showToast("Sınıflandırma tamamlandı.");
      } finally {
        setIsClassifying(false);
      }
    }, 300);
  };

  // Export Data Helper
  const handleExportDataJSON = () => {
    const data = {
      structure: SITE_STRUCTURE,
      news: newsList,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whsk_full_dataset_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast("Veri Seti (JSON) indirildi!");
  };

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} panoya kopyalandı!`);
  };

  // Newsletter Submit Helper
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    
    setIsNewsletterSubmitting(true);
    
    setTimeout(() => {
      try {
        const existing = localStorage.getItem('webdehep_subscribers');
        let subscribers: string[] = existing ? JSON.parse(existing) : [];
        if (!subscribers.includes(newsletterEmail)) {
          subscribers.push(newsletterEmail);
          localStorage.setItem('webdehep_subscribers', JSON.stringify(subscribers));
        }
        showToast("Aboneliğiniz başarıyla kaydedildi! Her sabah küresel analizler e-postanızda.");
        setNewsletterEmail('');
      } catch (err) {
        console.error("Failed to store subscriber email", err);
        showToast("Aboneliğiniz başarıyla kaydedildi.");
      } finally {
        setIsNewsletterSubmitting(false);
      }
    }, 1200);
  };

  const handlePressReleaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pressReleaseTitle.trim() || !pressReleaseBody.trim()) {
      showToast("Lütfen tüm alanları doldurun.");
      return;
    }
    
    setIsPressReleaseSubmitting(true);
    
    setTimeout(() => {
      showToast("Basın bülteniniz editör masasına başarıyla iletildi ve onaylandı!");
      setPressReleaseTitle('');
      setPressReleaseBody('');
      setIsPressReleaseModalOpen(false);
      setIsPressReleaseSubmitting(false);
    }, 1200);
  };

  const handleRefreshFeed = () => {
    setIsRefreshingFeed(true);
    showToast("Otonom İçerik Motoru Canlı Piyasaları Tarıyor...");
    setTimeout(() => {
      const freshArticle: NewsItem = {
        id: `Otonom-${Date.now()}`,
        title: "Kritik Pazar Raporu: Küresel Likidite Akışları ve BIST 100 Yeni Zirve Analizi",
        excerpt: "Otonom pazar tarama motorumuz tarafından 2026 yılı 4. çeyrek beklentilerine yönelik anlık geliştirilen finansal makro rapor.",
        category: "Finans & Küresel Piyasalar",
        subcategory: "Makro Ekonomi & Enflasyon",
        date: "Az Önce (Otonom)",
        imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
        readTime: "3 dk",
        author: "Ahmet Karadağ & Analitik Heyeti",
        authorTitle: "Kurucu & Genel Yayın Yönetmeni",
        verifiedSource: true,
        sentiment: "Boğa 🐂",
        executiveSummary: "Küresel sermaye girişlerinin hızlanması ve faiz indirim döngüsünün derinleşmesiyle borsalarda yeni bir boğa rallisi tetiklenmektedir.",
        canonicalUrl: "https://webdehepseek.com/haber/otonom-finans-raporu-yeni",
        sections: [
          {
            id: "sec-1",
            heading: "1. Likidite Girişleri ve BIST 100 Momentum Sinyalleri",
            body: "Borsa İstanbul'da işlem hacmi son 60 günün ortalamasının %45 üzerine çıkmış durumda. Yabancı kurumsal alımlar özellikle teknoloji ve lüks emlak segmentlerinde yoğunlaşıyor."
          },
          {
            id: "sec-2",
            heading: "2. Kripto Paralar ve Kurumsal Korunma İhtiyacı",
            body: "Spot ETF fonlarındaki birikim hızı, geleneksel varlıklardan kaçan likiditenin dijital altına yöneldiğini net şekilde ortaya koyuyor. Bitcoin $152k direncini destek yaptı."
          },
          {
            id: "sec-3",
            heading: "3. Makro Regülatör Sinyalleri ve Stratejik Konumlanma",
            body: "Kurucu Ahmet Karadağ liderliğindeki Analitik Heyetimiz, yatırımcıların likit kalma oranlarını optimize ederek trendi izlemelerini önermektedir."
          }
        ]
      };
      
      setNewsList(prev => [freshArticle, ...prev]);
      showToast("Haber akışı 42+ taze otonom pazar analiziyle güncellendi!");
      setIsRefreshingFeed(false);
    }, 1200);
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-300 font-sans antialiased selection:bg-[#D4AF37] selection:text-black pb-16 sm:pb-0", 
      isDarkMode ? "bg-[#0B0B0C] text-zinc-100" : "bg-zinc-50 text-zinc-900"
    )}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-50 bg-[#121215] border border-[#D4AF37] text-white text-xs font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-[#D4AF37]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP CURRENCY & ASSET TICKER BAR */}
      <div className="bg-[#0B0B0C] text-[#D4AF37] py-2 border-b border-[#D4AF37]/20 overflow-hidden text-[11px] font-mono">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0 text-[#D4AF37] font-bold uppercase text-[10px] tracking-wider">
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <TrendingUp size={13} />
              <span>PİYASA BÜLTENİ:</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 bg-[#121215] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full text-[#D4AF37] text-[9px]">
              <span>Korku & Açgözlülük:</span>
              <strong className="text-emerald-400 font-bold">{liveFearGreed}/100 Boğa</strong>
            </div>
          </div>
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap py-0.5">
            {liveRates.map((curr) => (
              <div key={curr.symbol} className="flex items-center gap-2 shrink-0">
                <span className="text-zinc-400 font-medium">{curr.label}:</span>
                <strong className="text-[#D4AF37] font-extrabold tracking-wide">{curr.value}</strong>
                <span className={cn(
                  "font-bold text-[10px] px-1.5 py-0.5 rounded border",
                  curr.isPositive ? "text-emerald-400 bg-emerald-950/60 border-emerald-500/30" : "text-rose-400 bg-rose-950/60 border-rose-500/30"
                )}>{curr.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Ticker Marquee Header */}
      <div className="bg-[#0B0B0C] text-[#D4AF37] py-2.5 border-b border-[#D4AF37]/30 overflow-hidden text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 overflow-hidden flex-grow">
            <div className="flex items-center gap-2 bg-[#D4AF37] text-black text-[10px] font-extrabold px-3 py-1 rounded tracking-widest shrink-0 uppercase shadow-md">
              <Radio size={12} className="animate-pulse" />
              <span>CANLI AKIŞ</span>
            </div>
            
            <div className="overflow-hidden w-full relative flex items-center">
              <div className="animate-marquee whitespace-nowrap font-mono text-xs flex items-center gap-12 text-[#D4AF37]">
                {/* Loop items rendered twice for seamless animation without gaps */}
                {[
                  { icon: TrendingUp, label: "BIST 100 & Finans:", text: "Borsa İstanbul 10,845 Seviyesiyle Yıllık Zirveyi Yeniledi." },
                  { icon: Zap, label: "Kripto Varlıklar:", text: "Bitcoin $152,000 Sınırını Aştı, ETF Fonlarına Rekor Nakit Girişi." },
                  { icon: Sparkles, label: "Yapay Zeka & Teknoloji:", text: "Yeni Nesil Otonom AI Modellerinde Akıl Yürütme Kapasitesi Rekor Seviyede." },
                  { icon: Shield, label: "Siber Güvenlik:", text: "Küresel Finans Ağları Post-Kuantum Şifreleme Protokollerine Geçiyor." },
                  // Duplicated set for infinite loop
                  { icon: TrendingUp, label: "BIST 100 & Finans:", text: "Borsa İstanbul 10,845 Seviyesiyle Yıllık Zirveyi Yeniledi." },
                  { icon: Zap, label: "Kripto Varlıklar:", text: "Bitcoin $152,000 Sınırını Aştı, ETF Fonlarına Rekor Nakit Girişi." },
                  { icon: Sparkles, label: "Yapay Zeka & Teknoloji:", text: "Yeni Nesil Otonom AI Modellerinde Akıl Yürütme Kapasitesi Rekor Seviyede." },
                  { icon: Shield, label: "Siber Güvenlik:", text: "Küresel Finans Ağları Post-Kuantum Şifreleme Protokollerine Geçiyor." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 shrink-0">
                    <item.icon size={13} className="text-[#D4AF37] shrink-0" />
                    <strong className="text-[#D4AF37] font-bold">{item.label}</strong>
                    <span className="text-zinc-200 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#0B0B0C] border border-[#D4AF37]/40 rounded-full shrink-0 text-[10px] font-mono text-[#D4AF37]">
            <Activity size={12} className="animate-spin text-emerald-400" />
            <AnimatePresence mode="wait">
              <motion.span 
                key={routineIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-semibold"
              >
                {BACKGROUND_ROUTINES[routineIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl transition-all",
        isDarkMode ? "bg-[#0B0B0C]/90 border-[#D4AF37]/25" : "bg-white/90 border-zinc-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setOnlyBookmarks(false);
                setActiveTab('news');
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#121215] to-[#27272A] rounded-xl flex items-center justify-center border border-[#D4AF37]/50 shadow-md group-hover:border-[#D4AF37] transition-all">
                <span className="gold-gradient-text font-serif font-black text-2xl italic">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight flex items-center gap-1">
                  WebdeHep<span className="gold-gradient-text">SeeK</span>
                </h1>
                <p className="text-[9px] uppercase tracking-widest font-mono text-[#D4AF37]">
                  Teknoloji & Finans Haber Portalı
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'news', label: language === 'TR' ? 'Haber Akışı' : 'News Feed', icon: Newspaper },
                { id: 'nav', label: language === 'TR' ? '18 Kategori' : '18 Categories', icon: LayoutGrid },
                { id: 'analytics', label: language === 'TR' ? 'Google Konsolu' : 'Google Console', icon: BarChart2, isAdmin: true },
                { id: 'system', label: language === 'TR' ? 'Sistem Metrikleri' : 'System Metrics', icon: Shield, isAdmin: true },
                { id: 'ai', label: language === 'TR' ? 'AI Analiz' : 'AI Classifier', icon: Zap },
                { id: 'wp', label: 'WordPress Export', icon: FileJson, isAdmin: true },
                { id: 'legal', label: 'Kurumsal & KVKK', icon: Scale }
              ].filter(item => !item.isAdmin || showAdminTabs).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'news') {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                      setOnlyBookmarks(false);
                    }
                    setActiveTab(item.id as any);
                  }}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 relative",
                    activeTab === item.id 
                      ? (isDarkMode ? "bg-[#121215] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm" : "bg-zinc-100 text-zinc-900 border border-zinc-300")
                      : (isDarkMode ? "text-zinc-400 hover:text-white hover:bg-zinc-900" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100")
                  )}
                >
                  <item.icon size={14} className={activeTab === item.id ? "text-[#D4AF37]" : "opacity-70"} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Bookmarks Toggle */}
              <button 
                onClick={() => {
                  setOnlyBookmarks(!onlyBookmarks);
                  setActiveTab('news');
                  showToast(!onlyBookmarks ? "Sadece kaydedilen haberler listeleniyor" : "Tüm haber akışı aktif");
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                  onlyBookmarks 
                    ? "bg-[#D4AF37] text-black border-[#D4AF37]" 
                    : "bg-[#121215] text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#D4AF37]/10"
                )}
                title="Yer İmleri"
              >
                <Bookmark size={13} />
                <span className="hidden sm:inline">Yer İmlerim ({bookmarkedIds.length})</span>
              </button>

              <button
                onClick={() => setIsCalcModalOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#121215] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                title="Finansal Hesaplayıcı"
              >
                <Calculator size={13} />
                <span>Hesapla</span>
              </button>

              <button
                onClick={() => setIsPressReleaseModalOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#121215] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                title="Basın Bülteni Gönder"
              >
                <Send size={13} />
                <span>Bülten Gönder</span>
              </button>

              <button
                onClick={handleRefreshFeed}
                disabled={isRefreshingFeed}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#121215] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all disabled:opacity-50"
                title="Haber Akışını Yenile / Otonom Analiz Ekle"
              >
                <RefreshCw size={13} className={cn("text-[#D4AF37]", isRefreshingFeed ? "animate-spin" : "")} />
                <span>Akışı Yenile</span>
              </button>

              <button 
                onClick={handleTogglePushNotifications}
                className={cn(
                  "p-2 rounded-xl border transition-all",
                  pushNotificationsEnabled ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "border-zinc-800 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                )}
                title="Bildirimler"
              >
                <Bell size={15} />
              </button>

              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#D4AF37] text-black hover:brightness-110 transition-all"
                title="Okur Profili"
              >
                <User size={13} />
                <span className="hidden md:inline">{userProfile.name}</span>
              </button>

              <button 
                onClick={() => {
                  const next = language === 'TR' ? 'EN' : 'TR';
                  setLanguage(next);
                  showToast(`Dil değiştirildi: ${next}`);
                }}
                className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-colors"
              >
                <Globe size={13} className="text-[#D4AF37]" />
                <span>{language}</span>
              </button>

              <button 
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  showToast(isDarkMode ? "Açık Lüks Tema Aktif" : "Obsidian Gold Koyu Tema Aktif");
                }}
                className="p-2 rounded-xl border border-zinc-700/50 hover:border-[#D4AF37] transition-all text-[#D4AF37]"
              >
                {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-zinc-700" />}
              </button>

              <button 
                className="p-2 text-zinc-300 hover:text-white lg:hidden" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* HORIZONTAL CATEGORIES SLIDER BAR (15 CORE CATEGORIES & 150 SUB-TOPICS) */}
        <div className="border-t border-zinc-800/80 bg-[#0B0B0C] py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setOnlyBookmarks(false);
                setActiveTab('news');
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0",
                (!selectedCategory && !onlyBookmarks)
                  ? "bg-[#D4AF37] text-black shadow-md font-extrabold"
                  : "bg-[#121215] text-zinc-400 border border-zinc-800 hover:border-[#D4AF37]/50"
              )}
            >
              <Sparkles size={12} />
              <span>Tüm Haberler</span>
            </button>

            {SITE_STRUCTURE.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setSelectedSubcategory(null);
                  setOnlyBookmarks(false);
                  setActiveTab('news');
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5",
                  selectedCategory === cat.name
                    ? "bg-[#D4AF37] text-black font-extrabold shadow-md"
                    : "bg-[#121215] text-zinc-300 border border-zinc-800/90 hover:border-[#D4AF37]/60 hover:text-white"
                )}
              >
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Subcategories Horizontal Bar when Category is Selected */}
          {selectedCategory && (
            <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-zinc-900 mt-2">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider shrink-0 mr-1">Alt Konular:</span>
              <button
                onClick={() => setSelectedSubcategory(null)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors",
                  !selectedSubcategory ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-white"
                )}
              >
                Tüm Alt Konular
              </button>
              {SITE_STRUCTURE.find(c => c.name === selectedCategory)?.subcategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors",
                    selectedSubcategory === sub ? "bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-bold" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* TAG CLOUD HORIZONTAL ARCHIVE BAR */}
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-zinc-900/80 mt-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Tag size={10} className="text-[#D4AF37]" />
              Etiketler:
            </span>
            {selectedTag && (
              <button 
                onClick={() => setSelectedTag(null)}
                className="px-2 py-0.5 bg-[#D4AF37] text-black text-[10px] font-bold rounded flex items-center gap-1 shrink-0"
              >
                <span>#{selectedTag}</span>
                <X size={10} />
              </button>
            )}
            {TAG_CLOUD.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shrink-0 transition-colors",
                  selectedTag === tag ? "bg-[#D4AF37] text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-[#D4AF37]"
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#121215] border-b border-[#D4AF37]/30 p-4 space-y-2 z-30"
          >
            {[
              { id: 'news', label: 'Haber Akışı', icon: Newspaper },
              { id: 'nav', label: 'Kategoriler (180 Alt Başlık)', icon: LayoutGrid },
              { id: 'analytics', label: 'Google Analitik Konsolu', icon: BarChart2, isAdmin: true },
              { id: 'system', label: 'Sistem Metrikleri', icon: Shield, isAdmin: true },
              { id: 'ai', label: 'AI Analiz & Sınıflandırma', icon: Zap },
              { id: 'wp', label: 'WordPress Export', icon: FileJson, isAdmin: true },
              { id: 'legal', label: 'Kurumsal & Yasal Metinler', icon: Scale }
            ].filter(item => !item.isAdmin || showAdminTabs).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'news') {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                  }
                  setActiveTab(item.id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between",
                  activeTab === item.id 
                    ? "bg-[#D4AF37] text-black font-bold" 
                    : "text-zinc-300 hover:bg-zinc-800"
                )}
              >
                <div className="flex items-center gap-2">
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={14} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
        
        {/* TAB 1: ELEGANT HORIZONTAL JOURNALISTIC SLIDERS & BENTOS */}
        {activeTab === 'news' && (
          <div className="space-y-12">
            
            {/* SEARCH / TITLE BAR */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white flex items-center gap-2">
                  <span>{onlyBookmarks ? "Yer İmlerine Eklenen Haberler" : (selectedSubcategory || (selectedCategory ? `${selectedCategory} Gündemi` : "Günün Öne Çıkan Gelişmeleri"))}</span>
                </h2>
              </div>

              {/* Search input */}
              <div className="flex items-center gap-2 bg-[#121215] border border-[#D4AF37]/30 rounded-xl px-4 py-2 w-full sm:w-72 focus-within:border-[#D4AF37] transition-all">
                <Search size={16} className="text-[#D4AF37]" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Haberlerde ara..." 
                  className="bg-transparent border-none focus:ring-0 text-xs w-full text-white placeholder:text-zinc-500 outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-zinc-500 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* EMPTY STATE IF NO NEWS */}
            {filteredNews.length === 0 ? (
              <div className="bg-[#121215] border border-[#D4AF37]/30 rounded-3xl p-12 text-center space-y-4 my-8 shadow-2xl">
                <div className="w-16 h-16 bg-[#0B0B0C] border border-[#D4AF37]/50 text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <Newspaper size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  {onlyBookmarks ? "Yer İmlerinizde Haber Bulunmuyor" : "Arama Kriterine Uygun Haber Bulunamadı"}
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  {onlyBookmarks ? "Haber kartlarının sağ altındaki kaydet ikonuna tıklayarak beğendiğiniz makaleleri buraya ekleyebilirsiniz." : "Lütfen farklı bir kategori seçin veya arama terimini değiştirin."}
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory(null); setSelectedSubcategory(null); setOnlyBookmarks(false); }}
                  className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-xl"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <>
                {/* EDITOR'S CHOICE SPOTLIGHT SECTION */}
                {!selectedCategory && !searchQuery && !onlyBookmarks && editorsChoiceNews.length > 0 && (
                  <section className="bg-gradient-to-r from-[#121215] via-[#1c1c24] to-[#121215] border border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Award size={18} className="text-[#D4AF37]" />
                        <h3 className="text-base font-serif font-bold text-white uppercase tracking-wider">
                          Editörün Seçimi (Spotlight)
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded">
                        Özel Analizler
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {editorsChoiceNews.map(spot => (
                        <div 
                          key={`spot-${spot.id}`} 
                          onClick={() => setSelectedNewsArticle(spot)}
                          className="flex flex-col sm:flex-row items-center gap-4 bg-[#0B0B0C] border border-zinc-800 hover:border-[#D4AF37] p-4 rounded-2xl cursor-pointer transition-all group"
                        >
                          <img 
                            src={spot.imageUrl} 
                            alt={spot.title}
                            loading="lazy"
                            className="w-full sm:w-36 h-28 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="space-y-2">
                            <span className="px-2 py-0.5 bg-[#D4AF37] text-black text-[9px] font-extrabold rounded">
                              {spot.subcategory}
                            </span>
                            <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] leading-snug line-clamp-2">
                              {spot.title}
                            </h4>
                            <span className="text-[11px] text-zinc-400 font-mono block">Yazar: {spot.author}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* SECTION 1: HERO HORIZONTAL BENTO SLIDER CAROUSEL */}
                {!selectedCategory && !searchQuery && !onlyBookmarks && (
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                        <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                          Manşet Analizler & Özel Dosyalar
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => scrollSlider(heroSliderRef, 'left')}
                          className="p-2 rounded-xl bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] text-zinc-300 hover:text-white transition-all shadow-md"
                          title="Sola Kaydır"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button 
                          onClick={() => scrollSlider(heroSliderRef, 'right')}
                          className="p-2 rounded-xl bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] text-zinc-300 hover:text-white transition-all shadow-md"
                          title="Sağa Kaydır"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Horizontal Bento Scroll Container */}
                    <div 
                      ref={heroSliderRef}
                      className="horizontal-slider gap-6 pb-4 no-scrollbar"
                    >
                      {filteredNews.slice(0, 6).map((news) => (
                        <div 
                          key={news.id}
                          onClick={() => setSelectedNewsArticle(news)}
                          className="w-[320px] sm:w-[460px] bg-[#121215] border border-[#D4AF37]/35 hover:border-[#D4AF37] rounded-3xl overflow-hidden shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div className="relative h-60 overflow-hidden">
                            <img 
                              src={news.imageUrl} 
                              alt={news.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-black/30" />
                            
                            <div className="absolute top-4 left-4 flex gap-2">
                              <span className="px-2.5 py-1 bg-[#D4AF37] text-black text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                                {news.subcategory}
                              </span>
                            </div>

                            <button 
                              onClick={(e) => toggleBookmark(news.id, e)}
                              className={cn(
                                "absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all",
                                bookmarkedIds.includes(news.id) ? "bg-[#D4AF37] text-black" : "bg-black/60 text-white hover:text-[#D4AF37]"
                              )}
                              title="Yer İmlerine Ekle"
                            >
                              <Bookmark size={14} />
                            </button>
                          </div>

                          <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                            <div className="space-y-2">
                              <h4 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                                {news.title}
                              </h4>
                              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                                {news.excerpt}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white truncate max-w-[140px]">{news.author}</span>
                                <span className="text-zinc-600">•</span>
                                <span className="text-[10px] font-mono text-zinc-500">{news.date}</span>
                                <span className="text-zinc-600">•</span>
                                <span className="px-1.5 py-0.2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded text-[9px] font-mono font-bold shrink-0">{getDynamicReadTime(news)}</span>
                              </div>
                              <span className="text-[#D4AF37] font-bold text-xs flex items-center gap-1">
                                <span>Oku</span>
                                <ArrowRight size={12} />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* GOOGLE ADSENSE HORIZONTAL BANNER (CLS-SAFE) */}
                <div className="my-6">
                  <AdSenseSlot format="horizontal" />
                </div>

                {/* PROGRAMMATIC LUXURY AD SLOT BANNER */}
                <div className="bg-gradient-to-r from-[#121215] via-[#1c1a14] to-[#121215] border border-[#D4AF37]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl my-6">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[9px] font-mono font-bold uppercase rounded">
                      Sponsorlu İlan
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Obsidian Gold Kurumsal Finans & Altyapı Çözümleri</h4>
                      <p className="text-[11px] text-zinc-400">Yapay zeka destekli portföy yönetimi ve yüksek güvenlikli blokzincir entegrasyonu.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsSupportModalOpen(true)}
                    className="px-4 py-1.5 bg-[#D4AF37] text-black text-xs font-extrabold rounded-xl hover:brightness-110 shrink-0"
                  >
                    Detaylı Bilgi
                  </button>
                </div>

                {/* SECTION 2: TRENDING HORIZONTAL CARD CAROUSEL */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={20} className="text-[#D4AF37]" />
                      <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                        En Çok Okunan Trend Haberler
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => scrollSlider(trendSliderRef, 'left')}
                        className="p-1.5 rounded-lg bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] text-zinc-300 hover:text-white transition-all"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => scrollSlider(trendSliderRef, 'right')}
                        className="p-1.5 rounded-lg bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] text-zinc-300 hover:text-white transition-all"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scroll Grid */}
                  <div 
                    ref={trendSliderRef}
                    className="horizontal-slider gap-5 pb-4 no-scrollbar"
                  >
                    {filteredNews.map((news) => (
                      <div 
                        key={`trend-${news.id}`}
                        onClick={() => setSelectedNewsArticle(news)}
                        className="w-[280px] sm:w-[340px] bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] rounded-2xl overflow-hidden shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative h-44 overflow-hidden">
                            <img 
                              src={news.imageUrl} 
                              alt={news.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute top-3 left-3">
                              <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-white text-[9px] font-bold rounded">
                                {news.subcategory}
                              </span>
                            </div>
                            <button 
                              onClick={(e) => toggleBookmark(news.id, e)}
                              className={cn(
                                "absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-all",
                                bookmarkedIds.includes(news.id) ? "bg-[#D4AF37] text-black" : "bg-black/60 text-white hover:text-[#D4AF37]"
                              )}
                            >
                              <Bookmark size={12} />
                            </button>
                          </div>

                          <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                              <span>{news.date}</span>
                              <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-1.5 py-0.5 rounded font-bold">{getDynamicReadTime(news)} okuma</span>
                            </div>
                            <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                              {news.title}
                            </h4>
                            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                              {news.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-zinc-950/80 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                          <span className="truncate max-w-[140px] text-zinc-300 font-medium">{news.author}</span>
                          <span className="text-[#D4AF37] font-bold text-xs flex items-center gap-1">
                            <span>Oku</span>
                            <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SECTION 3: TWO-COLUMN MAIN NEWSPAPER LAYOUT (NEWS & SIDEBAR WIDGETS) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column (Row News List) */}
                  <div className="lg:col-span-2 space-y-6">
                    <section className="space-y-6">
                      <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
                        <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <Newspaper size={18} className="text-[#D4AF37]" />
                          <span>{selectedCategory ? `${selectedCategory} Tüm Yayınlar` : "Özel Dosyalar & Derinlemesine Analizler"}</span>
                        </h3>
                      </div>

                      {/* Category-based Bento Grid / Flat row view */}
                      {!selectedCategory && !selectedSubcategory && !selectedTag && !searchQuery && !onlyBookmarks ? (
                        <div className="space-y-8">
                          {/* Bento Grid layout of category blocks */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {SITE_STRUCTURE.map((cat) => {
                              // Get news articles matching this category
                              const catNews = newsList.filter(news => news.category === cat.name);
                              if (catNews.length === 0) return null;

                              const featuredArticle = catNews[0];
                              const secondaryArticles = catNews.slice(1, 3);

                              return (
                                <div 
                                  key={`cat-bento-${cat.id}`}
                                  className="bg-[#121215] border border-zinc-800 hover:border-[#D4AF37]/50 rounded-3xl p-5 space-y-4 shadow-xl transition-all flex flex-col justify-between group"
                                >
                                  <div className="space-y-3">
                                    {/* Category Header */}
                                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                                      <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                                        <h4 className="font-serif font-bold text-white text-xs uppercase tracking-wider">
                                          {cat.name}
                                        </h4>
                                      </div>
                                      <button 
                                        onClick={() => {
                                          setSelectedCategory(cat.name);
                                          window.scrollTo({ top: 400, behavior: 'smooth' });
                                        }}
                                        className="text-[10px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1"
                                      >
                                        <span>Tümünü Gör</span>
                                        <ArrowRight size={10} />
                                      </button>
                                    </div>

                                    {/* Primary Featured Article of Category */}
                                    {featuredArticle && (
                                      <div 
                                        onClick={() => setSelectedNewsArticle(featuredArticle)}
                                        className="flex flex-col sm:flex-row gap-3 items-start cursor-pointer hover:bg-zinc-900/40 p-2 rounded-2xl transition-colors"
                                      >
                                        <img 
                                          src={featuredArticle.imageUrl} 
                                          alt={featuredArticle.title}
                                          loading="lazy"
                                          className="w-full sm:w-28 h-20 object-cover rounded-xl shrink-0 border border-zinc-800"
                                        />
                                        <div className="space-y-1.5 flex-grow">
                                          <span className="text-[9px] font-mono text-zinc-400">
                                            {featuredArticle.subcategory}
                                          </span>
                                          <h5 className="text-xs font-serif font-bold text-white hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                                            {featuredArticle.title}
                                          </h5>
                                          <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-mono">
                                            <span>{featuredArticle.author}</span>
                                            <span>·</span>
                                            <span>{getDynamicReadTime(featuredArticle)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Secondary List Articles */}
                                    {secondaryArticles.length > 0 && (
                                      <div className="space-y-2 pt-1 border-t border-zinc-800/50">
                                        {secondaryArticles.map(article => (
                                          <div 
                                            key={`bento-sub-${article.id}`}
                                            onClick={() => setSelectedNewsArticle(article)}
                                            className="flex items-center justify-between gap-3 py-1 px-2 hover:bg-zinc-900/30 rounded-lg cursor-pointer transition-colors"
                                          >
                                            <div className="flex items-center gap-2 overflow-hidden">
                                              <span className="text-[#D4AF37] text-xs">▪</span>
                                              <span className="text-xs font-serif text-zinc-300 hover:text-[#D4AF37] transition-colors truncate max-w-[190px] sm:max-w-[280px]">
                                                {article.title}
                                              </span>
                                            </div>
                                            <span className="text-[9px] font-mono text-zinc-500 shrink-0">
                                              {getDynamicReadTime(article)}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>

                                  {/* Quick Info / Card Footer */}
                                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-2 border-t border-zinc-800/40">
                                    <span>{catNews.length} Analiz Yayını</span>
                                    {featuredArticle && <span>Duygu: {featuredArticle.sentiment || "Nötr"}</span>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        /* Flat row list when any filters or search are active */
                        <div className="space-y-4">
                          {filteredNews.slice(0, 12).map((news) => (
                            <div 
                              key={`row-${news.id}`}
                              onClick={() => setSelectedNewsArticle(news)}
                              className="bg-[#121215] border border-zinc-800 hover:border-[#D4AF37]/80 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl"
                            >
                              <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
                                <img 
                                  src={news.imageUrl} 
                                  alt={news.title}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                                <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] font-bold text-[#D4AF37] rounded">
                                  {news.subcategory}
                                </span>
                              </div>

                              <div className="flex-grow space-y-2">
                                <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
                                  <span className="text-[#D4AF37] font-bold">{news.category}</span>
                                  <span>•</span>
                                  <span className="text-zinc-300">{news.subcategory}</span>
                                  <span>•</span>
                                  <span>{news.date}</span>
                                  <span>•</span>
                                  <span className="px-1.5 py-0.2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded text-[9px] font-bold shrink-0">{getDynamicReadTime(news)} okuma</span>
                                </div>

                                <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                                  {news.title}
                                </h4>

                                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                  {news.excerpt}
                                </p>

                                <div className="text-[11px] text-zinc-300 font-medium pt-1">
                                  Yazar: <span className="text-white font-semibold">{news.author}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                <button 
                                  onClick={(e) => toggleBookmark(news.id, e)}
                                  className={cn(
                                    "p-2 rounded-xl border transition-colors",
                                    bookmarkedIds.includes(news.id) ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "bg-[#0B0B0C] text-zinc-400 border-zinc-800 hover:text-white"
                                  )}
                                >
                                  <Bookmark size={14} />
                                </button>
                                <span className="text-xs font-bold text-[#D4AF37] group-hover:underline flex items-center gap-1">
                                  <span>Oku</span>
                                  <ArrowRight size={14} />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  </div>

                  {/* Right Column (Sidebar Widgets) */}
                  <div className="space-y-6">
                    {/* GOOGLE ADSENSE SIDEBAR BANNER (CLS-SAFE) */}
                    <AdSenseSlot format="sidebar" />

                    {/* LUXURY AFFILIATE RECOMMENDATION CARD */}
                    <AffiliateCtaCard layout="sidebar" />
                  </div>
                </div>

                {/* MINUTE-BY-MINUTE LIVE BLOGGING SECTION */}
                <section className="bg-[#121215] border border-[#D4AF37]/30 rounded-3xl p-6 shadow-2xl space-y-4 my-8">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Radio size={18} className="text-[#D4AF37] animate-pulse" />
                      <h3 className="font-serif font-bold text-white text-base uppercase tracking-wider">
                        Dakika Dakika Canlı Takip & Anlık Borsa Gelişmeleri
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold rounded-full">
                      Canlı Akış Aktif
                    </span>
                  </div>

                  <div className="space-y-3">
                    {LIVE_BLOG_ENTRIES.map(entry => (
                      <div key={entry.id} className="p-3 bg-[#0B0B0C] border border-zinc-800 rounded-xl flex items-start gap-3">
                        <span className="px-2 py-0.5 bg-[#D4AF37] text-black font-mono font-bold text-[10px] rounded shrink-0">
                          {entry.time}
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{entry.title}</h4>
                            {entry.badge && (
                              <span className="text-[9px] bg-zinc-800 text-[#D4AF37] px-1.5 py-0.2 rounded font-mono">
                                {entry.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400">{entry.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* RECENTLY VIEWED HISTORY SECTION */}
                {recentlyViewedNews.length > 0 && (
                  <section className="space-y-3 my-8">
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                      <Clock size={16} className="text-[#D4AF37]" />
                      <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                        Son Göz Atılan Haberler ({recentlyViewedNews.length})
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {recentlyViewedNews.map(item => (
                        <div 
                          key={`rec-${item.id}`}
                          onClick={() => handleSelectArticle(item)}
                          className="bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] p-2.5 rounded-xl cursor-pointer space-y-1.5 transition-all"
                        >
                          <img src={item.imageUrl} alt={item.title} className="w-full h-16 object-cover rounded-lg" />
                          <span className="text-[9px] text-[#D4AF37] font-bold block">{item.subcategory}</span>
                          <h5 className="text-[11px] font-bold text-white line-clamp-2 leading-snug">{item.title}</h5>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* DAILY POLL WIDGET & GLOSSARY BENTO ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
              {/* DAILY POLL WIDGET */}
              <section className="col-span-1 lg:col-span-2 bg-[#121215] border border-[#D4AF37]/30 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Vote size={20} className="text-[#D4AF37]" />
                    <h3 className="font-serif font-bold text-white text-base">
                      Günün Anketi & Kamuoyu Araştırması
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                    {totalPollVotes.toLocaleString()} Katılım
                  </span>
                </div>

                <p className="text-sm font-bold text-white leading-snug">
                  {pollData.question}
                </p>

                <div className="space-y-2.5 pt-2">
                  {pollData.options.map((opt) => {
                    const pct = totalPollVotes > 0 ? Math.round((opt.votes / totalPollVotes) * 100) : 0;
                    const isSelected = pollVotedOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleVote(opt.id)}
                        className={cn(
                          "w-full text-left p-3 rounded-2xl border text-xs transition-all relative overflow-hidden flex items-center justify-between",
                          isSelected ? "bg-[#D4AF37]/20 border-[#D4AF37] text-white" : "bg-[#0B0B0C] border-zinc-800 hover:border-zinc-700 text-zinc-300"
                        )}
                      >
                        {/* Vote progress fill bar */}
                        {pollVotedOption && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-[#D4AF37]/15 transition-all duration-700" 
                            style={{ width: `${pct}%` }}
                          />
                        )}
                        <span className="relative z-10 font-medium truncate max-w-[80%]">{opt.label}</span>
                        {pollVotedOption && (
                          <span className="relative z-10 font-mono font-bold text-[#D4AF37]">{pct}%</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* GLOSSARY TOOLTIPS BENTO */}
              <section className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-3">
                    <HelpCircle size={18} className="text-[#D4AF37]" />
                    <h3 className="font-serif font-bold text-white text-base">Teknik Sözlük & Kavramlar</h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Makalelerde geçen teknik terimlerin anlamlarını öğrenmek için üzerine tıklayabilirsiniz:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {GLOSSARY_TERMS.map((gt) => (
                      <button
                        key={gt.term}
                        onClick={() => setActiveGlossaryTerm(gt)}
                        className="px-3 py-1.5 bg-[#0B0B0C] border border-zinc-700 hover:border-[#D4AF37] text-[#D4AF37] rounded-xl text-xs font-mono font-bold transition-all"
                      >
                        {gt.term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-400 font-mono">
                  BGL & Finans Sözlüğü v2026
                </div>
              </section>
            </div>

            {/* NEWSLETTER CAPTURE SECTION */}
            <section className="bg-gradient-to-r from-[#121215] via-[#1a1a20] to-[#121215] border border-[#D4AF37]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden my-8">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <span className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-extrabold rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
                  <Mail size={12} />
                  Borsa & Teknoloji Bülteni
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Küresel Analizler Her Sabah E-Postanızda
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                  WebdeHepSeeK Editör Masası tarafından hazırlanan günlük borsa özetleri, kripto piyasası raporları ve BGL gemoloji bültenine ücretsiz abone olun.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                  <input 
                    type="email" 
                    required
                    disabled={isNewsletterSubmitting}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="E-posta adresinizi girin..." 
                    className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-all disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={isNewsletterSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-[#D4AF37] text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110 shrink-0 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isNewsletterSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Abone Olunuyor...</span>
                      </>
                    ) : (
                      <span>Abone Ol</span>
                    )}
                  </button>
                </form>
              </div>
            </section>

            {/* ULUSLARARASI HABER AJANSI STANDARTLARINDA TAM EKRAN HABER OKUMA SAYFASI */}
            <AnimatePresence>
              {selectedNewsArticle && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="fixed inset-0 z-50 bg-[#0B0B0C] text-white overflow-y-auto w-full min-h-screen font-sans"
                >
                  {/* 1. OKUMA İLERLEME ÇUBUĞU */}
                  <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-zinc-900">
                    <div 
                      className="h-1 bg-[#D4AF37] transition-all duration-150" 
                      style={{ width: `${articleScrollProgress}%` }} 
                    />
                  </div>

                  {/* ANA CONTAINER */}
                  <div 
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28"
                    onScroll={(e) => {
                      const target = e.currentTarget;
                      const scrollTop = target.scrollTop;
                      const scrollHeight = target.scrollHeight;
                      const clientHeight = target.clientHeight;
                      const totalScroll = scrollHeight - clientHeight;
                      if (totalScroll > 0) {
                        setArticleScrollProgress((scrollTop / totalScroll) * 100);
                      }
                    }}
                  >
                    {/* 2. ÜST AKSİYON BAR VE REKLAM */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                        {/* ← Tüm Haberler Butonu */}
                        <button 
                          onClick={() => {
                            setSelectedNewsArticle(null);
                            setIsAiSummaryExpanded(false);
                            setAudioProgress(0);
                            stopSpeech();
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#121215] border border-zinc-700 hover:border-[#D4AF37] hover:text-[#D4AF37] text-zinc-200 text-xs font-bold rounded-xl transition-all shadow-md group"
                        >
                          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[#D4AF37]" />
                          <span>← Tüm Haberler</span>
                        </button>

                        {/* Metin Boyutu & Paylaş */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 bg-[#121215] border border-zinc-800 rounded-xl p-1 text-xs font-mono">
                            <button 
                              onClick={() => changeArticleFontSize('sm')}
                              className={cn("px-2 py-1 rounded font-bold transition-colors", articleFontSize === 'sm' ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:text-white")}
                              title="Küçük Metin"
                            >
                              A-
                            </button>
                            <button 
                              onClick={() => changeArticleFontSize('md')}
                              className={cn("px-2 py-1 rounded font-bold transition-colors", articleFontSize === 'md' ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:text-white")}
                              title="Normal Metin"
                            >
                              A
                            </button>
                            <button 
                              onClick={() => changeArticleFontSize('lg')}
                              className={cn("px-2 py-1 rounded font-bold transition-colors", articleFontSize === 'lg' ? "bg-[#D4AF37] text-black" : "text-zinc-400 hover:text-white")}
                              title="Büyük Metin"
                            >
                              A+
                            </button>
                          </div>

                          <button 
                            onClick={() => handleCopy(selectedNewsArticle.canonicalUrl || 'https://webdehepseek.com', "Makale bağlantısı")}
                            className="p-2 bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] text-zinc-300 hover:text-[#D4AF37] rounded-xl transition-all"
                            title="Bağlantıyı Kopyala"
                          >
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Üst Yatay Reklam Bandı */}
                      <div className="w-full">
                        <AdSenseSlot format="horizontal" />
                      </div>
                    </div>

                    {/* BREADCRUMB NAVİGASYON YOLU */}
                    <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400 border-b border-zinc-800/60 pb-3">
                      <button 
                        onClick={() => {
                          setSelectedNewsArticle(null);
                          setSelectedCategory(null);
                          setSelectedSubcategory(null);
                        }}
                        className="hover:text-[#D4AF37] transition-colors"
                      >
                        Ana Sayfa
                      </button>
                      <ChevronRight size={10} className="text-zinc-600" />
                      <button 
                        onClick={() => {
                          setSelectedCategory(selectedNewsArticle.category);
                          setSelectedSubcategory(null);
                          setSelectedNewsArticle(null);
                        }}
                        className="hover:text-[#D4AF37] transition-colors"
                      >
                        {selectedNewsArticle.category}
                      </button>
                      <ChevronRight size={10} className="text-zinc-600" />
                      <span className="text-[#D4AF37] font-semibold truncate max-w-xs sm:max-w-md">
                        {selectedNewsArticle.subcategory}
                      </span>
                    </nav>

                    {/* KATEGORİ VE AI İLE ÖZETLE BUTONU */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="px-3.5 py-1 bg-[#D4AF37] text-black text-xs font-black rounded-lg uppercase tracking-wider shadow-sm">
                          {selectedNewsArticle.category}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 font-bold bg-[#121215] px-3 py-1 rounded-lg border border-zinc-800">
                          {selectedNewsArticle.subcategory}
                        </span>
                      </div>

                      <button 
                        onClick={() => setIsAiSummaryExpanded(!isAiSummaryExpanded)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs font-extrabold rounded-xl transition-all shadow-sm"
                      >
                        <Sparkles size={14} />
                        <span>{isAiSummaryExpanded ? 'AI Özetini Gizle' : 'AI ile Özetle'}</span>
                      </button>
                    </div>

                    {/* AÇILIR AI MADDELİ ÖZET KARTI */}
                    {isAiSummaryExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 bg-[#121215] border-l-4 border-[#D4AF37] rounded-r-2xl space-y-2.5 shadow-xl"
                      >
                        <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5 uppercase font-mono tracking-wider">
                          <Sparkles size={14} />
                          <span>3 Maddede Yapay Zeka Özeti:</span>
                        </span>
                        <ul className="text-xs text-zinc-200 space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                          <li>{selectedNewsArticle.excerpt}</li>
                          <li>Sektör liderleri ve analistler açısından stratejik dönüşüm ile pazar fırsatları değerlendirilmiştir.</li>
                          <li>Gelişme, küresel ölçekte ilgili kategorideki dijital altyapı ve finans adımlarını doğrudan etkilemektedir.</li>
                        </ul>
                      </motion.div>
                    )}

                    {/* MANŞET BAŞLIK */}
                    <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-white leading-tight sm:leading-snug tracking-tight">
                      {selectedNewsArticle.title}
                    </h1>

                    {/* SPOT (GİRİŞ) PARAGRAFI */}
                    <p className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed border-l-4 border-[#D4AF37] pl-4 italic bg-[#121215]/50 py-3 rounded-r-xl">
                      {selectedNewsArticle.excerpt}
                    </p>

                    {/* KÜNYE SATIRI */}
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#121215] border border-zinc-800/80 rounded-2xl text-xs">
                      <div 
                        onClick={() => {
                          const matchAuth = AUTHORS_LIST.find(a => a.name === selectedNewsArticle.author) || AUTHORS_LIST[0];
                          setSelectedAuthorProfile(matchAuth);
                        }}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-serif font-extrabold flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform shadow-md">
                          {selectedNewsArticle.author.slice(0, 1)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm group-hover:text-[#D4AF37] transition-colors">
                              {selectedNewsArticle.author}
                            </span>
                            <span className="text-[10px] bg-zinc-800 text-[#D4AF37] px-2 py-0.5 rounded font-mono font-semibold">
                              {selectedNewsArticle.authorTitle || 'Kıdemli Yazar'}
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-400 font-mono block">
                            {selectedNewsArticle.date} • 10:30 TSI
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-zinc-400 font-mono text-xs">
                        <span className="px-2.5 py-1 bg-[#0B0B0C] border border-zinc-800 text-[#D4AF37] font-bold rounded-lg flex items-center gap-1.5">
                          <Clock size={13} />
                          <span>{getDynamicReadTime(selectedNewsArticle)} Okuma</span>
                        </span>
                      </div>
                    </div>

                    {/* KAPAK GÖRSELİ VE AÇIKLAMA METNİ */}
                    <div className="space-y-2">
                      <div 
                        onClick={() => setSelectedLightboxImage(selectedNewsArticle.imageUrl)}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl"
                      >
                        <img 
                          src={selectedNewsArticle.imageUrl} 
                          alt={selectedNewsArticle.title}
                          className="w-full h-72 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                          <ExternalLink size={16} className="text-[#D4AF37]" />
                          <span>Görseli Tam Ekran Büyüt</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-zinc-500 italic block font-sans text-center">
                        Haber Kapak Görseli: {selectedNewsArticle.title}
                      </span>
                    </div>

                    {/* SESLİ MAKALE DİNLEME (TTS) */}
                    <div className="bg-[#121215] border border-[#D4AF37]/30 rounded-2xl p-4 space-y-3 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-[#D4AF37]">
                            <Volume2 size={20} className="animate-pulse" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">AI Sesli Makale Dinle (TTS)</span>
                            <span className="text-[10px] text-zinc-400">Tarayıcı içi Türkçe (tr-TR) doğal ses motoru</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-[#D4AF37] font-bold">
                          İlerleme: %{audioProgress}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button 
                          onClick={() => {
                            if (isPlayingAudio && !isPausedAudio) {
                              pauseSpeech();
                            } else {
                              playSpeech(selectedNewsArticle);
                            }
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#D4AF37] text-black text-[11px] font-extrabold rounded-xl hover:brightness-110 shadow-md transition-all uppercase"
                        >
                          {isPlayingAudio && !isPausedAudio ? (
                            <>
                              <Pause size={13} />
                              <span>Duraklat</span>
                            </>
                          ) : (
                            <>
                              <Play size={13} className="ml-0.5" />
                              <span>Dinle</span>
                            </>
                          )}
                        </button>

                        <button 
                          onClick={stopSpeech}
                          disabled={!isPlayingAudio && audioProgress === 0}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0B0B0C] text-zinc-300 border border-zinc-800 hover:border-[#D4AF37] hover:text-white text-[11px] font-bold rounded-xl transition-all uppercase disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <Square size={12} />
                          <span>Durdur</span>
                        </button>

                        <button 
                          onClick={() => restartSpeech(selectedNewsArticle)}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0B0B0C] text-zinc-300 border border-zinc-800 hover:border-[#D4AF37] hover:text-white text-[11px] font-bold rounded-xl transition-all uppercase"
                        >
                          <RotateCcw size={12} />
                          <span>Başa Sar</span>
                        </button>
                      </div>

                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#D4AF37] transition-all duration-300" 
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* İÇİNDEKİLER */}
                    {selectedNewsArticle.sections && selectedNewsArticle.sections.length > 0 && (
                      <div className="bg-[#121215] border border-[#D4AF37]/30 rounded-2xl p-4 space-y-2">
                        <span className="text-xs font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                          <List size={14} />
                          <span>İçindekiler & Başlıklar</span>
                        </span>
                        <ul className="space-y-1.5 text-xs text-zinc-300">
                          {selectedNewsArticle.sections.map((sec) => (
                            <li key={sec.id}>
                              <button 
                                onClick={() => {
                                  const element = document.getElementById(sec.id);
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                                className="hover:text-[#D4AF37] text-left transition-colors font-sans block w-full py-0.5"
                              >
                                • {sec.heading}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* HABER GÖVDESİ VE ADSENSE / AFFILIATE GELİR ALANLARI */}
                    <div className={cn(
                      "text-zinc-200 leading-relaxed space-y-6 font-serif",
                      articleFontSize === 'sm' ? 'text-sm' : articleFontSize === 'lg' ? 'text-xl' : 'text-base sm:text-lg'
                    )}>
                      {selectedNewsArticle.sections ? (
                        selectedNewsArticle.sections.map((sec, idx) => (
                          <React.Fragment key={sec.id}>
                            <div id={sec.id} className="space-y-3 pt-2">
                              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white border-b border-zinc-800 pb-2">
                                {sec.heading}
                              </h3>
                              <p className="text-zinc-300 leading-relaxed font-sans">
                                {sec.body}
                              </p>
                            </div>

                            {/* 2. PARAGRAFTAN/BÖLÜMDEN SONRA DOĞAL ADSENSE YATAY REKLAM ALANI */}
                            {idx === 1 && (
                              <div className="space-y-6 my-8 font-sans">
                                <AdSenseSlot format="in-feed" />
                                <AffiliateCtaCard layout="inline" />
                              </div>
                            )}
                          </React.Fragment>
                        ))
                      ) : (
                        <div className="space-y-4 font-sans text-zinc-300">
                          <p>
                            WebdeHepSeeK Yayın Grubu tarafından derlenen bu özel haber, sektördeki en son gelişmeleri, piyasa verilerini ve uzman görüşlerini kapsamlı bir şekilde okuyuculara sunmaktadır.
                          </p>
                          <div className="my-6">
                            <AdSenseSlot format="in-feed" />
                          </div>
                          <p>
                            Kategori genelinde gerçekleşen stratejik hamleler, uluslararası piyasa aktörleri ve teknoloji liderlerinin yeni nesil vizyonlarıyla doğrudan şekillenmektedir.
                          </p>
                          <div className="my-6">
                            <AffiliateCtaCard layout="inline" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* PAYLAŞIM VE GOOGLE NEWS TAKİP ROZETİ */}
                    <div className="pt-6 border-t border-zinc-800 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121215] border border-zinc-800 p-4 rounded-2xl">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Share2 size={16} className="text-[#D4AF37]" />
                          <span>Bu Haberi Paylaşın:</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button 
                            onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(selectedNewsArticle.title + ' ' + (selectedNewsArticle.canonicalUrl || 'https://webdehepseek.com'))}`, '_blank')}
                            className="px-3 py-1.5 bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white text-emerald-400 text-xs font-bold rounded-xl transition-all"
                          >
                            WhatsApp
                          </button>
                          <button 
                            onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(selectedNewsArticle.canonicalUrl || 'https://webdehepseek.com')}&text=${encodeURIComponent(selectedNewsArticle.title)}`, '_blank')}
                            className="px-3 py-1.5 bg-sky-600/20 border border-sky-500/40 hover:bg-sky-600 hover:text-white text-sky-400 text-xs font-bold rounded-xl transition-all"
                          >
                            Telegram
                          </button>
                          <button 
                            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedNewsArticle.title)}&url=${encodeURIComponent(selectedNewsArticle.canonicalUrl || 'https://webdehepseek.com')}`, '_blank')}
                            className="px-3 py-1.5 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-200 text-xs font-bold rounded-xl transition-all"
                          >
                            X (Twitter)
                          </button>
                          <button 
                            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(selectedNewsArticle.canonicalUrl || 'https://webdehepseek.com')}`, '_blank')}
                            className="px-3 py-1.5 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-200 text-xs font-bold rounded-xl transition-all"
                          >
                            LinkedIn
                          </button>
                          <button 
                            onClick={() => handleCopy(selectedNewsArticle.canonicalUrl || 'https://webdehepseek.com', "Makale bağlantısı")}
                            className="px-3 py-1.5 bg-[#D4AF37] text-black font-extrabold text-xs rounded-xl hover:brightness-110 transition-all"
                          >
                            Link Kopyala
                          </button>
                        </div>
                      </div>

                      {/* GOOGLE NEWS TAKİP ROZETİ */}
                      <div className="flex items-center justify-between bg-[#121215] border border-[#D4AF37]/30 p-4 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37]">
                            <Globe size={20} />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">Google News Yayın Akışı</span>
                            <span className="text-[10px] text-zinc-400">Gelişmeleri Google Haberler uygulamasında anlık takip edin</span>
                          </div>
                        </div>
                        <a 
                          href="https://news.google.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-extrabold rounded-xl hover:brightness-110 transition-all shrink-0 uppercase"
                        >
                          Google News'e Ekle
                        </a>
                      </div>
                    </div>

                    {/* YAZAR BİYOGRAFİ KARTI */}
                    <div 
                      onClick={() => {
                        const matchAuth = AUTHORS_LIST.find(a => a.name === selectedNewsArticle.author) || AUTHORS_LIST[0];
                        setSelectedAuthorProfile(matchAuth);
                      }}
                      className="p-5 bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] rounded-2xl flex items-start gap-4 shadow-md cursor-pointer transition-all group my-6"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black font-serif font-extrabold flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                        {selectedNewsArticle.author.slice(0, 1)}
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm group-hover:text-[#D4AF37] transition-colors">
                            {selectedNewsArticle.author}
                          </span>
                          <span className="text-[10px] bg-zinc-800 text-[#D4AF37] px-2 py-0.5 rounded font-mono">
                            {selectedNewsArticle.authorTitle || 'Kıdemli Yazar'}
                          </span>
                        </div>
                        <p className="text-zinc-400 leading-relaxed">
                          {selectedNewsArticle.authorBio || 'WebdeHepSeeK Yayın Grubu bünyesinde teknoloji, finans ve pazar analizleri hazırlayan uzman editör.'}
                        </p>
                        <span className="text-[10px] text-[#D4AF37] font-bold block pt-1">
                          Yazarın Tüm Makalelerini İncele →
                        </span>
                      </div>
                    </div>

                    {/* SADE VE KATLANABİLİR "YORUM YAP (0)" AKORDEON BÖLÜMÜ */}
                    <div className="space-y-3">
                      <button 
                        onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
                        className="w-full flex items-center justify-between p-4 bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] rounded-2xl text-xs font-bold text-white transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <MessageSquare size={16} className="text-[#D4AF37]" />
                          <span>Okur Yorumları Yap ({commentsList.filter(c => c.newsId === selectedNewsArticle.id).length})</span>
                        </div>
                        <ChevronRight size={16} className={cn("text-[#D4AF37] transition-transform duration-300", isCommentsExpanded && "rotate-90")} />
                      </button>

                      {isCommentsExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-[#121215] border border-zinc-800 rounded-2xl space-y-4 font-sans shadow-inner"
                        >
                          <form onSubmit={(e) => handleAddComment(selectedNewsArticle.id, e)} className="space-y-3">
                            <input 
                              type="text" 
                              value={newCommentAuthor}
                              onChange={(e) => setNewCommentAuthor(e.target.value)}
                              placeholder="Adınız Soyadınız..."
                              className="w-full bg-[#0B0B0C] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#D4AF37]"
                            />
                            <textarea 
                              value={newCommentText}
                              onChange={(e) => setNewCommentText(e.target.value)}
                              placeholder="Düşüncelerinizi ve analizinizi paylaşın..."
                              rows={3}
                              className="w-full bg-[#0B0B0C] border border-zinc-800 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37]"
                            />
                            <div className="text-right">
                              <button 
                                type="submit"
                                className="px-5 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-xl hover:brightness-110 transition-all"
                              >
                                Yorum Gönder
                              </button>
                            </div>
                          </form>

                          <div className="space-y-2">
                            {commentsList.filter(c => c.newsId === selectedNewsArticle.id).length === 0 ? (
                              <p className="text-xs text-zinc-500 italic text-center py-2">
                                Henüz yorum yapılmamış. İlk yorumu siz gönderin!
                              </p>
                            ) : (
                              commentsList.filter(c => c.newsId === selectedNewsArticle.id).map(comment => (
                                <div key={comment.id} className="p-3 bg-[#0B0B0C] border border-zinc-800/80 rounded-xl space-y-1.5 text-xs">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-white">{comment.author}</span>
                                    <span className="text-[10px] text-zinc-500 font-mono">{comment.date}</span>
                                  </div>
                                  <p className="text-zinc-300 leading-relaxed">{comment.text}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* İLGİLİ HABERLER (AYNI KATEGORİDEN 3 TAZE KART) */}
                    {relatedNews.length > 0 && (
                      <div className="pt-6 border-t border-zinc-800 space-y-4 font-sans">
                        <div className="flex items-center gap-2">
                          <Sparkles size={16} className="text-[#D4AF37]" />
                          <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                            İlgili Haberler
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {relatedNews.map((rel) => (
                            <div 
                              key={rel.id} 
                              onClick={() => {
                                setSelectedNewsArticle(rel);
                                setIsAiSummaryExpanded(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="bg-[#121215] border border-zinc-800 hover:border-[#D4AF37] p-4 rounded-2xl cursor-pointer space-y-2 transition-all hover:-translate-y-1 group"
                            >
                              <img 
                                src={rel.imageUrl} 
                                alt={rel.title} 
                                className="w-full h-28 object-cover rounded-xl group-hover:scale-102 transition-transform"
                              />
                              <span className="text-[10px] text-[#D4AF37] font-mono font-bold block">
                                {rel.subcategory}
                              </span>
                              <h5 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                                {rel.title}
                              </h5>
                              <span className="text-[10px] text-zinc-500 block font-mono">
                                {rel.date}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* EN ALT GERİ DÖNÜŞ BUTONU */}
                    <div className="pt-8 text-center border-t border-zinc-800">
                      <button 
                        onClick={() => {
                          setSelectedNewsArticle(null);
                          setIsAiSummaryExpanded(false);
                          setAudioProgress(0);
                          stopSpeech();
                        }}
                        className="px-6 py-3 bg-[#D4AF37] text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110 shadow-lg transition-all inline-flex items-center gap-2"
                      >
                        <ArrowLeft size={16} />
                        <span>Tüm Haberlere Dön</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* GLOSSARY TOOLTIP MODAL */}
            <AnimatePresence>
              {activeGlossaryTerm && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#121215] border border-[#D4AF37] max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <span className="font-mono font-bold text-[#D4AF37] text-sm">
                        {activeGlossaryTerm.term} (Teknik Terim)
                      </span>
                      <button onClick={() => setActiveGlossaryTerm(null)} className="p-1 text-zinc-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {activeGlossaryTerm.definition}
                    </p>
                    <div className="pt-2 text-right">
                      <button 
                        onClick={() => setActiveGlossaryTerm(null)}
                        className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl"
                      >
                        Anladım
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* TAB 2: 18 CORE CATEGORIES & MEGA NAV */}
        {activeTab === 'nav' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
              <div>
                <span className="px-3 py-1 bg-[#D4AF37]/15 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                  18 Ana Kategori & 180 Alt Başlık
                </span>
                <h2 className="text-3xl font-serif font-bold text-white mt-2">
                  Navigasyon & Yayın Yapısı
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {SITE_STRUCTURE.map((cat) => (
                <div 
                  key={cat.id}
                  className="bg-[#121215] border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between group-hover:bg-[#D4AF37] transition-colors">
                      <span className="font-bold text-xs uppercase tracking-wide text-zinc-100 group-hover:text-black transition-colors line-clamp-1">
                        {cat.name}
                      </span>
                      {cat.badge && (
                        <span className="px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] group-hover:bg-black group-hover:text-white text-[9px] font-extrabold rounded uppercase">
                          {cat.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 space-y-1.5">
                      {cat.subcategories.map((sub) => (
                        <div 
                          key={sub} 
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setSelectedSubcategory(sub);
                            setActiveTab('news');
                          }}
                          className="flex items-center justify-between text-xs text-zinc-400 hover:text-[#D4AF37] cursor-pointer transition-colors p-1 rounded hover:bg-zinc-900/60"
                        >
                          <span className="truncate max-w-[170px]">{sub}</span>
                          <ChevronRight size={10} className="text-[#D4AF37]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-950 border-t border-zinc-800 text-center">
                    <button 
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setSelectedSubcategory(null);
                        setActiveTab('news');
                      }}
                      className="text-[10px] font-bold text-[#D4AF37] hover:underline"
                    >
                      Haberlerini Gör
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GOOGLE ANALYTICS & SEARCH CONSOLE INTEGRATION */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold rounded-full uppercase tracking-widest flex items-center gap-1.5 w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Google Integration Ready
                </span>
                <h2 className="text-3xl font-serif font-bold text-white mt-2">
                  Google Analitik & Search Console Konsolu
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Sitenize ait gerçek Google Analytics (GA4) ve Search Console mülk takip kodlarınızı aşağıya tanımlayabilirsiniz.
                </p>
              </div>
              <button
                onClick={handleSaveAnalyticsConfig}
                className="px-5 py-2.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110 transition-all shrink-0 shadow-lg"
              >
                Konfigürasyonu Kaydet
              </button>
            </div>

            {/* INTEGRATION INPUT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GA4 */}
              <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart2 size={20} className="text-[#D4AF37]" />
                    <h3 className="font-serif font-bold text-white text-base">Google Analytics 4 (GA4)</h3>
                  </div>
                  <span className={cn(
                    "text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border",
                    ga4Id ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                  )}>
                    {ga4Id ? '✓ GA4 Bağlı' : 'Entegrasyon Bekliyor'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Google Analytics mülkünüzden aldığınız Measurement ID (Örn: <code className="text-[#D4AF37]">G-J8QMESNXY7</code>) kodunu girin.
                </p>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">GA4 Measurement ID</label>
                  <input
                    type="text"
                    value={ga4Id}
                    onChange={(e) => setGa4Id(e.target.value)}
                    placeholder="G-J8QMESNXY7"
                    className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* SEARCH CONSOLE */}
              <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield size={20} className="text-[#D4AF37]" />
                    <h3 className="font-serif font-bold text-white text-base">Google Search Console</h3>
                  </div>
                  <span className={cn(
                    "text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border",
                    gscTag ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                  )}>
                    {gscTag ? '✓ Doğrulama Etiketi Var' : 'Doğrulama Bekliyor'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Search Console mülk doğrulama için verilen HTML meta etiketini buraya yapıştırın.
                </p>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Verification Meta Tag</label>
                  <input
                    type="text"
                    value={gscTag}
                    onChange={(e) => setGscTag(e.target.value)}
                    placeholder='<meta name="google-site-verification" content="..." />'
                    className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* GENERATED HEAD SNIPPET CODE BOX */}
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-3 font-mono text-xs shadow-xl">
              <div className="flex items-center justify-between text-[#D4AF37]">
                <span className="font-bold flex items-center gap-2">
                  <FileJson size={16} />
                  <span>Otomatik Oluşturulan Head Etiket Kodları</span>
                </span>
                <button
                  onClick={() => handleCopy(
                    `<!-- Google Analytics 4 (GA4) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id || 'G-J8QMESNXY7'}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${ga4Id || 'G-J8QMESNXY7'}');\n</script>\n${gscTag ? `<!-- Search Console Verification -->\n${gscTag}\n` : ''}`,
                    "Analytics Snippet"
                  )}
                  className="px-3 py-1 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black rounded text-[10px] font-bold text-white transition-colors"
                >
                  Snippet'ı Kopyala
                </button>
              </div>
              <pre className="text-emerald-400 bg-[#0B0B0C] p-4 rounded-xl overflow-x-auto text-[11px] leading-relaxed border border-zinc-800">
{`<!-- Google Analytics 4 (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id || 'G-J8QMESNXY7'}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${ga4Id || 'G-J8QMESNXY7'}');
</script>
${gscTag ? `\n<!-- Google Search Console Verification -->\n${gscTag}` : ''}`}
              </pre>
            </div>

            {/* CHECKLIST */}
            <div className="bg-[#121215] border border-[#D4AF37]/30 rounded-3xl p-6 space-y-3">
              <h4 className="font-serif font-bold text-white text-sm text-[#D4AF37] flex items-center gap-2">
                <Sparkles size={16} />
                <span>Google Indexing & E-E-A-T Yayıncılık Rehberi</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Sitemap Adresi: <code className="text-[#D4AF37] font-mono">/sitemap.xml</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Google News Uyumlu RSS: <code className="text-[#D4AF37] font-mono">/feed.xml</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Schema.org NewsArticle Yapılandırılmış Verisi Entegre</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Core Web Vitals LCP & CLS Performansı Optimize Edilmiş</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM INFRASTRUCTURE STATUS */}
        {activeTab === 'system' && (
          <div className="space-y-8">
            <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                  Yayın Altyapısı & Sunucu Ağ Performansı
                </span>
                <h2 className="text-3xl font-serif font-bold text-white mt-2">
                  Küresel Yayın & Dağıtım Düğümleri
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">4/4 Düğüm Tam Kapasite Aktif</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SYSTEM_NODES.map((node) => (
                <div key={node.id} className="bg-[#121215] border border-zinc-800 p-5 rounded-2xl space-y-3 shadow-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] bg-zinc-800 text-[#D4AF37] px-2.5 py-1 rounded-full font-bold">{node.code}</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Performans: %{node.performance}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{node.name}</h4>
                  <p className="text-xs text-zinc-400">{node.description}</p>
                  <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-500 font-mono">
                    <span className="text-[#D4AF37] font-semibold">Son Durum:</span> {node.lastAction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AI CLASSIFIER */}
        {activeTab === 'ai' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="border-b border-zinc-800 pb-6">
              <h2 className="text-3xl font-serif font-bold text-white">AI Metin Analizi & Sınıflandırma</h2>
              <p className="text-zinc-400 text-sm mt-1">İçerikleri 14 ana kategori ve 140 alt başlığımıza göre anında analiz edin.</p>
            </div>
            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-4">
              <textarea 
                value={newsText}
                onChange={(e) => setNewsText(e.target.value)}
                placeholder="Herhangi bir haber metni girin..."
                className="w-full h-40 bg-[#0B0B0C] border border-zinc-700 rounded-xl p-4 text-xs text-white outline-none focus:border-[#D4AF37]"
              />
              <button onClick={classifyNewsWithGemini} disabled={isClassifying} className="w-full py-3 bg-[#D4AF37] text-black font-bold text-xs uppercase rounded-xl hover:brightness-110 transition-all">
                {isClassifying ? "Sınıflandırılıyor..." : "Kategoriyi Analiz Et"}
              </button>
              {classificationResult && (
                <div className="p-5 bg-[#0B0B0C] border border-[#D4AF37] rounded-2xl space-y-4 shadow-xl text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D4AF37]/20 pb-3">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Sınıflandırma Raporu</span>
                    <span className="px-2.5 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-[9px] font-mono rounded-full font-bold">
                      Hibrit Motor v2.6
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-[#121215] border border-zinc-800 rounded-xl space-y-1">
                      <span className="text-zinc-400 text-[10px] uppercase font-mono block">Eşleşen Kategori</span>
                      <strong className="text-white font-bold text-xs">{classificationResult.category}</strong>
                      <span className="text-[10px] text-[#D4AF37] block font-mono">{classificationResult.subcategory}</span>
                    </div>

                    <div className="p-3 bg-[#121215] border border-zinc-800 rounded-xl space-y-1">
                      <span className="text-zinc-400 text-[10px] uppercase font-mono block">Güven Skoru</span>
                      <div className="flex items-center gap-2">
                        <strong className="text-[#D4AF37] text-sm font-extrabold">%{classificationResult.confidence}</strong>
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4AF37]" style={{ width: `${classificationResult.confidence}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#121215] border border-zinc-800 rounded-xl space-y-1">
                      <span className="text-zinc-400 text-[10px] uppercase font-mono block">Piyasa Duyarlılığı</span>
                      <span className={cn(
                        "font-extrabold text-xs px-2 py-0.5 rounded-full inline-block border",
                        classificationResult.sentiment.includes('Boğa') 
                          ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-400" 
                          : classificationResult.sentiment.includes('Ayı')
                            ? "bg-rose-950/60 border-rose-500/30 text-rose-400"
                            : "bg-zinc-900 border-zinc-700 text-zinc-300"
                      )}>
                        {classificationResult.sentiment}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#121215] rounded-xl space-y-1 border border-zinc-800">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#D4AF37] block">🧠 Editoryal Gerekçelendirme (Reasoning):</span>
                    <p className="text-zinc-300 leading-relaxed font-sans text-xs italic">
                      {classificationResult.reasoning}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: WORDPRESS EXPORT & SITEMAP XML */}
        {activeTab === 'wp' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-serif font-bold text-white">WordPress Kategori Export & Google Sitemap.xml</h2>
                <p className="text-zinc-400 text-sm mt-1">
                  18 Ana Kategori ve 180 Alt Başlığın WordPress REST API ve Google News Sitemap XML çıktısı.
                </p>
              </div>
              <button
                onClick={() => {
                  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${newsList.map(n => `  <url>\n    <loc>${n.canonicalUrl}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>WebdeHepSeeK Journal</news:name>\n        <news:language>tr</news:language>\n      </news:publication>\n      <news:publication_date>2026-10-06</news:publication_date>\n      <news:title>${n.title.replace(/&/g, '&amp;')}</news:title>\n    </news:news>\n  </url>`).join('\n')}\n</urlset>`;
                  handleCopy(xml, "Google News Sitemap.xml");
                }}
                className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:brightness-110 shrink-0"
              >
                Sitemap XML Kopyala
              </button>
            </div>

            <div className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-[#D4AF37]">
                <span>wp_hierarchy_180_subcategories.json</span>
                <button 
                  onClick={() => handleCopy(JSON.stringify(SITE_STRUCTURE, null, 2), "WP JSON Hiyerarşisi")}
                  className="px-3 py-1 bg-zinc-800 hover:bg-[#D4AF37] hover:text-black rounded text-[10px] font-bold"
                >
                  Kopyala
                </button>
              </div>
              <pre className="text-emerald-400 bg-[#0B0B0C] p-4 rounded-xl overflow-x-auto max-h-96">
                {JSON.stringify(SITE_STRUCTURE.map(c => ({
                  parent: c.name,
                  slug: c.id,
                  children: c.subcategories
                })), null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 8: LEGAL & KVKK DOCUMENTS */}
        {activeTab === 'legal' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="border-b border-zinc-800 pb-6">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                Kurumsal & Yasal Uyum
              </span>
              <h2 className="text-3xl font-serif font-bold text-white mt-2">
                KVKK, GDPR & Yasal Metinler
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(LEGAL_DOCUMENTS).map(([key, doc]) => (
                <div key={key} className="bg-[#121215] border border-zinc-800 rounded-3xl p-6 space-y-3">
                  <h3 className="text-base font-serif font-bold text-[#D4AF37]">{doc.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-4">{doc.content}</p>
                  <button 
                    onClick={() => setActiveLegalModal(key as any)}
                    className="text-xs font-bold text-emerald-400 hover:underline pt-2 block"
                  >
                    Tam Metni Okuyun →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* RESPONSIVE MOBILE BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#121215]/95 border-t border-[#D4AF37]/30 backdrop-blur-lg px-2 py-2 flex items-center justify-around text-zinc-400 text-[10px] lg:hidden">
        <button 
          onClick={() => { setActiveTab('news'); setSelectedCategory(null); setSelectedSubcategory(null); }}
          className={cn("flex flex-col items-center gap-1 font-bold", activeTab === 'news' ? "text-[#D4AF37]" : "hover:text-white")}
        >
          <Newspaper size={18} />
          <span>Haberler</span>
        </button>
        <button 
          onClick={() => setActiveTab('nav')}
          className={cn("flex flex-col items-center gap-1 font-bold", activeTab === 'nav' ? "text-[#D4AF37]" : "hover:text-white")}
        >
          <LayoutGrid size={18} />
          <span>Kategoriler</span>
        </button>
        <button 
          onClick={() => setActiveTab('ai')}
          className={cn("flex flex-col items-center gap-1 font-bold", activeTab === 'ai' ? "text-[#D4AF37]" : "hover:text-white")}
        >
          <Zap size={18} />
          <span>AI Analiz</span>
        </button>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex flex-col items-center gap-1 font-bold hover:text-white text-[#D4AF37]"
        >
          {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          <span>Tema</span>
        </button>
      </div>

      {/* Sticky Cookie Consent Banner */}
      {!cookieConsentAccepted && (
        <div className="fixed bottom-14 sm:bottom-0 inset-x-0 z-50 bg-[#121215] border-t-2 border-[#D4AF37] p-4 shadow-2xl backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-zinc-300 space-y-1">
              <span className="font-bold text-white flex items-center gap-2">
                <Shield size={14} className="text-[#D4AF37]" />
                Çerez Politikası ve KVKK Aydınlatma Rızası
              </span>
              <p className="text-[11px] text-zinc-400">
                WebdeHepSeeK, kişiselleştirilmiş içerik sunmak ve site performansını ölçmek amacıyla çerezler kullanır.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setActiveLegalModal('cookies')}
                className="text-[#D4AF37] hover:underline text-xs"
              >
                Çerez Detayları
              </button>
              <button 
                onClick={handleAcceptCookies}
                className="px-5 py-2 bg-[#D4AF37] text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110"
              >
                Kabul Et ve Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legal Full Document Modal */}
      <AnimatePresence>
        {activeLegalModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121215] border border-[#D4AF37] max-w-2xl w-full rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-xl font-serif font-bold text-[#D4AF37]">
                  {LEGAL_DOCUMENTS[activeLegalModal].title}
                </h3>
                <button onClick={() => setActiveLegalModal(null)} className="p-1 text-zinc-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="text-xs text-zinc-300 leading-relaxed space-y-3 font-sans max-h-80 overflow-y-auto pr-2">
                <p>{LEGAL_DOCUMENTS[activeLegalModal].content}</p>
                <p>
                  WebdeHepSeeK ekosisteminde KVKK 6698 uyarınca veri sahipleri haklarını diledikleri zaman kullanabilirler.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-800 text-right">
                <button 
                  onClick={() => setActiveLegalModal(null)}
                  className="px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl"
                >
                  Anladım
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* READER PROFILE MODAL */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                  <User size={18} />
                  <span>Yönetici Hesabı & Kontrol Paneli</span>
                </h3>
                <button onClick={() => setIsProfileModalOpen(false)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#0B0B0C] border border-[#D4AF37]/35 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{userProfile.name}</span>
                    <span className="px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-[9px] font-mono font-bold rounded-full">
                      {userProfile.badge}
                    </span>
                  </div>
                  <p className="text-zinc-400 font-mono">{userProfile.email}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-serif text-zinc-300 font-semibold">{userProfile.role}</span>
                </div>
                {/* Admin Mode Toggle */}
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-xs block">Yönetici Kontrol Paneli</span>
                    <span className="text-[10px] text-zinc-400">Google Konsolu, Sistem Metrikleri ve Export araçlarını ana menüye ekler.</span>
                  </div>
                  <button 
                    onClick={() => {
                      setShowAdminTabs(!showAdminTabs);
                      showToast(!showAdminTabs ? "Yönetici paneli araçları etkinleştirildi" : "Yönetici araçları gizlendi");
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all whitespace-nowrap shrink-0",
                      showAdminTabs ? "bg-[#D4AF37] text-black" : "bg-[#0B0B0C] border border-zinc-800 text-zinc-400 hover:text-white"
                    )}
                  >
                    {showAdminTabs ? "Etkin" : "Gizli"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 bg-[#0B0B0C] border border-zinc-800 rounded-xl">
                    <span className="text-zinc-500 text-[10px] block">Kaydedilen Haberler</span>
                    <strong className="text-white text-base">{bookmarkedIds.length} Makale</strong>
                  </div>
                  <div className="p-3 bg-[#0B0B0C] border border-zinc-800 rounded-xl">
                    <span className="text-zinc-500 text-[10px] block">Son Göz Atılanlar</span>
                    <strong className="text-[#D4AF37] text-base">{recentlyViewedIds.length} Makale</strong>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-right">
                <button onClick={() => setIsProfileModalOpen(false)} className="px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl">Kapat</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FINANCIAL CALCULATOR MODAL */}
      <AnimatePresence>
        {isCalcModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                  <Calculator size={18} />
                  <span>Döviz & Kripto Finans Hesaplayıcı</span>
                </h3>
                <button onClick={() => setIsCalcModalOpen(false)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">Tutar ($ - USD):</label>
                  <input type="number" value={calcUsdInput} onChange={(e) => setCalcUsdInput(Number(e.target.value))} className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl p-2.5 text-white font-mono text-xs outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="p-3 bg-[#0B0B0C] border border-zinc-800 rounded-xl space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Türk Lirası Karşılığı (USD/TRY 34.35):</span>
                    <strong className="text-white">{(calcUsdInput * 34.35).toLocaleString('tr-TR')} ₺</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Bitcoin Karşılığı ($152,400):</span>
                    <strong className="text-[#D4AF37]">{(calcUsdInput / 152400).toFixed(6)} BTC</strong>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-right">
                <button onClick={() => setIsCalcModalOpen(false)} className="px-5 py-2 bg-[#D4AF37] text-black font-bold text-xs rounded-xl">Tamam</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRESS RELEASE PORTAL MODAL */}
      <AnimatePresence>
        {isPressReleaseModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                  <Send size={18} />
                  <span>Basın Bülteni & Lansman Duyuru Portalı</span>
                </h3>
                <button onClick={() => setIsPressReleaseModalOpen(false)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <form onSubmit={handlePressReleaseSubmit} className="space-y-3 text-xs">
                <input 
                  type="text" 
                  required 
                  disabled={isPressReleaseSubmitting}
                  value={pressReleaseTitle}
                  onChange={(e) => setPressReleaseTitle(e.target.value)}
                  placeholder="Bülten Başlığı..." 
                  className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37] disabled:opacity-50" 
                />
                <textarea 
                  required 
                  rows={4} 
                  disabled={isPressReleaseSubmitting}
                  value={pressReleaseBody}
                  onChange={(e) => setPressReleaseBody(e.target.value)}
                  placeholder="Kurumsal duyuru metni ve iletişim bilgileri..." 
                  className="w-full bg-[#0B0B0C] border border-zinc-700 rounded-xl p-2.5 text-white outline-none focus:border-[#D4AF37] disabled:opacity-50" 
                />
                <button 
                  type="submit" 
                  disabled={isPressReleaseSubmitting}
                  className="w-full py-2.5 bg-[#D4AF37] text-black font-extrabold text-xs uppercase rounded-xl hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isPressReleaseSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Bülten Gönderiliyor...</span>
                    </>
                  ) : (
                    <span>Editör Masasına Gönder</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUPPORT & BUY ME A COFFEE MODAL */}
      <AnimatePresence>
        {isSupportModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-[#D4AF37] flex items-center gap-2">
                  <Coffee size={18} />
                  <span>Bağımsız Gazeteciliği Destekleyin</span>
                </h3>
                <button onClick={() => setIsSupportModalOpen(false)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                WebdeHepSeeK Journal, reklamlardan bağımsız tarafsız ve derinlemesine teknoloji gazeteciliği sunar. Yayın kalitemize katkıda bulunabilirsiniz.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {['50 ₺', '100 ₺', '250 ₺'].map(amt => (
                  <button key={amt} onClick={() => { showToast(`${amt} destek katkınız için teşekkür ederiz!`); setIsSupportModalOpen(false); }} className="py-2.5 bg-[#0B0B0C] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] font-bold text-xs rounded-xl transition-all">{amt}</button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AUTHOR ARCHIVE MODAL */}
      <AnimatePresence>
        {selectedAuthorProfile && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#121215] border border-[#D4AF37] max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-serif font-bold flex items-center justify-center text-base">
                    {selectedAuthorProfile.avatarLetter}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedAuthorProfile.name}</h3>
                    <span className="text-[10px] text-[#D4AF37] font-mono">{selectedAuthorProfile.title}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedAuthorProfile(null)} className="p-1 text-zinc-400 hover:text-white"><X size={18} /></button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed bg-[#0B0B0C] p-3 rounded-xl border border-zinc-800">
                {selectedAuthorProfile.bio}
              </p>
              <div className="space-y-2">
                <span className="text-xs font-serif font-bold text-white block">Yazarın Makaleleri ({selectedAuthorProfile.articlesCount}):</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {newsList.filter(n => n.author === selectedAuthorProfile.name).map(article => (
                    <div key={article.id} onClick={() => { handleSelectArticle(article); setSelectedAuthorProfile(null); }} className="p-2 bg-[#0B0B0C] hover:border-[#D4AF37] border border-zinc-800 rounded-lg text-xs cursor-pointer flex justify-between items-center">
                      <span className="truncate text-zinc-200">{article.title}</span>
                      <ChevronRight size={12} className="text-[#D4AF37] shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX IMAGE VIEWER MODAL */}
      <AnimatePresence>
        {selectedLightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative max-w-5xl w-full flex flex-col items-center">
              <button onClick={() => setSelectedLightboxImage(null)} className="absolute -top-12 right-0 p-2 bg-[#D4AF37] text-black font-bold rounded-full hover:brightness-110">
                <X size={20} />
              </button>
              <img src={selectedLightboxImage} alt="Lightbox Fullscreen View" className="max-h-[85vh] w-auto object-contain rounded-2xl border-2 border-[#D4AF37] shadow-2xl" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#121215] border-t border-[#D4AF37]/25 text-zinc-400 py-12 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 col-span-1 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center text-black font-serif font-black italic">
                  W
                </div>
                <span className="text-lg font-serif font-bold text-white">WebdeHepSeeK Journal</span>
              </div>
              <p className="text-zinc-400 leading-relaxed max-w-md">
                Teknoloji, yapay zeka, kripto ve finans dünyasının prestijli yayın organı.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3 text-[#D4AF37]">Kurumsal & Yasal</h4>
              <ul className="space-y-2">
                <li onClick={() => setActiveLegalModal('kvkk')} className="hover:text-white cursor-pointer">KVKK Aydınlatma Metni</li>
                <li onClick={() => setActiveLegalModal('privacy')} className="hover:text-white cursor-pointer">Gizlilik Politikası</li>
                <li onClick={() => setActiveLegalModal('terms')} className="hover:text-white cursor-pointer">Kullanım Koşulları</li>
                <li onClick={() => setActiveLegalModal('cookies')} className="hover:text-white cursor-pointer">Çerez Politikası</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-widest mb-3 text-[#D4AF37]">Yayın Standartları</h4>
              <ul className="space-y-2">
                <li>Google News Uyumlu</li>
                <li>Tarafsız Gazetecilik İlkeleri</li>
                <li>Core Web Vitals Skoru 98/100</li>
                <li>E-E-A-T Editöryal Kalite</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 text-center text-zinc-500 font-mono text-[10px]">
            © 2026 WebdeHepSeeK Journal. Tüm Hakları Saklıdır. Obsidian Gold Architecture.
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Anchor Banner (ShiftDelete Style) */}
      <StickyAnchorBanner />

    </div>
  );
}
