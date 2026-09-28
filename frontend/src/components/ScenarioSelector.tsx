import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { apiService } from '../services/api';
import { FlaskConical, CheckCircle, AlertTriangle, Zap, LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: 'green' | 'cyan' | 'amber' | 'critical';
}

const scenarios: Scenario[] = [
  { 
    id: 'normal', 
    name: 'Normal Production', 
    description: 'Optimal operating conditions',
    icon: CheckCircle,
    color: 'green'
  },
  { 
    id: 'cooling', 
    name: 'Reservoir Cooling', 
    description: 'Temperature decline and viscosity increase',
    icon: FlaskConical,
    color: 'cyan'
  },
  { 
    id: 'high_viscosity', 
    name: 'High Viscosity', 
    description: 'Elevated fluid resistance',
    icon: AlertTriangle,
    color: 'amber'
  },
  { 
    id: 'rod_float', 
    name: 'Rod Float', 
    description: 'Mechanical instability risk',
    icon: AlertTriangle,
    color: 'critical'
  },
  { 
    id: 'impact_loading', 
    name: 'Impact Loading', 
    description: 'High stress conditions',
    icon: Zap,
    color: 'critical'
  },
  { 
    id: 'optimized', 
    name: 'Optimized Operation', 
    description: 'AI-recommended settings',
    icon: CheckCircle,
    color: 'green'
  },
];

export default function ScenarioSelector() {
  const { currentScenario, setScenario } = useDigitalTwinStore();
  const [isApplying, setIsApplying] = useState(false);

  const applyScenario = async (scenarioId: string) => {
    setIsApplying(true);
    try {
      await apiService.setScenario(scenarioId as 'normal' | 'cooling' | 'high_viscosity' | 'rod_float' | 'impact_loading' | 'optimized');
      setScenario(scenarioId as 'normal' | 'cooling' | 'high_viscosity' | 'rod_float' | 'impact_loading' | 'optimized');
    } catch (error) {
      console.error('Error applying scenario:', error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="glass-panel rounded-lg p-4">
      <h3 className="text-sm font-bold text-cyan mb-4">DEMO SCENARIOS</h3>
      <div className="space-y-2">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isActive = currentScenario === scenario.id;
          
          return (
            <button
              key={scenario.id}
              onClick={() => applyScenario(scenario.id)}
              disabled={isApplying}
              className={`
                w-full py-3 px-4 rounded-lg text-left transition-all
                ${isActive 
                  ? 'bg-cyan/20 border border-cyan/40' 
                  : 'bg-panel-secondary hover:bg-cyan/10 border border-cyan/20'
                }
                disabled:opacity-50
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${
                  scenario.color === 'green' ? 'text-green' :
                  scenario.color === 'cyan' ? 'text-cyan' :
                  scenario.color === 'amber' ? 'text-amber' :
                  'text-critical'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-cyan">{scenario.name}</p>
                  <p className="text-xs text-muted">{scenario.description}</p>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-green rounded-full animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {isApplying && (
        <div className="mt-4 text-center">
          <p className="text-xs text-muted">Applying scenario...</p>
        </div>
      )}
    </div>
  );
}
