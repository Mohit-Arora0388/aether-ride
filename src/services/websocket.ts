// Mock WebSocket service for real-time driver movement simulation

type Listener = (data: DriverUpdate) => void;

export interface DriverUpdate {
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  eta: number;
}

class MockWebSocketService {
  private listeners: Set<Listener> = new Set();
  private interval: ReturnType<typeof setInterval> | null = null;
  private basePosition = { lat: 40.7128, lng: -74.006 };

  connect() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      const update: DriverUpdate = {
        lat: this.basePosition.lat + (Math.random() - 0.5) * 0.01,
        lng: this.basePosition.lng + (Math.random() - 0.5) * 0.01,
        heading: Math.random() * 360,
        speed: Math.floor(Math.random() * 60 + 20),
        eta: Math.floor(Math.random() * 10 + 2),
      };
      this.listeners.forEach(fn => fn(update));
    }, 2000);
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const wsService = new MockWebSocketService();
