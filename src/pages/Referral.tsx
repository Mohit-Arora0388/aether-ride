import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { NeonButton } from '@/components/NeonButton';
import { useStore } from '@/store/useStore';
import { Copy, Share2, Gift, Check, Users } from 'lucide-react';

const Referral = () => {
  const { referralCode, referralCount } = useStore();
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = referralCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setShowConfetti(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'NeonRide', text: `Join NeonRide with my code: ${referralCode}`, url: window.location.origin });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-24 px-4 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['hsl(185,100%,47%)', 'hsl(270,100%,65%)', 'hsl(38,92%,50%)', 'hsl(160,84%,39%)'][i % 4],
              }}
              initial={{ top: '-5%', opacity: 1, rotate: 0 }}
              animate={{ top: '105%', opacity: 0, rotate: Math.random() * 720 }}
              transition={{ duration: Math.random() * 2 + 1.5, delay: Math.random() * 0.3, ease: 'easeIn' }}
            />
          ))}
        </div>
      )}

      <div className="max-w-lg mx-auto space-y-4 relative z-10">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-xl font-bold pt-2">
          Refer & Earn
        </motion.h1>

        <GlassCard className="text-center" delay={0.1}>
          <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-3">
            <Gift className="w-7 h-7 text-accent" />
          </div>
          <h2 className="font-display text-lg font-bold mb-1">Earn $10 per Friend</h2>
          <p className="text-sm text-muted-foreground mb-4">Share your code and earn rewards when friends sign up.</p>

          <div className="glass rounded-xl p-4 mb-4">
            <p className="text-xs text-muted-foreground mb-1">Your Referral Code</p>
            <p className="font-display text-2xl font-black text-primary tracking-widest">{referralCode}</p>
          </div>

          <div className="flex gap-2">
            <NeonButton variant="secondary" className="flex-1" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </NeonButton>
            <NeonButton className="flex-1" onClick={handleShare}>
              <Share2 className="w-4 h-4" /> Share
            </NeonButton>
          </div>
        </GlassCard>

        {/* Stats */}
        <GlassCard delay={0.2}>
          <h3 className="text-sm font-semibold mb-3">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-display font-bold">{referralCount}</p>
              <p className="text-xs text-muted-foreground">Friends Referred</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
                <Gift className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-display font-bold">${referralCount * 10}</p>
              <p className="text-xs text-muted-foreground">Total Earned</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Referral;
