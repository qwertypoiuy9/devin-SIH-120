import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState } from 'react';
import { apiService } from '../services/api';
import { Cpu, Zap, Play, RotateCcw, Settings } from 'lucide-react';

export default function PumpControl() {
  const { telemetry, srp } = useDigitalTwinStore();
  const [targetSpm, setTargetSpm] = useState(telemetry.spm);
  const [vfdResult, setVfdResult] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateVFD = async () => {
    setIsSimulating(true);
    try {
      const result = await apiService.simulateVFD({ target_spm: targetSpm });
      setVfdResult(result);
    } catch (error) {
      console.error('VFD simulation error:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  const resetVFD = () => {
    setTargetSpm(telemetry.spm);
    setVfdResult(null);
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">PUMP CONTROL</h2>
        <p className="text-muted">Surface SRP and VFD control interface</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Main Pump Visualization */}
        <div className="col-span-8">
          <div className="h-full glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4">PUMPJACK STATUS</h3>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">SPM</p>
                <p className="text-2xl font-bold text-cyan">{telemetry.spm.toFixed(1)}</p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Stroke Length</p>
                <p className="text-2xl font-bold text-cyan">{srp.stroke_length.toFixed(1)} m</p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Motor Speed</p>
                <p className="text-2xl font-bold text-cyan">{(telemetry.vfd_frequency * 30).toFixed(0)} RPM</p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Pump Efficiency</p>
                <p className="text-2xl font-bold text-cyan">{(srp.pump_efficiency * 100).toFixed(0)}%</p>
              </div>
            </div>

            {/* Pumpjack Animation Placeholder */}
            <div className="bg-panel-secondary rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <Cpu className="w-16 h-16 text-cyan mx-auto mb-4 animate-pulse" />
                <p className="text-cyan font-bold">PUMPJACK ANIMATION</p>
                <p className="text-xs text-muted mt-2">SPM: {telemetry.spm.toFixed(1)} | VFD: {telemetry.vfd_frequency.toFixed(1)} Hz</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Rod Load</p>
                <p className="text-lg font-bold text-cyan">{telemetry.rod_load.toFixed(1)} kN</p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Surface Vibration</p>
                <p className="text-lg font-bold text-cyan">{telemetry.surface_vibration.toFixed(2)} mm/s</p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Production Rate</p>
                <p className="text-lg font-bold text-cyan">{telemetry.production_rate.toFixed(1)} m³/d</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* VFD Control */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>VFD CONTROL</span>
            </h3>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">Status</span>
                <span className="text-sm font-bold text-green">● CONNECTED</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-2 block">Current Frequency</label>
                <p className="text-2xl font-bold text-cyan">{telemetry.vfd_frequency.toFixed(1)} Hz</p>
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Target Frequency</label>
                <p className="text-2xl font-bold text-cyan">
                  {vfdResult ? vfdResult.vfd_result.target_frequency.toFixed(1) : telemetry.vfd_frequency.toFixed(1)} Hz
                </p>
              </div>

              <div className="h-px bg-cyan/20" />

              <div>
                <label className="text-sm text-muted mb-2 block">Current SPM</label>
                <p className="text-xl font-bold text-cyan">{telemetry.spm.toFixed(1)}</p>
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Target SPM</label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={targetSpm}
                  onChange={(e) => setTargetSpm(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>1.0</span>
                  <span className="text-cyan font-bold">{targetSpm.toFixed(1)}</span>
                  <span>8.0</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={simulateVFD}
                  disabled={isSimulating}
                  className="flex-1 py-3 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg text-cyan font-bold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  <span>{isSimulating ? 'SIMULATING...' : 'SIMULATE'}</span>
                </button>
                <button
                  onClick={resetVFD}
                  className="py-3 px-4 bg-panel-secondary hover:bg-panel border border-cyan/20 rounded-lg text-cyan transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Asymmetric Pumping */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">ASYMMETRIC PUMPING</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Downstroke Speed</span>
                <span className="text-xs font-mono text-cyan">SLOW</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Upstroke Speed</span>
                <span className="text-xs font-mono text-cyan">FAST</span>
              </div>
              <div className="h-px bg-cyan/20" />
              <p className="text-xs text-muted">
                SLOW DOWNSTROKE → reduce fluid resistance / rod-float risk
              </p>
              <p className="text-xs text-muted">
                FAST UPSTROKE → improve fluid lifting
              </p>
            </div>
          </div>

          {/* VFD Result */}
          {vfdResult && (
            <div className="glass-panel rounded-lg p-4">
              <h3 className="text-sm font-bold text-cyan mb-4">SIMULATION RESULT</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Rod Load</span>
                  <span className="text-xs font-mono text-green">{vfdResult.telemetry.rod_load.toFixed(1)} kN</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Vibration</span>
                  <span className="text-xs font-mono text-green">{vfdResult.telemetry.vibration.toFixed(2)} mm/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Power</span>
                  <span className="text-xs font-mono text-green">{vfdResult.telemetry.power_consumption.toFixed(1)} kW</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
