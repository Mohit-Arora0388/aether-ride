import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NeonButton } from '@/components/NeonButton';
import { GlassCard } from '@/components/GlassCard';
import { useStore } from '@/store/useStore';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

const getPasswordStrength = (pw: string) => {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
const strengthColors = ['', 'bg-destructive', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (form.phone.length < 7) e.phone = 'Invalid phone number';
    if (form.password.length < 6) e.password = 'Min 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords don\'t match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    setLoading(false);
    navigate('/dashboard');
  };

  const update = (key: string, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };

  const fields = [
    { key: 'name', icon: User, type: 'text', placeholder: 'Full Name' },
    { key: 'email', icon: Mail, type: 'email', placeholder: 'Email' },
    { key: 'phone', icon: Phone, type: 'tel', placeholder: 'Phone Number' },
  ] as const;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-8">
      <GlassCard className="w-full max-w-sm" hover={false}>
        <h2 className="font-display text-2xl font-bold text-center mb-1">Create Account</h2>
        <p className="text-muted-foreground text-center text-sm mb-6">Join the future of transit</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map(({ key, icon: Icon, type, placeholder }) => (
            <div key={key}>
              <div className="relative">
                <Icon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type={type} placeholder={placeholder}
                  value={(form as any)[key]}
                  onChange={e => update(key, e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm ${errors[key] ? 'border-destructive' : 'border-border'}`}
                />
              </div>
              {errors[key] && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-xs mt-1 ml-1">{errors[key]}</motion.p>}
            </div>
          ))}

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type={showPw ? 'text' : 'password'} placeholder="Password"
                value={form.password} onChange={e => update('password', e.target.value)}
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-secondary/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm ${errors.password ? 'border-destructive' : 'border-border'}`}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-muted-foreground">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {form.password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`flex-1 rounded-full transition-colors ${i <= strength ? strengthColors[strength] : 'bg-secondary'}`} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{strengthLabels[strength]}</span>
              </div>
            )}
            {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-xs mt-1 ml-1">{errors.password}</motion.p>}
          </div>

          {/* Confirm */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type={showPw ? 'text' : 'password'} placeholder="Confirm Password"
                value={form.confirm} onChange={e => update('confirm', e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm ${errors.confirm ? 'border-destructive' : 'border-border'}`}
              />
            </div>
            {errors.confirm && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-xs mt-1 ml-1">{errors.confirm}</motion.p>}
          </div>

          <NeonButton type="submit" size="lg" className="w-full" loading={loading}>
            Create Account
          </NeonButton>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default SignUp;
