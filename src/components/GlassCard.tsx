import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export const GlassCard = ({ children, className = '', delay = 0, hover = true }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    whileHover={hover ? { y: -2, boxShadow: '0 0 30px hsl(185 100% 47% / 0.15)' } : undefined}
    className={`glass rounded-2xl p-5 transition-shadow ${className}`}
  >
    {children}
  </motion.div>
);
