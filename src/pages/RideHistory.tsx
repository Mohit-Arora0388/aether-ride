import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { NeonButton } from '@/components/NeonButton';
import { useStore } from '@/store/useStore';
import { X, DollarSign } from 'lucide-react';

const RideHistory = () => {
  const { rideHistory, cancelRide } = useStore();
  const [tipModal, setTipModal] = useState<string | null>(null);
  const [tipAmount, setTipAmount] = useState(5);

  return (
    <div className="min-h-screen pt-16 pb-24 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-xl font-bold pt-2">
          Ride History
        </motion.h1>

        {rideHistory.length === 0 ? (
          <GlassCard className="text-center py-12">
            <p className="text-muted-foreground">No rides yet</p>
          </GlassCard>
        ) : (
          rideHistory.map((ride, i) => (
            <GlassCard key={ride.id} delay={i * 0.05}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm">{ride.from} → {ride.to}</p>
                  <p className="text-xs text-muted-foreground">{ride.date} · Driver: {ride.driver}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  ride.status === 'completed' ? 'status-completed' :
                  ride.status === 'active' ? 'status-active' : 'status-cancelled'
                }`}>{ride.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-display font-bold">${ride.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  {ride.status === 'active' && (
                    <NeonButton variant="danger" size="sm" onClick={() => cancelRide(ride.id)}>
                      <X className="w-3 h-3" /> Cancel
                    </NeonButton>
                  )}
                  {ride.status === 'completed' && (
                    <NeonButton variant="secondary" size="sm" onClick={() => setTipModal(ride.id)}>
                      <DollarSign className="w-3 h-3" /> Tip
                    </NeonButton>
                  )}
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>

      {/* Tip modal */}
      {tipModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
          onClick={() => setTipModal(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong rounded-2xl p-6 w-full max-w-xs"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-lg mb-4 text-center">Tip Your Driver</h3>
            <div className="flex gap-2 mb-4 justify-center">
              {[3, 5, 10].map(amt => (
                <NeonButton
                  key={amt}
                  variant={tipAmount === amt ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setTipAmount(amt)}
                >
                  ${amt}
                </NeonButton>
              ))}
            </div>
            <div className="flex gap-2">
              <NeonButton variant="ghost" onClick={() => setTipModal(null)} className="flex-1">Skip</NeonButton>
              <NeonButton onClick={() => setTipModal(null)} className="flex-1">Send ${tipAmount}</NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RideHistory;
