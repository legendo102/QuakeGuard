
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2, ShieldCheck, AlertCircle, RefreshCw, Search, FileSearch, Database, Activity } from 'lucide-react';
import { UserProfile, AIAnalysisResult } from '../types';
import { analyzeRisk } from '../services/geminiService';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import RestrictedAccess from '../components/RestrictedAccess';

interface AIAnalyzeProps {
  profile: UserProfile;
  onStartRegistration?: () => void;
}

const AIAnalyze: React.FC<AIAnalyzeProps> = ({ profile, onStartRegistration }) => {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<AIAnalysisResult | null>(null);
  const [loadingStep, setLoadingStep] = React.useState(0);

  const steps = [
    "Konum verileri sismik haritalarla eşleştiriliyor...",
    "Bina yapı malzemesi ve yaş analizi yapılıyor...",
    "Bölgesel fay hatları derinliği taranıyor...",
    "Gemini AI risk raporu oluşturuyor...",
  ];

  const runAnalysis = async () => {
    if (!profile.isRegistered) return;
    setLoading(true);
    
    // Yükleme metinlerini döndür
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % steps.length);
    }, 2000);

    const data = await analyzeRisk(profile);
    
    clearInterval(stepInterval);
    setResult(data);
    setLoading(false);
  };

  React.useEffect(() => {
    if (profile.isRegistered) {
      runAnalysis();
    }
  }, [profile.isRegistered]);

  if (!profile.isRegistered) {
    return <RestrictedAccess onAction={onStartRegistration || (() => {})} />;
  }

  const chartData = result ? [
    { name: 'Risk', value: result.riskPercent },
    { name: 'Safe', value: 100 - result.riskPercent }
  ] : [];

  const COLORS = ['#ef4444', '#1e293b'];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-flex p-4 bg-red-600/10 rounded-3xl border border-red-500/20 mb-6"
        >
          <BrainCircuit className="w-10 h-10 text-red-500" />
        </motion.div>
        <h2 className="text-4xl font-bold title-font mb-4">AI Risk Analizi</h2>
        <p className="text-slate-400 max-w-xl mx-auto">Gemini 3 Yapay Zekası profil bilgilerinizi kullanarak konum ve yapı temelli bir risk değerlendirmesi yapar.</p>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 sm:py-20 px-6 space-y-12 bg-slate-900 border border-slate-800 rounded-[40px] shadow-2xl relative overflow-hidden"
          >
            {/* Süslü Yükleme Animasyonu */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                className="w-48 h-48 border-4 border-dashed border-red-500/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="absolute inset-4 border-4 border-dotted border-blue-500/20 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-red-600 p-6 rounded-3xl shadow-2xl shadow-red-900/40 relative z-10"
                >
                  {loadingStep === 0 ? <Database className="w-12 h-12 text-white" /> :
                   loadingStep === 1 ? <FileSearch className="w-12 h-12 text-white" /> :
                   loadingStep === 2 ? <Activity className="w-12 h-12 text-white" /> :
                   <BrainCircuit className="w-12 h-12 text-white" />}
                </motion.div>
                
                {/* Yüzen Büyüteç Efekti */}
                <motion.div
                  animate={{ 
                    x: [-60, 60, -60],
                    y: [-40, 40, -40]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute"
                >
                  <Search className="w-8 h-8 text-blue-500/50" />
                </motion.div>
              </div>
            </div>

            <div className="space-y-4 text-center px-4">
              <motion.p 
                key={loadingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl font-bold text-white h-8"
              >
                {steps[loadingStep]}
              </motion.p>
              <p className="text-slate-500 max-w-sm mx-auto">Gemini Engine verileri saniyeler içinde işleyip size özel raporu hazırlıyor.</p>
              <div className="flex justify-center gap-1">
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    animate={{ scale: loadingStep === i ? 1.5 : 1, backgroundColor: loadingStep === i ? '#ef4444' : '#334155' }}
                    className="w-2 h-2 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : result ? (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-[40px] p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 to-orange-600" />
              <h3 className="text-xl font-bold mb-8">Tahmini Risk Skoru</h3>
              <div className="w-full h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={180}
                      endAngle={0}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pt-8">
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-5xl font-black text-red-500"
                  >
                    %{result.riskPercent}
                  </motion.span>
                </div>
              </div>
              <p className="text-center text-sm text-slate-400 mt-4 leading-relaxed font-medium">
                {result.riskPercent > 70 ? '⚠️ Yüksek öncelikli hazırlık yapmanız önerilir.' : 
                 result.riskPercent > 40 ? '🔍 Orta seviye riskli bölgedesiniz.' : 
                 '✅ Düşük seviye riskli bölgedesiniz.'}
              </p>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <motion.div 
                whileHover={{ x: 5 }}
                className="bg-slate-900 border border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-green-500" /> AI Değerlendirme Özeti
                </h3>
                <p className="text-slate-300 leading-relaxed italic border-l-4 border-red-500 pl-6 py-2">
                  "{result.summary}"
                </p>
              </motion.div>

              <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-500" /> Kişiselleştirilmiş Öneriler
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.recommendations.map((rec, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 p-5 bg-slate-800/30 rounded-2xl border border-slate-700/30 hover:border-red-500/30 transition-colors"
                    >
                      <div className="shrink-0 w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 font-black text-sm">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-300 font-medium leading-snug">{rec}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={runAnalysis}
                className="w-full flex items-center justify-center gap-3 py-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-slate-100 font-bold transition-all shadow-xl"
              >
                <RefreshCw className="w-5 h-5" /> Analizi Yenile
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-slate-900/20 rounded-[40px] border-2 border-dashed border-slate-800">
            <button 
              onClick={runAnalysis} 
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-red-900/30 transition-all hover:scale-105 active:scale-95"
            >
              ANALİZİ BAŞLAT
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAnalyze;
