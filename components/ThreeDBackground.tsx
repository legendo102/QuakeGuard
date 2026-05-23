
import React from 'react';
import { motion } from 'framer-motion';

const ThreeDBackground: React.FC = () => {
  const shapes = React.useMemo(() => [...Array(10)].map((_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -20,
    isCube: i % 2 === 0,
    rotateX: Math.random() * 360,
    rotateY: Math.random() * 360,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950">
      {/* Derinlik için sis efekti */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 via-transparent to-blue-600/5" />
      
      <div className="absolute inset-0" style={{ perspective: '1200px' }}>
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            initial={{ 
              x: `${shape.x}vw`, 
              y: `${shape.y}vh`, 
              z: -500,
              rotateX: shape.rotateX,
              rotateY: shape.rotateY 
            }}
            animate={{ 
              y: [`${shape.y}vh`, `${shape.y - 20}vh`, `${shape.y}vh`],
              z: [-500, 0, -500],
              rotateX: [shape.rotateX, shape.rotateX + 360],
              rotateY: [shape.rotateY, shape.rotateY + 360]
            }}
            transition={{ 
              duration: shape.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: shape.delay 
            }}
            className="absolute"
            style={{ willChange: 'transform' }}
          >
            {shape.isCube ? (
              // 3D Küp (CSS)
              <div className="relative w-16 h-16 transform-style-3d">
                <div className="absolute inset-0 bg-red-600/10 border border-red-500/20 backdrop-blur-[2px]" style={{ transform: 'translateZ(32px)' }} />
                <div className="absolute inset-0 bg-red-600/5 border border-red-500/20 shadow-inner" style={{ transform: 'rotateY(90deg) translateZ(32px)' }} />
                <div className="absolute inset-0 bg-red-600/5 border border-red-500/20" style={{ transform: 'rotateX(90deg) translateZ(32px)' }} />
              </div>
            ) : (
              // 3D Küre (Görsel Efekt)
              <div 
                className="rounded-full bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-400/10 shadow-[inset_-10px_-10px_20px_rgba(59,130,246,0.1)]"
                style={{ width: shape.size, height: shape.size }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDBackground;
