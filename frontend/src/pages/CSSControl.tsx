import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState } from 'react';
import { apiService } from '../services/api';
import { Gauge, Play, RotateCcw, Clock } from 'lucide-react';

export default function CSSControl() {
  const { telemetry } = useDigitalTwinStore();
  const [cssState, setCssState] = useState({
    injection_duration: 5,
    soak_duration: 5,
    production_duration: 30,
    steam_volume: 500,
    steam_injection_rate: 100,
    injection_pressure: 8,
    target_temperature: 180,
  });

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">CSS OPTIMIZATION</h2>
        <p className="text-muted">Cyclic Steam Stimulation control and optimization</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Main CSS Control */}
        <div className="col-span-8 space-y-4">
          {/* Current Cycle Status */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4">CURRENT CYCLE STATUS</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-panel-secondary rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted">INJECTION</span>
                  <span className="text-xs font-bold text-green">● COMPLETE</span>
                </div>
                <p className="text-sm text-muted">Cycle 5</p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted">SOAK</span>
                  <span className="text-xs font-bold text-amber">● ACTIVE</span>
                </div>
                <p className="text-sm text-muted">Day 3 of 5</p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted">PRODUCTION</span>
                  <span className="text-xs font-bold text-cyan">● READY</span>
                </div>
                <p className="text-sm text-muted">Scheduled: Day 6</p>
              </div>
            </div>

            {/* Timeline Visualization */}
            <div className="bg-panel-secondary rounded-lg p-4">
              <p className="text-xs text-muted mb-4">CYCLE TIMELINE</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-24 text-xs text-muted">INJECTION</div>
                  <div className="flex-1 h-4 bg-green/30 rounded relative">
                    <div className="absolute inset-y-0 left-0 w-full bg-green rounded" />
                  </div>
                  <div className="w-16 text-xs text-cyan">5 days</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 text-xs text-muted">SOAK</div>
                  <div className="flex-1 h-4 bg-amber/30 rounded relative">
                    <div className="absolute inset-y-0 left-0 w-3/5 bg-amber rounded" />
                  </div>
                  <div className="w-16 text-xs text-cyan">3/5 days</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 text-xs text-muted">PRODUCTION</div>
                  <div className="flex-1 h-4 bg-cyan/30 rounded relative">
                    <div className="absolute inset-y-0 left-0 w-0 bg-cyan rounded" />
                  </div>
                  <div className="w-16 text-xs text-cyan">30 days</div>
                </div>
              </div>
            </div>
          </div>

          {/* CSS Parameters */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4">CSS PARAMETERS</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted mb-2 block">Steam Volume (tons)</label>
                <input
                  type="number"
                  value={cssState.steam_volume}
                  onChange={(e) => setCssState({ ...cssState, steam_volume: Number(e.target.value) })}
                  className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan"
                />
              </div>
              <div>
                <label className="text-sm text-muted mb-2 block">Injection Rate (t/d)</label>
                <input
                  type="number"
                  value={cssState.steam_injection_rate}
                  onChange={(e) => setCssState({ ...cssState, steam_injection_rate: Number(e.target.value) })}
                  className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan"
                />
              </div>
              <div>
                <label className="text-sm text-muted mb-2 block">Injection Pressure (MPa)</label>
                <input
                  type="number"
                  value={cssState.injection_pressure}
                  onChange={(e) => setCssState({ ...cssState, injection_pressure: Number(e.target.value) })}
                  className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan"
                />
              </div>
              <div>
                <label className="text-sm text-muted mb-2 block">Target Temperature (°C)</label>
                <input
                  type="number"
                  value={cssState.target_temperature}
                  onChange={(e) => setCssState({ ...cssState, target_temperature: Number(e.target.value) })}
                  className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan"
                />
              </div>
              <div>
                <label className="text-sm text-muted mb-2 block">Injection Duration (days)</label>
                <input
                  type="number"
                  value={cssState.injection_duration}
                  onChange={(e) => setCssState({ ...cssState, injection_duration: Number(e.target.value) })}
                  className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan"
                />
              </div>
              <div>
                <label className="text-sm text-muted mb-2 block">Soak Duration (days)</label>
                <input
                  type="number"
                  value={cssState.soak_duration}
                  onChange={(e) => setCssState({ ...cssState, soak_duration: Number(e.target.value) })}
                  className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm text-muted mb-2 block">Production Duration (days)</label>
                <input
                  type="number"
                  value={cssState.production_duration}
                  onChange={(e) => setCssState({ ...cssState, production_duration: Number(e.target.value) })}
                  className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button className="flex-1 py-3 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg text-cyan font-bold transition-colors flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>RUN OPTIMIZATION</span>
              </button>
              <button className="py-3 px-4 bg-panel-secondary hover:bg-panel border border-cyan/20 rounded-lg text-cyan transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* CSS Performance */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">CSS PERFORMANCE</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Steam-Oil Ratio</span>
                <span className="text-xs font-mono text-cyan">3.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Cycle Production</span>
                <span className="text-xs font-mono text-cyan">150 m³</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Oil Recovery</span>
                <span className="text-xs font-mono text-cyan">12.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Energy/Barrel</span>
                <span className="text-xs font-mono text-cyan">2.1 GJ</span>
              </div>
            </div>
          </div>

          {/* SRP Synchronization */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">CSS + SRP SYNCHRONIZATION</h3>
            <div className="space-y-2">
              <p className="text-xs text-muted">
                STEAM INJECTION → RESERVOIR HEATING → VISCOSITY REDUCTION → FLUID MOBILITY → SRP PERFORMANCE
              </p>
              <div className="h-px bg-cyan/20" />
              <p className="text-xs text-muted">
                RESERVOIR COOLING → VISCOSITY INCREASE → ROD RESISTANCE → ROD FLOAT RISK → SRP OPTIMIZATION
              </p>
            </div>
          </div>

          {/* Current SPM Recommendation */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">CURRENT SPM</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Current</span>
                <span className="text-lg font-mono text-cyan">{telemetry.spm.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">AI Target</span>
                <span className="text-lg font-mono text-green">3.5</span>
              </div>
              <div className="h-px bg-cyan/20" />
              <p className="text-xs text-muted">
                During cooling phase, reduce SPM to maintain efficiency and reduce rod float risk
              </p>
            </div>
          </div>

          {/* Historical Cycles */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">HISTORICAL CYCLES</h3>
            <div className="space-y-2">
              {[
                { cycle: 4, production: 145, sor: 3.6 },
                { cycle: 3, production: 138, sor: 3.8 },
                { cycle: 2, production: 132, sor: 4.0 },
                { cycle: 1, production: 125, sor: 4.2 },
              ].map((cycle) => (
                <div key={cycle.cycle} className="flex items-center justify-between text-xs">
                  <span className="text-muted">Cycle {cycle.cycle}</span>
                  <div className="flex space-x-4">
                    <span className="text-cyan">{cycle.production} m³</span>
                    <span className="text-muted">SOR: {cycle.sor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
