
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, UserPlus, ArrowRight } from 'lucide-react';

interface RestrictedAccessProps {
  onAction: () => void;
}

const RestrictedAccess: React.FC<RestrictedAccessProps> = ({ onAction }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[40px] p-12 text-center relative overflow-hidden shadow-2xl"
      >
        {/* Üstteki Dekoratif Çizgi */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-orange-600 to-red-600" />
        
        <div className="relative z-10 space-y-8">
          {/* İkon */}
          <div className="bg-red-600/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto border border-red-500/20 shadow-2xl shadow-red-900/20">
            <Lock className="w-12 h-12 text-red-500" />
          </div>
          
          {/* Metin İçeriği */}
          <div className="space-y-4">
            <h2 className="text-4xl font-black title-font text-white">Erişim Kısıtlandı</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Bu özelliği tam performansla kullanabilmek ve size özel verilere erişmek için kaydolmanız gerekmektedir. Misafir girişi yaptığınız için bu sayfa şu an kilitlidir.
            </p>
          </div>

          {/* Aksiyon Butonu */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={onAction}
              className="group w-full sm:w-auto px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-900/40 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              HEMEN KAYDOL <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-slate-500 italic pt-4">
            * Kayıt işlemi sadece birkaç saniyenizi alır ve tüm özellikleri ücretsiz aktif eder.
          </p>
        </div>
        
        {/* Arka Plan Dekoratif Blur Efektleri */}
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full" />
      </motion.div>
    </div>
  );
};

export default RestrictedAccess;
