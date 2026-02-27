import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NeonButton } from '@/components/NeonButton';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-display text-7xl font-black text-primary neon-text mb-2">404</h1>
        <p className="text-muted-foreground mb-6">Route not found in the grid</p>
        <NeonButton onClick={() => navigate('/')}>Return Home</NeonButton>
      </motion.div>
    </div>
  );
};

export default NotFound;
