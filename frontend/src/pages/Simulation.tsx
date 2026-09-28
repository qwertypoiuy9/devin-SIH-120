import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState } from 'react';
import { apiService } from '../services/api';
import { FlaskConical, Play, RotateCcw } from 'lucide-react';

export default function Simulation() {
  const { telemetry } = useDigitalTwinStore();
  const [spm, setSpm] = useState(telemetry.spm);
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = async () => {
    setIsRunning(true);
    try {
      const result = await apiService.runSimulation({ spm });
      setSimulationResult(result);
    } catch (error) {
      console.error('Simulation error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const resetSimulation = () => {
    setSpm(telemetry.spm);
    setSimulationResult(null);
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">DIGITAL TWIN WHAT-IF SIMULATION</h2>
        <p className="text-muted">Test different operating scenarios</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Simulation Controls */}
        <div className="col-span-4 space-y-4">
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
              <FlaskConical className="w-5 h-5" />
              <span>SIMULATION PARAMETERS</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-2 block">SPM (Strokes Per Minute)</label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={spm}
                  onChange={(e) => setSpm(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>1.0</span>
                  <span className="text-cyan font-bold">{spm.toFixed(1)}</span>
                  <span>8.0</span>
                </div>
              </div>

              <div className="h-px bg-cyan/20" />

              <div className="flex space-x-3">
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="flex-1 py-3 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg text-cyan font-bold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  <span>{isRunning ? 'RUNNING...' : 'SIMULATE'}</span>
                </button>
                <button
                  onClick={resetSimulation}
                  className="py-3 px-4 bg-panel-secondary hover:bg-panel border border-cyan/20 rounded-lg text-cyan transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Scenarios */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">QUICK SCENARIOS</h3>
            <div className="space-y-2">
              {[
                { name: 'Normal Production', spm: 5.0 },
                { name: 'Reduced Speed', spm: 3.5 },
                { name: 'Low Speed', spm: 3.0 },
                { name: 'High Speed', spm: 6.0 },
              ].map((scenario) => (
                <button
                  key={scenario.name}
                  onClick={() => setSpm(scenario.spm)}
                  className="w-full py-2 px-4 bg-panel-secondary hover:bg-cyan/10 border border-cyan/20 rounded-lg text-cyan text-sm transition-colors text-left"
                >
                  {scenario.name} ({scenario.spm} SPM)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Simulation Results */}
        <div className="col-span-8">
          <div className="h-full glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4">SIMULATION RESULTS</h3>

            {simulationResult ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-panel-secondary rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">BASELINE</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">SPM</span>
                        <span className="text-sm font-mono text-cyan">{simulationResult.baseline.spm.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Rod Load</span>
                        <span className="text-sm font-mono text-cyan">{simulationResult.baseline.rod_load.toFixed(1)} kN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Vibration</span>
                        <span className="text-sm font-mono text-cyan">{simulationResult.baseline.vibration.toFixed(2)} mm/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Rod Float Risk</span>
                        <span className="text-sm font-mono text-cyan">{(simulationResult.baseline.rod_float_risk * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Energy</span>
                        <span className="text-sm font-mono text-cyan">{simulationResult.baseline.energy.toFixed(1)} kW</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-panel-secondary rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">SIMULATED</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">SPM</span>
                        <span className="text-sm font-mono text-green">{simulationResult.simulated.spm.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Rod Load</span>
                        <span className="text-sm font-mono text-green">{simulationResult.simulated.rod_load.toFixed(1)} kN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Vibration</span>
                        <span className="text-sm font-mono text-green">{simulationResult.simulated.vibration.toFixed(2)} mm/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Rod Float Risk</span>
                        <span className="text-sm font-mono text-green">{(simulationResult.simulated.rod_float_risk * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Energy</span>
                        <span className="text-sm font-mono text-green">{simulationResult.simulated.energy.toFixed(1)} kW</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-panel-secondary rounded-lg p-4">
                  <p className="text-xs text-muted mb-3">EXPECTED IMPROVEMENT</p>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted">Rod Load</p>
                      <p className="text-lg font-bold text-green">
                        {simulationResult.improvement.rod_load_reduction > 0 ? '-' : '+'}
                        {Math.abs(simulationResult.improvement.rod_load_reduction).toFixed(1)} kN
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted">Vibration</p>
                      <p className="text-lg font-bold text-green">
                        {simulationResult.improvement.vibration_reduction > 0 ? '-' : '+'}
                        {Math.abs(simulationResult.improvement.vibration_reduction).toFixed(2)} mm/s
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted">Rod Float Risk</p>
                      <p className="text-lg font-bold text-green">
                        {simulationResult.improvement.rod_float_risk_reduction > 0 ? '-' : '+'}
                        {Math.abs(simulationResult.improvement.rod_float_risk_reduction * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted">Energy</p>
                      <p className="text-lg font-bold text-green">
                        {simulationResult.improvement.energy_savings > 0 ? '-' : '+'}
                        {Math.abs(simulationResult.improvement.energy_savings).toFixed(1)} kW
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <FlaskConical className="w-12 h-12 text-muted mx-auto mb-4" />
                  <p className="text-muted">Run a simulation to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
