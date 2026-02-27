import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

interface Car3DCanvasProps {
  className?: string;
}

export const Car3DCanvas = ({ className = '' }: Car3DCanvasProps) => {
  const { carConfig, engineStarted } = useStore();

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Three.js integration point - replace this placeholder with <Canvas> from @react-three/fiber */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-b from-secondary/50 to-background flex items-center justify-center">
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, ${carConfig.color}33 0%, transparent 60%)`,
          }}
          animate={engineStarted ? { opacity: [0.2, 0.5, 0.2] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* Car silhouette placeholder */}
        <motion.div
          className="relative z-10"
          animate={engineStarted ? { y: [0, -4, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-48 h-20 rounded-xl border-2 flex items-center justify-center"
            style={{ borderColor: carConfig.color, boxShadow: `0 0 30px ${carConfig.color}44` }}
          >
            <span className="text-xs font-display font-semibold text-muted-foreground tracking-widest">3D MODEL</span>
          </div>
          {/* Headlights */}
          <motion.div
            className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-4 rounded-full"
            style={{ backgroundColor: carConfig.color }}
            animate={engineStarted ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.3 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <motion.div
            className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-4 rounded-full"
            style={{ backgroundColor: carConfig.color }}
            animate={engineStarted ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.3 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>

        {/* Ground reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
};
