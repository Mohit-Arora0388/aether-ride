import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, Wallet, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/map', icon: Map, label: 'Map' },
  { to: '/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/history', icon: Clock, label: 'Rides' },
  { to: '/referral', icon: User, label: 'Refer' },
];

export const BottomNav = () => {
  const location = useLocation();
  const hideOn = ['/', '/login', '/signup'];
  if (hideOn.includes(location.pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/30 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <NavLink key={to} to={to} className="relative flex flex-col items-center gap-0.5 px-3 py-1">
              {active && (
                <motion.div
                  layoutId="bottomnav-indicator"
                  className="absolute -top-0.5 w-8 h-0.5 rounded-full bg-primary neon-glow"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
