import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX, LogOut } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const Navbar = () => {
  const { soundEnabled, toggleSound, isAuthenticated, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0.6, 0.95]);
  const hideOn = ['/'];
  if (hideOn.includes(location.pathname)) return null;

  return (
    <motion.header
      style={{ backdropFilter: 'blur(20px)' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/30"
    >
      <motion.div
        className="absolute inset-0 bg-background"
        style={{ opacity: bgOpacity }}
      />
      <div className="relative flex items-center justify-between h-14 px-4 max-w-5xl mx-auto">
        <button onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')} className="font-display font-bold text-lg tracking-tight">
          <span className="text-primary neon-text">NEON</span>
          <span className="text-foreground">RIDE</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          {isAuthenticated && (
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};
