import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car3DCanvas } from '@/components/Car3DCanvas';
import { NeonButton } from '@/components/NeonButton';
import { ParticleBackground } from '@/components/ParticleBackground';
import { useStore } from '@/store/useStore';
import { Zap, UserPlus, LogIn } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { soundEnabled, startEngine, engineStarted } = useStore();

  const handleStartEngine = () => {
    startEngine();
    // Vibration
    if (navigator.vibrate) navigator.vibrate(200);
    // Sound
    if (soundEnabled) {
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.value = 80;
        gain.gain.value = 0.1;
        osc.start();
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        osc.stop(ctx.currentTime + 1.5);
      } catch { /* audio not available */ }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <ParticleBackground />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-primary neon-text">NEON</span>
            <span className="text-foreground">RIDE</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm tracking-widest uppercase">The Future of Transit</p>
        </motion.div>

        {/* 3D Car */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mb-8"
        >
          <Car3DCanvas />
        </motion.div>

        {/* Start Engine */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <NeonButton
            size="lg"
            onClick={handleStartEngine}
            className={engineStarted ? 'animate-pulse-neon' : ''}
          >
            <Zap className="w-5 h-5" />
            {engineStarted ? 'Engine Running' : 'Start Engine'}
          </NeonButton>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
        >
          <NeonButton variant="secondary" size="lg" className="flex-1" onClick={() => navigate('/login')}>
            <LogIn className="w-4 h-4" /> Sign In
          </NeonButton>
          <NeonButton variant="secondary" size="lg" className="flex-1" onClick={() => navigate('/signup')}>
            <UserPlus className="w-4 h-4" /> Sign Up
          </NeonButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <NeonButton variant="ghost" onClick={() => navigate('/login')}>
            Book a Ride →
          </NeonButton>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
