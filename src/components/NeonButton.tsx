import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children?: ReactNode;
}

const variantStyles = {
  primary: 'gradient-primary text-primary-foreground font-semibold neon-glow',
  secondary: 'glass border-primary/30 text-primary hover:bg-primary/10',
  ghost: 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
  danger: 'bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-8 py-3.5 text-base rounded-2xl',
};

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className = '', disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled || loading}
      className={`btn-ripple relative inline-flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...(props as any)}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  )
);

NeonButton.displayName = 'NeonButton';
