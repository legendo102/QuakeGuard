
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const TransitionCurtain: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[500] bg-slate-950 flex flex-col items-center justify-center pointer-events-auto"
    >
      {/* Düzeltilmiş Radyal Gradyan */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_70%)] opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "backOut" }}
          className="bg-red-600 p-6 rounded-[32px] shadow-[0_0_50px_rgba(220,38,38,0.4)]"
        >
          <Shield className="w-16 h-16 text-white" />
        </motion.div>

        <div className="text-center space-y-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white text-6xl font-black title-font italic tracking-tighter"
          >
            QUAKEGUARD
          </motion.h2>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-1"
          >
            <p className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs">Afet Öncesi Bilinç</p>
            <p className="text-slate-400 font-medium text-lg italic">"Depreme Karşı En Güçlü Kalkanınız: Bilgi ve Hazırlık"</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransitionCurtain;
