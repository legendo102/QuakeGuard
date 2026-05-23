
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Info, AlertTriangle, ShieldAlert, Package, Home, Users, Camera } from 'lucide-react';

interface NotificationContent {
  id: number;
  question: string;
  info: string;
  icon: React.ElementType;
  color: string;
}

const NOTIFICATIONS: NotificationContent[] = [
  {
    id: 1,
    question: "Ağır mobilyalarınızı (dolap, kitaplık vb.) duvara sabitlediniz mi?",
    info: "Deprem anındaki yaralanmaların %50'den fazlası devrilen eşyalardan kaynaklanır. Sabitleme işlemi, yaşam alanınızı birer tuzağa dönüşmekten kurtarır.",
    icon: Home,
    color: "bg-red-500"
  },
  {
    id: 2,
    question: "Deprem çantanız yatağınızın hemen yanında hazır mı?",
    info: "Afet sonrası ilk 72 saat (Altın Saatler) çok kritiktir. Çantanızın yanınızda olması, su, gıda ve ilk yardım malzemelerine anında ulaşmanızı sağlar.",
    icon: Package,
    color: "bg-orange-500"
  },
  {
    id: 3,
    question: "Evinizdeki en güvenli 'Yaşam Üçgeni' alanlarını belirlediniz mi?",
    info: "Yıkılma durumunda tavanın ağırlığı sağlam eşyaların yanına düştüğünde oluşan boşluklar hayatta kalma şansını %80 artırır. Bu noktaları önceden seçmek panik anında hayat kurtarır.",
    icon: ShieldAlert,
    color: "bg-blue-500"
  },
  {
    id: 4,
    question: "Yatağınızı pencerelerden ve camlı dolaplardan uzağa çektiniz mi?",
    info: "Sarsıntı sırasında kırılan camlar ciddi kesiklere ve körlüğe yol açabilir. Uyku alanı camlardan en az 1.5 metre uzakta veya camlar filmle korunmuş olmalıdır.",
    icon: AlertTriangle,
    color: "bg-yellow-500"
  },
  {
    id: 5,
    question: "Ailenizle deprem sonrası dışarıda buluşma noktası belirlediniz mi?",
    info: "Deprem anında iletişim hatları kesilebilir. Önceden belirlenmiş bir buluşma noktası, aile üyelerinin birbirini kaybetmesini ve kaos yaşanmasını engeller.",
    icon: Users,
    color: "bg-purple-500"
  }
];

const SafetyNotifications: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // İlk bildirim 30 saniye sonra, sonrakiler her 60 saniyede bir
    const initialTimeout = setTimeout(() => setIsVisible(true), 30000);
    
    const interval = setInterval(() => {
      if (!isVisible) {
        setCurrentIndex(prev => (prev + 1) % NOTIFICATIONS.length);
        setIsVisible(true);
        setShowInfo(false);
      }
    }, 60000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isVisible]);

  const handleYes = () => {
    setIsVisible(false);
  };

  const handleNo = () => {
    setShowInfo(true);
  };

  const current = NOTIFICATIONS[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-[100] w-full max-w-sm"
        >
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className={`p-4 ${current.color} flex items-center justify-between`}>
              <div className="flex items-center gap-2 text-white">
                <current.icon size={18} className="animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Güvenlik Kontrolü</span>
              </div>
              <button onClick={() => setIsVisible(false)} className="text-white/60 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <AnimatePresence mode="wait">
                {!showInfo ? (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <p className="text-slate-100 font-bold text-lg leading-tight">
                      {current.question}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleYes}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                      >
                        <Check size={16} /> EVET
                      </button>
                      <button
                        onClick={handleNo}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                      >
                        <Info size={16} /> HAYIR
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start gap-3 bg-red-600/10 p-3 rounded-2xl border border-red-500/20">
                      <Info className="text-red-500 shrink-0 mt-0.5" size={16} />
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {current.info}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsVisible(false)}
                      className="w-full bg-slate-100 text-slate-950 py-3 rounded-xl font-bold text-sm transition-all hover:bg-white"
                    >
                      ANLADIM, ÖNLEM ALACAĞIM
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-slate-800 w-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 60, ease: "linear" }}
                className={`h-full ${current.color}`}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SafetyNotifications;
