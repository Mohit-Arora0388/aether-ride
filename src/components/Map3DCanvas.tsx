import { motion } from 'framer-motion';

interface Map3DCanvasProps {
  className?: string;
  viewMode: 'sky' | 'rooftop' | 'street';
  isNight: boolean;
}

export const Map3DCanvas = ({ className = '', viewMode, isNight }: Map3DCanvasProps) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div
        className="w-full aspect-[4/3] flex items-center justify-center transition-all duration-700"
        style={{
          background: isNight
            ? 'linear-gradient(180deg, hsl(222 47% 4%) 0%, hsl(222 40% 10%) 100%)'
            : 'linear-gradient(180deg, hsl(210 50% 20%) 0%, hsl(222 40% 14%) 100%)',
        }}
      >
        {/* Grid overlay for futuristic map feel */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(185 100% 47% / 0.2) 1px, transparent 1px),
              linear-gradient(90deg, hsl(185 100% 47% / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        <motion.div
          key={viewMode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <div className="text-xs font-display text-muted-foreground tracking-widest mb-2 uppercase">{viewMode} view</div>
          <div className="text-xs text-muted-foreground/60">WebGL Map Ready</div>
        </motion.div>

        {/* Simulated car dot */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-primary neon-glow"
          animate={{
            x: [0, 20, -10, 15, 0],
            y: [0, -15, 10, -5, 0],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          style={{ top: '50%', left: '50%' }}
        />
      </div>
    </div>
  );
};
