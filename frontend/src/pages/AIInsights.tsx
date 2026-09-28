import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState } from 'react';
import { Brain, ArrowRight, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export default function AIInsights() {
  const { ai, telemetry, reservoir } = useDigitalTwinStore();
  const [showPhysicsEvidence, setShowPhysicsEvidence] = useState(false);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'normal':
        return 'text-green';
      case 'increasing_viscosity':
        return 'text-amber';
      case 'rod_float_risk':
        return 'text-critical';
      case 'impact_loading_risk':
        return 'text-critical';
      default:
        return 'text-cyan';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'normal':
        return CheckCircle;
      case 'increasing_viscosity':
        return TrendingUp;
      case 'rod_float_risk':
        return AlertTriangle;
      case 'impact_loading_risk':
        return AlertTriangle;
      default:
        return Brain;
    }
  };

  const ConditionIcon = getConditionIcon(ai.condition);

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">AI ANALYSIS & RECOMMENDATION</h2>
        <p className="text-muted">Physics-informed artificial intelligence insights</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Main AI Analysis */}
        <div className="col-span-8 space-y-4">
          {/* Current Condition */}
          <div className="glass-panel rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-cyan flex items-center space-x-2">
                <Brain className="w-6 h-6" />
                <span>CURRENT CONDITION</span>
              </h3>
              <div className={`flex items-center space-x-2 ${getConditionColor(ai.condition)}`}>
                <ConditionIcon className="w-5 h-5" />
                <span className="text-xl font-bold">{ai.condition.toUpperCase()}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Confidence</p>
                <p className="text-2xl font-bold text-cyan">{(ai.confidence * 100).toFixed(0)}%</p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Rod Float Risk</p>
                <p className={`text-2xl font-bold ${
                  ai.rod_float_probability > 0.7 ? 'text-critical' :
                  ai.rod_float_probability > 0.5 ? 'text-amber' :
                  'text-green'
                }`}>
                  {(ai.rod_float_probability * 100).toFixed(0)}%
                </p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Impact Loading Risk</p>
                <p className={`text-2xl font-bold ${
                  ai.impact_loading_risk > 0.6 ? 'text-critical' :
                  ai.impact_loading_risk > 0.4 ? 'text-amber' :
                  'text-green'
                }`}>
                  {(ai.impact_loading_risk * 100).toFixed(0)}%
                </p>
              </div>
              <div className="bg-panel-secondary rounded-lg p-4">
                <p className="text-xs text-muted mb-2">Failure Risk</p>
                <p className={`text-2xl font-bold ${
                  ai.physics_evidence.failure_risk === 'high' ? 'text-critical' :
                  ai.physics_evidence.failure_risk === 'moderate' ? 'text-amber' :
                  'text-green'
                }`}>
                  {ai.physics_evidence.failure_risk.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4">AI RECOMMENDATION</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Current SPM</span>
                  <span className="text-lg font-mono text-cyan">{telemetry.spm.toFixed(1)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Current VFD</span>
                  <span className="text-lg font-mono text-cyan">{telemetry.vfd_frequency.toFixed(1)} Hz</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Recommended SPM</span>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-green" />
                    <span className="text-lg font-mono text-green font-bold">{ai.recommended_spm.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Recommended VFD</span>
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-green" />
                    <span className="text-lg font-mono text-green font-bold">{ai.recommended_vfd_frequency.toFixed(1)} Hz</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPhysicsEvidence(!showPhysicsEvidence)}
              className="w-full py-3 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg text-cyan font-bold transition-colors"
            >
              {showPhysicsEvidence ? 'HIDE PHYSICS EVIDENCE' : 'SHOW PHYSICS EVIDENCE'}
            </button>

            {showPhysicsEvidence && (
              <div className="mt-6 p-6 bg-panel-secondary rounded-lg">
                <h4 className="text-sm font-bold text-cyan mb-4">PHYSICS EVIDENCE CHAIN</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-cyan">1</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted">Reservoir temperature: {ai.physics_evidence.temperature.toFixed(1)}°C</p>
                      <p className="text-xs text-muted mt-1">
                        {ai.physics_evidence.temperature < 45 ? 'Temperature declined below optimal range' : 'Temperature within normal range'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-cyan flex-shrink-0" />
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-cyan">2</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted">Predicted oil viscosity: {ai.physics_evidence.viscosity.toFixed(0)} cP</p>
                      <p className="text-xs text-muted mt-1">
                        {ai.physics_evidence.viscosity > 1500 ? 'Viscosity increased significantly' : 'Viscosity at normal level'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-cyan flex-shrink-0" />
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-cyan">3</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted">Fluid resistance: {ai.physics_evidence.fluid_resistance.toFixed(2)}</p>
                      <p className="text-xs text-muted mt-1">
                        {ai.physics_evidence.fluid_resistance > 1.5 ? 'Fluid resistance elevated' : 'Fluid resistance normal'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-cyan flex-shrink-0" />
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-cyan">4</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted">Rod dynamics: {ai.physics_evidence.rod_dynamics}</p>
                      <p className="text-xs text-muted mt-1">
                        {ai.physics_evidence.rod_dynamics === 'elevated_stress' ? 'Rod string experiencing elevated stress' : 'Rod dynamics normal'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-cyan flex-shrink-0" />
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-cyan">5</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted">Rod float probability: {(ai.physics_evidence.rod_float * 100).toFixed(0)}%</p>
                      <p className="text-xs text-muted mt-1">
                        {ai.physics_evidence.rod_float > 0.5 ? 'Rod float risk elevated' : 'Rod float risk low'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-cyan flex-shrink-0" />
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-cyan">6</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted">Impact loading risk: {(ai.physics_evidence.impact_load * 100).toFixed(0)}%</p>
                      <p className="text-xs text-muted mt-1">
                        {ai.physics_evidence.impact_load > 0.5 ? 'Impact loading risk elevated' : 'Impact loading risk low'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-cyan flex-shrink-0" />
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-green font-bold">RECOMMENDATION: Reduce SPM to {ai.recommended_spm.toFixed(1)}</p>
                      <p className="text-xs text-muted mt-1">
                        Lower asymmetric pumping speed predicted to stabilize operation and reduce mechanical stress
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* Model Information */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">AI MODEL INFORMATION</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Model Type</span>
                <span className="text-xs font-mono text-cyan">Physics-Informed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Architecture</span>
                <span className="text-xs font-mono text-cyan">PINN</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Data Loss</span>
                <span className="text-xs font-mono text-cyan">0.15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Physics Loss</span>
                <span className="text-xs font-mono text-cyan">0.08</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Total Loss</span>
                <span className="text-xs font-mono text-cyan">0.23</span>
              </div>
            </div>
          </div>

          {/* Reasoning Summary */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">REASONING SUMMARY</h3>
            <div className="space-y-2">
              {ai.reasoning.map((reason, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-3 h-3 text-green mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">KEY METRICS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Temperature</span>
                <span className="text-xs font-mono text-cyan">{reservoir.current_temperature.toFixed(1)}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Viscosity</span>
                <span className="text-xs font-mono text-cyan">{ai.physics_evidence.viscosity.toFixed(0)} cP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Fluid Resistance</span>
                <span className="text-xs font-mono text-cyan">{ai.physics_evidence.fluid_resistance.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Rod Float Risk</span>
                <span className="text-xs font-mono text-cyan">{(ai.rod_float_probability * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Impact Loading Risk</span>
                <span className="text-xs font-mono text-cyan">{(ai.impact_loading_risk * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
