import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const FloatingBookButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) return null;

  return (
    <motion.button
      onClick={() => navigate('/dashboard')}
      className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ boxShadow: ['0 0 20px hsl(185 100% 47% / 0.3)', '0 0 40px hsl(185 100% 47% / 0.5)', '0 0 20px hsl(185 100% 47% / 0.3)'] }}
      transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
    >
      <Plus className="w-6 h-6 text-primary-foreground" />
    </motion.button>
  );
};
