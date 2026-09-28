import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Layers, 
  Pipe, 
  Brain, 
  FlaskConical, 
  Cpu, 
  Settings, 
  AlertTriangle, 
  History, 
  FileText,
  Gauge
} from 'lucide-react';
import { useDigitalTwinStore } from '../store/digitalTwinStore';

const menuItems = [
  { path: '/overview', icon: LayoutDashboard, label: 'Overview' },
  { path: '/live-data', icon: Activity, label: 'Live Data' },
  { path: '/reservoir', icon: Layers, label: 'Reservoir' },
  { path: '/wellbore', icon: Pipe, label: 'Wellbore' },
  { path: '/ai-insights', icon: Brain, label: 'AI Insights' },
  { path: '/simulation', icon: FlaskConical, label: 'Simulation' },
  { path: '/pump-control', icon: Cpu, label: 'Pump Control' },
  { path: '/css-control', icon: Gauge, label: 'CSS Control' },
  { path: '/optimization', icon: Settings, label: 'Optimization' },
  { path: '/alerts', icon: AlertTriangle, label: 'Alerts' },
  { path: '/history', icon: History, label: 'History' },
  { path: '/reports', icon: FileText, label: 'Reports' },
];

export default function Sidebar() {
  const location = useLocation();
  const { isConnected } = useDigitalTwinStore();

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-panel-secondary border-r border-cyan/20 flex flex-col z-50">
      <div className="p-4 border-b border-cyan/20">
        <div className="w-12 h-12 rounded-lg bg-cyan/10 flex items-center justify-center border border-cyan/30">
          <Layers className="w-6 h-6 text-cyan" />
        </div>
      </div>

      <nav className="flex-1 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative flex items-center justify-center w-12 h-12 mx-auto rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-cyan/20 text-cyan border border-cyan/40' 
                  : 'text-muted hover:bg-cyan/10 hover:text-cyan'
                }
              `}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-cyan rounded-r" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-cyan/20">
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green animate-pulse' : 'bg-critical'}`} />
          <span className="text-xs text-muted">
            {isConnected ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>
    </div>
  );
}
