import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NeonButton } from '@/components/NeonButton';
import { GlassCard } from '@/components/GlassCard';
import { useStore } from '@/store/useStore';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('All fields are required'); return; }
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-8">
      <GlassCard className="w-full max-w-sm" hover={false}>
        <h2 className="font-display text-2xl font-bold text-center mb-1">Welcome Back</h2>
        <p className="text-muted-foreground text-center text-sm mb-6">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type={showPw ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-muted-foreground">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded border-border" />
              Remember me
            </label>
            <button type="button" onClick={() => setShowForgot(true)} className="text-primary text-xs hover:underline">
              Forgot Password?
            </button>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-xs text-center">
              {error}
            </motion.p>
          )}

          <NeonButton type="submit" size="lg" className="w-full" loading={loading}>
            Sign In
          </NeonButton>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
        </p>
      </GlassCard>

      {/* Forgot password modal */}
      {showForgot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
          onClick={() => setShowForgot(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong rounded-2xl p-6 w-full max-w-sm"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-lg mb-2">Reset Password</h3>
            <p className="text-muted-foreground text-sm mb-4">Enter your email and we'll send a reset link.</p>
            <input
              type="email" placeholder="Email address"
              className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm mb-4"
            />
            <div className="flex gap-2">
              <NeonButton variant="ghost" onClick={() => setShowForgot(false)} className="flex-1">Cancel</NeonButton>
              <NeonButton onClick={() => setShowForgot(false)} className="flex-1">Send Link</NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Login;
