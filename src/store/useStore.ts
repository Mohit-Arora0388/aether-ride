import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Ride {
  id: string;
  from: string;
  to: string;
  status: 'active' | 'completed' | 'cancelled';
  date: string;
  price: number;
  driver: string;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

interface CarConfig {
  color: string;
  rotation: number;
  viewMode: 'sky' | 'rooftop' | 'street';
  isNightMode: boolean;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;

  // Ride
  currentRide: Ride | null;
  rideHistory: Ride[];
  bookRide: (from: string, to: string) => void;
  cancelRide: (id: string) => void;

  // Wallet
  walletBalance: number;
  transactions: Transaction[];
  addFunds: (amount: number) => void;

  // Car Config
  carConfig: CarConfig;
  updateCarConfig: (config: Partial<CarConfig>) => void;

  // UI
  soundEnabled: boolean;
  toggleSound: () => void;
  engineStarted: boolean;
  startEngine: () => void;

  // Referral
  referralCode: string;
  referralCount: number;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: async (email: string, _password: string) => {
        await new Promise(r => setTimeout(r, 800));
        set({
          user: { id: '1', name: 'Alex Rider', email, phone: '+1234567890' },
          isAuthenticated: true,
        });
        return true;
      },
      signup: async (data) => {
        await new Promise(r => setTimeout(r, 800));
        set({
          user: { id: '1', name: data.name, email: data.email, phone: data.phone },
          isAuthenticated: true,
        });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),

      // Ride
      currentRide: null,
      rideHistory: [
        { id: '1', from: 'Downtown Hub', to: 'Airport Terminal 3', status: 'completed', date: '2026-02-25', price: 45.50, driver: 'Marcus' },
        { id: '2', from: 'Central Park', to: 'Tech Campus', status: 'completed', date: '2026-02-24', price: 22.00, driver: 'Sarah' },
        { id: '3', from: 'Marina Bay', to: 'City Hall', status: 'cancelled', date: '2026-02-23', price: 18.75, driver: 'Jin' },
      ],
      bookRide: (from, to) => {
        const ride: Ride = {
          id: Date.now().toString(),
          from, to,
          status: 'active',
          date: new Date().toISOString().split('T')[0],
          price: Math.floor(Math.random() * 40 + 10),
          driver: 'AutoPilot',
        };
        set(s => ({
          currentRide: ride,
          rideHistory: [ride, ...s.rideHistory],
          walletBalance: s.walletBalance - ride.price,
          transactions: [{ id: Date.now().toString(), type: 'debit', amount: ride.price, description: `Ride: ${from} → ${to}`, date: ride.date }, ...s.transactions],
        }));
      },
      cancelRide: (id) => set(s => ({
        currentRide: s.currentRide?.id === id ? null : s.currentRide,
        rideHistory: s.rideHistory.map(r => r.id === id ? { ...r, status: 'cancelled' as const } : r),
      })),

      // Wallet
      walletBalance: 250.00,
      transactions: [
        { id: '1', type: 'credit', amount: 100, description: 'Added funds', date: '2026-02-25' },
        { id: '2', type: 'debit', amount: 45.50, description: 'Ride to Airport', date: '2026-02-25' },
      ],
      addFunds: (amount) => set(s => ({
        walletBalance: s.walletBalance + amount,
        transactions: [{ id: Date.now().toString(), type: 'credit', amount, description: 'Added funds', date: new Date().toISOString().split('T')[0] }, ...s.transactions],
      })),

      // Car Config
      carConfig: {
        color: '#00F0FF',
        rotation: 0,
        viewMode: 'street',
        isNightMode: new Date().getHours() >= 18 || new Date().getHours() < 6,
      },
      updateCarConfig: (config) => set(s => ({ carConfig: { ...s.carConfig, ...config } })),

      // UI
      soundEnabled: true,
      toggleSound: () => set(s => ({ soundEnabled: !s.soundEnabled })),
      engineStarted: false,
      startEngine: () => set({ engineStarted: true }),

      // Referral
      referralCode: 'NEON' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      referralCount: 3,
    }),
    {
      name: 'neonride-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        walletBalance: state.walletBalance,
        transactions: state.transactions,
        rideHistory: state.rideHistory,
        soundEnabled: state.soundEnabled,
        referralCode: state.referralCode,
        referralCount: state.referralCount,
      }),
    }
  )
);
