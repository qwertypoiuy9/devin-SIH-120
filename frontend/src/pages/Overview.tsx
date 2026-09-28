import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState, useEffect } from 'react';
import DigitalTwin3D from '../components/DigitalTwin3D';
import WellStatusPanel from '../components/WellStatusPanel';
import AIRecommendationPanel from '../components/AIRecommendationPanel';
import ScenarioSelector from '../components/ScenarioSelector';

export default function Overview() {
  const { telemetry, reservoir, ai, isLoading } = useDigitalTwinStore();
  const [loadingState, setLoadingState] = useState('');

  useEffect(() => {
    if (isLoading) {
      const loadingSteps = [
        'INITIALIZING DIGITAL TWIN...',
        'LOADING RESERVOIR MODEL...',
        'LOADING WELLBORE MODEL...',
        'CONNECTING SENSOR NETWORK...',
        'LOADING AI ENGINE...',
        'SYNCHRONIZING SURFACE MODEL...',
        'DIGITAL TWIN ONLINE'
      ];

      let step = 0;
      const interval = setInterval(() => {
        if (step < loadingSteps.length) {
          setLoadingState(loadingSteps[step]);
          step++;
        } else {
          clearInterval(interval);
        }
      }, 400);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cyan text-lg font-mono">{loadingState}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">DIGITAL TWIN INTERFACE</h2>
        <p className="text-muted">Well-to-Surface Optimization Platform</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Main 3D Visualization */}
        <div className="col-span-8">
          <div className="h-full glass-panel rounded-lg overflow-hidden">
            <DigitalTwin3D />
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          <ScenarioSelector />
          <WellStatusPanel />
          <AIRecommendationPanel />
        </div>
      </div>
    </div>
  );
}
