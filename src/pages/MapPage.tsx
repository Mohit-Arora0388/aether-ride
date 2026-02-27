import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/GlassCard';
import { Map3DCanvas } from '@/components/Map3DCanvas';
import { TelemetryControls } from '@/components/TelemetryControls';
import { NeonButton } from '@/components/NeonButton';
import { useStore } from '@/store/useStore';
import { wsService, DriverUpdate } from '@/services/websocket';
import { Eye } from 'lucide-react';

const views = ['sky', 'rooftop', 'street'] as const;

const MapPage = () => {
  const { carConfig, updateCarConfig } = useStore();
  const [driverData, setDriverData] = useState<DriverUpdate | null>(null);

  useEffect(() => {
    wsService.connect();
    const unsub = wsService.subscribe(setDriverData);
    return () => { unsub(); wsService.disconnect(); };
  }, []);

  const isNight = carConfig.isNightMode;

  return (
    <div className="min-h-screen pt-16 pb-24 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-xl font-bold pt-2">
          Live Map
        </motion.h1>

        {/* Map */}
        <Map3DCanvas viewMode={carConfig.viewMode} isNight={isNight} />

        {/* View Toggle */}
        <GlassCard delay={0.1} hover={false}>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Camera View</span>
          </div>
          <div className="flex gap-2">
            {views.map(v => (
              <NeonButton
                key={v}
                variant={carConfig.viewMode === v ? 'primary' : 'secondary'}
                size="sm"
                className="flex-1 capitalize"
                onClick={() => updateCarConfig({ viewMode: v })}
              >
                {v}
              </NeonButton>
            ))}
          </div>
        </GlassCard>

        {/* Day/Night */}
        <GlassCard delay={0.15} hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Lighting Mode</span>
            <div className="flex gap-2">
              <NeonButton variant={!isNight ? 'primary' : 'secondary'} size="sm" onClick={() => updateCarConfig({ isNightMode: false })}>
                Day
              </NeonButton>
              <NeonButton variant={isNight ? 'primary' : 'secondary'} size="sm" onClick={() => updateCarConfig({ isNightMode: true })}>
                Night
              </NeonButton>
            </div>
          </div>
        </GlassCard>

        {/* Telemetry */}
        <GlassCard delay={0.2} hover={false}>
          <span className="text-sm font-semibold mb-3 block">Telemetry Controls</span>
          <TelemetryControls />
        </GlassCard>

        {/* Live data */}
        {driverData && (
          <GlassCard delay={0.25}>
            <span className="text-sm font-semibold mb-2 block">Live Driver Data</span>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>Speed: <span className="text-foreground font-semibold">{driverData.speed} km/h</span></div>
              <div>ETA: <span className="text-foreground font-semibold">{driverData.eta} min</span></div>
              <div>Heading: <span className="text-foreground font-semibold">{driverData.heading.toFixed(0)}°</span></div>
              <div>Status: <span className="text-primary font-semibold">Tracking</span></div>
            </div>
          </GlassCard>
        )}

        {/* Color picker */}
        <GlassCard delay={0.3} hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Car Color</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={carConfig.color}
                onChange={e => updateCarConfig({ color: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs text-muted-foreground font-mono">{carConfig.color}</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default MapPage;
