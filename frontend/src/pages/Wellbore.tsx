import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState } from 'react';
import Wellbore3D from '../components/Wellbore3D';

export default function Wellbore() {
  const { wellbore, telemetry } = useDigitalTwinStore();
  const [selectedDepth, setSelectedDepth] = useState(1300);

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">WELLBORE DIGITAL TWIN</h2>
        <p className="text-muted">Interactive wellbore mechanics and fluid dynamics</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Main Wellbore Visualization */}
        <div className="col-span-8">
          <div className="h-full glass-panel rounded-lg overflow-hidden">
            <Wellbore3D selectedDepth={selectedDepth} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* Wellbore Parameters */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">WELLBORE PARAMETERS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Total Depth</span>
                <span className="text-xs font-mono text-cyan">
                  {wellbore.depth.toFixed(0)} m
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Casing Depth</span>
                <span className="text-xs font-mono text-cyan">
                  {wellbore.casing_depth.toFixed(0)} m
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Tubing Depth</span>
                <span className="text-xs font-mono text-cyan">
                  {wellbore.tubing_depth.toFixed(0)} m
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Pump Depth</span>
                <span className="text-xs font-mono text-cyan">
                  {wellbore.pump_depth.toFixed(0)} m
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Perforation Depth</span>
                <span className="text-xs font-mono text-cyan">
                  {wellbore.perforation_depth.toFixed(0)} m
                </span>
              </div>
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
                  max="1500"
                  value={selectedDepth}
                  onChange={(e) => setSelectedDepth(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>0m</span>
                  <span>{selectedDepth}m</span>
                  <span>1500m</span>
                </div>
              </div>
              <div className="h-px bg-cyan/20" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Temperature</span>
                  <span className="text-xs font-mono text-cyan">
                    {(telemetry.temperature - (selectedDepth / 1500) * 15).toFixed(1)}°C
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Pressure</span>
                  <span className="text-xs font-mono text-cyan">
                    {(telemetry.pressure + (selectedDepth / 1500) * 200).toFixed(1)} kPa
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Viscosity</span>
                  <span className="text-xs font-mono text-cyan">
                    {selectedDepth > 1300 ? '1200' : '800'} cP
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Rod Velocity</span>
                  <span className="text-xs font-mono text-cyan">
                    {selectedDepth > 1300 ? '0.3' : '0.5'} m/s
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Rod Displacement</span>
                  <span className="text-xs font-mono text-cyan">
                    {selectedDepth > 1300 ? '1.8' : '2.5'} m
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Stress</span>
                  <span className="text-xs font-mono text-cyan">
                    {selectedDepth > 1300 ? '45' : '30'} MPa
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rod String Status */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">ROD STRING STATUS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Status</span>
                <span className="text-xs font-bold text-green">
                  ● OPERATING
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Load</span>
                <span className="text-xs font-mono text-cyan">
                  {telemetry.rod_load.toFixed(1)} kN
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Vibration</span>
                <span className="text-xs font-mono text-cyan">
                  {telemetry.surface_vibration.toFixed(2)} mm/s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
