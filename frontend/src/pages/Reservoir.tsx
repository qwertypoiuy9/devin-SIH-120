import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState } from 'react';
import ReservoirVisualization from '../components/ReservoirVisualization';

export default function Reservoir() {
  const { reservoir, telemetry } = useDigitalTwinStore();
  const [selectedDepth, setSelectedDepth] = useState(1350);

  const getTemperatureColor = (temp: number) => {
    if (temp > 80) return '#FF3B30'; // Red - Hot
    if (temp > 60) return '#FFB020'; // Orange
    if (temp > 50) return '#FFFF00'; // Yellow
    if (temp > 45) return '#36F59A'; // Green
    if (temp > 40) return '#00C8FF'; // Cyan
    return '#19D9FF'; // Blue - Cool
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">RESERVOIR DIGITAL TWIN</h2>
        <p className="text-muted">Subsurface thermal and viscosity analysis</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Main Reservoir Visualization */}
        <div className="col-span-8">
          <div className="h-full glass-panel rounded-lg overflow-hidden">
            <ReservoirVisualization />
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* Temperature Scale */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">TEMPERATURE SCALE</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FF3B30' }} />
                <span className="text-xs text-muted">HOT (>80°C)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFB020' }} />
                <span className="text-xs text-muted">WARM (60-80°C)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFFF00' }} />
                <span className="text-xs text-muted">MODERATE (50-60°C)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#36F59A' }} />
                <span className="text-xs text-muted">COOL (45-50°C)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#00C8FF' }} />
                <span className="text-xs text-muted">COLD (<45°C)</span>
              </div>
            </div>
          </div>

          {/* Reservoir Parameters */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">RESERVOIR PARAMETERS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Initial Temperature</span>
                <span className="text-xs font-mono text-cyan">
                  {reservoir.reservoir_temperature.toFixed(1)}°C
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Current Temperature</span>
                <span className="text-xs font-mono text-cyan">
                  {reservoir.current_temperature.toFixed(1)}°C
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Thermal Radius</span>
                <span className="text-xs font-mono text-cyan">
                  {reservoir.thermal_radius.toFixed(1)} m
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Time Since Injection</span>
                <span className="text-xs font-mono text-cyan">
                  {reservoir.time_since_injection.toFixed(1)} days
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Thermal Decline Rate</span>
                <span className="text-xs font-mono text-cyan">
                  {reservoir.thermal_decline_rate.toFixed(3)} /day
                </span>
              </div>
            </div>
          </div>

          {/* Viscosity */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">VISCOSITY MODEL</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Current Viscosity</span>
                <span className="text-xs font-mono text-cyan">
                  {telemetry.temperature < 45 ? '2500' : telemetry.temperature < 50 ? '1500' : '800'} cP
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Mobility</span>
                <span className="text-xs font-mono text-cyan">
                  {telemetry.temperature < 45 ? '0.2' : telemetry.temperature < 50 ? '0.33' : '0.63'} mD/cP
                </span>
              </div>
              <div className="h-px bg-cyan/20" />
              <p className="text-xs text-muted">
                DIGITAL TWIN DEMONSTRATION MODEL
              </p>
              <p className="text-xs text-muted">
                DEMO / CALIBRATION REQUIRED
              </p>
            </div>
          </div>

          {/* Depth Inspector */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">DEPTH INSPECTOR</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted mb-2 block">Depth (m)</label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={selectedDepth}
                  onChange={(e) => setSelectedDepth(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>0m</span>
                  <span>{selectedDepth}m</span>
                  <span>2000m</span>
                </div>
              </div>
              <div className="h-px bg-cyan/20" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Temperature</span>
                  <span className="text-xs font-mono text-cyan">
                    {(reservoir.current_temperature - (selectedDepth / 2000) * 10).toFixed(1)}°C
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Pressure</span>
                  <span className="text-xs font-mono text-cyan">
                    {(telemetry.pressure + (selectedDepth / 2000) * 200).toFixed(1)} kPa
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Viscosity</span>
                  <span className="text-xs font-mono text-cyan">
                    {selectedDepth > 1300 ? '1200' : '800'} cP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
