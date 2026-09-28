import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { Brain, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AIRecommendationPanel() {
  const { ai, telemetry } = useDigitalTwinStore();
  const [showReasoning, setShowReasoning] = useState(false);

  const getRecommendationColor = (condition: string) => {
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

  const getRecommendationText = (condition: string) => {
    switch (condition) {
      case 'normal':
        return 'Operation optimal. Continue current settings.';
      case 'increasing_viscosity':
        return 'Reduce pump speed to maintain efficiency.';
      case 'rod_float_risk':
        return 'Immediate SPM reduction required.';
      case 'impact_loading_risk':
        return 'Reduce pump speed to prevent damage.';
      default:
        return 'Monitor conditions closely.';
    }
  };

  return (
    <div className="glass-panel rounded-lg p-4">
      <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
        <Brain className="w-5 h-5" />
        <span>AI RECOMMENDATION</span>
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Condition</span>
          <span className={`text-sm font-bold ${getRecommendationColor(ai.condition)}`}>
            {ai.condition.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Confidence</span>
          <span className="text-sm font-mono text-cyan">
            {(ai.confidence * 100).toFixed(0)}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Rod Float Risk</span>
          <span className={`text-sm font-mono ${
            ai.rod_float_probability > 0.7 ? 'text-critical' :
            ai.rod_float_probability > 0.5 ? 'text-amber' :
            'text-green'
          }`}>
            {(ai.rod_float_probability * 100).toFixed(0)}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Impact Loading Risk</span>
          <span className={`text-sm font-mono ${
            ai.impact_loading_risk > 0.6 ? 'text-critical' :
            ai.impact_loading_risk > 0.4 ? 'text-amber' :
            'text-green'
          }`}>
            {(ai.impact_loading_risk * 100).toFixed(0)}%
          </span>
        </div>

        <div className="h-px bg-cyan/20" />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Current SPM</span>
            <span className="text-sm font-mono text-cyan">
              {telemetry.spm.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Recommended SPM</span>
            <div className="flex items-center space-x-2">
              <ArrowRight className="w-4 h-4 text-cyan" />
              <span className="text-sm font-mono text-green font-bold">
                {ai.recommended_spm.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="h-px bg-cyan/20" />

        <p className="text-sm text-muted">
          {getRecommendationText(ai.condition)}
        </p>

        <button
          onClick={() => setShowReasoning(!showReasoning)}
          className="w-full py-2 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg text-cyan text-sm transition-colors"
        >
          {showReasoning ? 'Hide' : 'WHY?'}
        </button>

        {showReasoning && (
          <div className="space-y-2 mt-3 p-3 bg-panel-secondary rounded-lg">
            <p className="text-xs text-muted mb-2">PHYSICS EVIDENCE</p>
            {ai.reasoning.map((reason, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-3 h-3 text-green mt-0.5 flex-shrink-0" />
                <span className="text-xs text-muted">{reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
