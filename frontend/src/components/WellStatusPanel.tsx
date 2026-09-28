import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { Activity, Thermometer, Gauge, Droplets, Zap, AlertTriangle } from 'lucide-react';

export default function WellStatusPanel() {
  const { telemetry, reservoir } = useDigitalTwinStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRODUCING':
        return 'text-green';
      case 'WARNING':
        return 'text-amber';
      case 'CRITICAL':
        return 'text-critical';
      default:
        return 'text-cyan';
    }
  };

  const getAlertLevel = (value: number, threshold: number) => {
    if (value > threshold * 1.2) return 'critical';
    if (value > threshold) return 'warning';
    return 'normal';
  };

  return (
    <div className="glass-panel rounded-lg p-4">
      <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
        <Activity className="w-5 h-5" />
        <span>WELL STATUS</span>
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Status</span>
          <span className={`text-sm font-bold ${getStatusColor('PRODUCING')}`}>
            ● PRODUCING
          </span>
        </div>

        <div className="h-px bg-cyan/20" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-cyan" />
            <span className="text-sm text-muted">Temperature</span>
          </div>
          <span className="text-sm font-mono text-cyan">
            {reservoir.current_temperature.toFixed(1)}°C
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-cyan" />
            <span className="text-sm text-muted">Pressure</span>
          </div>
          <span className="text-sm font-mono text-cyan">
            {telemetry.pressure.toFixed(1)} kPa
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-cyan" />
            <span className="text-sm text-muted">Flow Rate</span>
          </div>
          <span className="text-sm font-mono text-cyan">
            {telemetry.flow_rate.toFixed(1)} m³/d
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">SPM</span>
          <span className="text-sm font-mono text-cyan">
            {telemetry.spm.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Rod Load</span>
          <span className="text-sm font-mono text-cyan">
            {telemetry.rod_load.toFixed(1)} kN
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan" />
            <span className="text-sm text-muted">Vibration</span>
          </div>
          <span className={`text-sm font-mono ${
            getAlertLevel(telemetry.surface_vibration, 2.0) === 'critical' ? 'text-critical' :
            getAlertLevel(telemetry.surface_vibration, 2.0) === 'warning' ? 'text-amber' :
            'text-cyan'
          }`}>
            {telemetry.surface_vibration.toFixed(2)} mm/s
          </span>
        </div>

        <div className="h-px bg-cyan/20" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Steam Status</span>
          <span className="text-sm font-bold text-green">
            ● ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
