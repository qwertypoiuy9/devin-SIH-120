import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState } from 'react';
import { apiService } from '../services/api';
import { Settings, Play, TrendingUp, TrendingDown } from 'lucide-react';

export default function Optimization() {
  const { telemetry } = useDigitalTwinStore();
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runOptimization = async () => {
    setIsRunning(true);
    try {
      const result = await apiService.runOptimization({
        objectives: {
          maximize_production: true,
          minimize_energy: true,
          minimize_rod_float_risk: true,
        },
      });
      setOptimizationResult(result);
    } catch (error) {
      console.error('Optimization error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">OPTIMIZATION CENTER</h2>
        <p className="text-muted">Multi-objective optimization for CSS and SRP</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Main Optimization */}
        <div className="col-span-8 space-y-4">
          {/* Optimization Objectives */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>OPTIMIZATION OBJECTIVES</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-panel-secondary rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green" />
                  <span className="text-sm font-bold text-green">MAXIMIZE</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Oil Production</span>
                    <span className="text-xs text-cyan">●</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Recovery</span>
                    <span className="text-xs text-cyan">●</span>
                  </div>
                </div>
              </div>

              <div className="bg-panel-secondary rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-critical" />
                  <span className="text-sm font-bold text-critical">MINIMIZE</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">SOR</span>
                    <span className="text-xs text-cyan">●</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Energy</span>
                    <span className="text-xs text-cyan">●</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Rod Float Risk</span>
                    <span className="text-xs text-cyan">●</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Impact Loading</span>
                    <span className="text-xs text-cyan">●</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Mechanical Stress</span>
                    <span className="text-xs text-cyan">●</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Downtime</span>
                    <span className="text-xs text-cyan">●</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={runOptimization}
              disabled={isRunning}
              className="w-full mt-6 py-3 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg text-cyan font-bold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              <span>{isRunning ? 'RUNNING OPTIMIZATION...' : 'RUN OPTIMIZATION'}</span>
            </button>
          </div>

          {/* Optimization Results */}
          {optimizationResult && (
            <div className="glass-panel rounded-lg p-6">
              <h3 className="text-lg font-bold text-cyan mb-4">OPTIMIZATION RESULTS</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-panel-secondary rounded-lg p-4">
                  <p className="text-xs text-muted mb-3">CURRENT STATE</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-muted">SPM</span>
                      <span className="text-sm font-mono text-cyan">{optimizationResult.current_state.spm.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted">Production</span>
                      <span className="text-sm font-mono text-cyan">{optimizationResult.current_state.production.toFixed(1)} m³/d</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted">Energy</span>
                      <span className="text-sm font-mono text-cyan">{optimizationResult.current_state.energy.toFixed(1)} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted">Rod Float Risk</span>
                      <span className="text-sm font-mono text-cyan">{(optimizationResult.current_state.rod_float_risk * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-panel-secondary rounded-lg p-4">
                  <p className="text-xs text-muted mb-3">OPTIMIZED STATE</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-muted">SPM</span>
                      <span className="text-sm font-mono text-green">{optimizationResult.optimized_state.spm.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted">Production</span>
                      <span className="text-sm font-mono text-green">{optimizationResult.optimized_state.production.toFixed(1)} m³/d</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted">Energy</span>
                      <span className="text-sm font-mono text-green">{optimizationResult.optimized_state.energy.toFixed(1)} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted">Rod Float Risk</span>
                      <span className="text-sm font-mono text-green">{(optimizationResult.optimized_state.rod_float_risk * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-3">EXPECTED IMPROVEMENT</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted">Energy Savings</p>
                    <p className="text-lg font-bold text-green">
                      {optimizationResult.recommendation.expected_improvement.energy_savings.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted">Rod Float Risk Reduction</p>
                    <p className="text-lg font-bold text-green">
                      {optimizationResult.recommendation.expected_improvement.rod_float_risk_reduction.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted">Production Change</p>
                    <p className={`text-lg font-bold ${
                      optimizationResult.recommendation.expected_improvement.production_change >= 0 ? 'text-green' : 'text-amber'
                    }`}>
                      {optimizationResult.recommendation.expected_improvement.production_change >= 0 ? '+' : ''}
                      {optimizationResult.recommendation.expected_improvement.production_change.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* Joint Optimization */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">JOINT OPTIMIZATION</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">CSS Optimization</span>
                <span className="text-xs font-bold text-green">● ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">SRP Optimization</span>
                <span className="text-xs font-bold text-green">● ACTIVE</span>
              </div>
              <div className="h-px bg-cyan/20" />
              <p className="text-xs text-muted">
                Synchronized optimization of CSS timing and SRP parameters for maximum efficiency
              </p>
            </div>
          </div>

          {/* Recommended Parameters */}
          {optimizationResult && (
            <div className="glass-panel rounded-lg p-4">
              <h3 className="text-sm font-bold text-cyan mb-4">RECOMMENDED PARAMETERS</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">SPM</span>
                  <span className="text-xs font-mono text-green">{optimizationResult.recommendation.spm.toFixed(1)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">VFD Frequency</span>
                  <span className="text-xs font-mono text-green">{optimizationResult.recommendation.vfd_frequency.toFixed(1)} Hz</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Stroke Profile</span>
                  <span className="text-xs font-mono text-green">Asymmetric</span>
                </div>
              </div>
            </div>
          )}

          {/* Key Performance Indicators */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">KEY PERFORMANCE INDICATORS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Production Rate</span>
                <span className="text-xs font-mono text-cyan">{telemetry.production_rate.toFixed(1)} m³/d</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Steam-Oil Ratio</span>
                <span className="text-xs font-mono text-cyan">3.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Energy/Barrel</span>
                <span className="text-xs font-mono text-cyan">2.1 GJ</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Pump Efficiency</span>
                <span className="text-xs font-mono text-cyan">{(telemetry.pump_efficiency * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
