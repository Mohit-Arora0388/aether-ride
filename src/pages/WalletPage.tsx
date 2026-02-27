import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { NeonButton } from '@/components/NeonButton';
import { useStore } from '@/store/useStore';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, Check } from 'lucide-react';

const amounts = [10, 25, 50, 100];

const WalletPage = () => {
  const { walletBalance, transactions, addFunds } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddFunds = () => {
    addFunds(selectedAmount);
    setShowAdd(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen pt-16 pb-24 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-xl font-bold pt-2">
          Wallet
        </motion.h1>

        {/* Balance */}
        <GlassCard className="neon-border text-center" delay={0.1}>
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
            <WalletIcon className="w-7 h-7 text-primary-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Available Balance</p>
          <p className="text-4xl font-display font-black">${walletBalance.toFixed(2)}</p>
          <NeonButton size="md" className="mt-4" onClick={() => setShowAdd(true)}>
            <Plus className="w-4 h-4" /> Add Funds
          </NeonButton>
        </GlassCard>

        {/* Success toast */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass-strong rounded-xl p-3 flex items-center gap-2 neon-border"
          >
            <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
              <Check className="w-3 h-3 text-success-foreground" />
            </div>
            <span className="text-sm font-medium">Funds added successfully!</span>
          </motion.div>
        )}

        {/* Transactions */}
        <GlassCard delay={0.2} hover={false}>
          <h3 className="text-sm font-semibold mb-3">Transaction History</h3>
          <div className="space-y-2">
            {transactions.map(tx => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'credit' ? 'bg-success/20' : 'bg-destructive/20'}`}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4 text-success" /> : <ArrowUpRight className="w-4 h-4 text-destructive" />}
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-success' : 'text-destructive'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Add funds modal */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 backdrop-blur-sm px-4 pb-4"
          onClick={() => setShowAdd(false)}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-strong rounded-2xl p-6 w-full max-w-sm"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-lg mb-4">Add Funds</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {amounts.map(amt => (
                <NeonButton
                  key={amt}
                  variant={selectedAmount === amt ? 'primary' : 'secondary'}
                  onClick={() => setSelectedAmount(amt)}
                >
                  ${amt}
                </NeonButton>
              ))}
            </div>
            <div className="flex gap-2">
              <NeonButton variant="ghost" onClick={() => setShowAdd(false)} className="flex-1">Cancel</NeonButton>
              <NeonButton onClick={handleAddFunds} className="flex-1">Add ${selectedAmount}</NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default WalletPage;
