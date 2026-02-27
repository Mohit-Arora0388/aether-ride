import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { NeonButton } from './NeonButton';
import { AlertTriangle, ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';

export const TelemetryControls = () => {
  const { soundEnabled } = useStore();

  const playHorn = () => {
    if (soundEnabled) {
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 300;
        gain.gain.value = 0.15;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.stop(ctx.currentTime + 0.5);
      } catch { /* audio not supported */ }
    }
  };

  const controls = [
    { label: 'Brake', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-destructive' },
    { label: 'Left', icon: <ArrowLeft className="w-4 h-4" />, color: 'text-warning' },
    { label: 'Horn', icon: <Volume2 className="w-4 h-4" />, color: 'text-primary', action: playHorn },
    { label: 'Right', icon: <ArrowRight className="w-4 h-4" />, color: 'text-warning' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {controls.map((ctrl) => (
        <motion.button
          key={ctrl.label}
          whileTap={{ scale: 0.9 }}
          onClick={ctrl.action}
          className={`glass rounded-xl p-3 flex flex-col items-center gap-1 ${ctrl.color}`}
        >
          {ctrl.icon}
          <span className="text-[10px] font-medium">{ctrl.label}</span>
        </motion.button>
      ))}
    </div>
  );
};
