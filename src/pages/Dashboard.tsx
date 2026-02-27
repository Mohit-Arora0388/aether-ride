import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { NeonButton } from '@/components/NeonButton';
import { useStore } from '@/store/useStore';
import { MapPin, Wallet, Clock, Gift, Navigation } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, walletBalance, currentRide, rideHistory, bookRide } = useStore();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showBooking, setShowBooking] = useState(false);

  const handleBook = () => {
    if (!from || !to) return;
    bookRide(from, to);
    setShowBooking(false);
    setFrom('');
    setTo('');
  };

  return (
    <div className="min-h-screen pt-16 pb-24 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2">
          <h1 className="font-display text-2xl font-bold">
            Hello, <span className="text-primary">{user?.name?.split(' ')[0] || 'Rider'}</span>
          </h1>
          <p className="text-muted-foreground text-sm">Where are we going today?</p>
        </motion.div>

        {/* Current Ride */}
        {currentRide && currentRide.status === 'active' && (
          <GlassCard className="neon-border" delay={0.1}>
            <div className="flex items-center gap-2 mb-3">
              <Navigation className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Active Ride</span>
            </div>
            <div className="text-sm space-y-1">
              <p className="text-foreground">{currentRide.from} → {currentRide.to}</p>
              <p className="text-muted-foreground">Driver: {currentRide.driver} · ${currentRide.price.toFixed(2)}</p>
            </div>
          </GlassCard>
        )}

        {/* Wallet */}
        <GlassCard delay={0.15}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Wallet Balance</p>
                <p className="text-xl font-display font-bold">${walletBalance.toFixed(2)}</p>
              </div>
            </div>
            <NeonButton variant="secondary" size="sm" onClick={() => navigate('/wallet')}>
              Top Up
            </NeonButton>
          </div>
        </GlassCard>

        {/* Book Ride */}
        <NeonButton size="lg" className="w-full" onClick={() => setShowBooking(true)}>
          <MapPin className="w-5 h-5" /> Book a Ride
        </NeonButton>

        {/* Ride History Preview */}
        <GlassCard delay={0.2}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Recent Rides</span>
            </div>
            <button onClick={() => navigate('/history')} className="text-xs text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {rideHistory.slice(0, 2).map(ride => (
              <div key={ride.id} className="flex items-center justify-between text-sm py-2 border-b border-border/30 last:border-0">
                <div>
                  <p className="text-foreground">{ride.from} → {ride.to}</p>
                  <p className="text-xs text-muted-foreground">{ride.date}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  ride.status === 'completed' ? 'status-completed' :
                  ride.status === 'active' ? 'status-active' : 'status-cancelled'
                }`}>{ride.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Referral */}
        <GlassCard delay={0.25}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Gift className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold">Invite Friends</p>
                <p className="text-xs text-muted-foreground">Earn $10 per referral</p>
              </div>
            </div>
            <NeonButton variant="ghost" size="sm" onClick={() => navigate('/referral')}>Invite</NeonButton>
          </div>
        </GlassCard>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 backdrop-blur-sm px-4 pb-4"
          onClick={() => setShowBooking(false)}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-strong rounded-2xl p-6 w-full max-w-sm"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-lg mb-4">Book a Ride</h3>
            <div className="space-y-3 mb-4">
              <div className="relative">
                <div className="absolute left-3 top-3 w-2 h-2 rounded-full bg-success" />
                <input
                  placeholder="Pickup location" value={from} onChange={e => setFrom(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-3 w-2 h-2 rounded-full bg-destructive" />
                <input
                  placeholder="Destination" value={to} onChange={e => setTo(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <NeonButton variant="ghost" onClick={() => setShowBooking(false)} className="flex-1">Cancel</NeonButton>
              <NeonButton onClick={handleBook} className="flex-1" disabled={!from || !to}>Confirm</NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
