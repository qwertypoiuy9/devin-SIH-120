import { Bell, User, Clock, Wifi } from 'lucide-react';
import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState, useEffect } from 'react';

export default function Header() {
  const { well, telemetry, isConnected, alerts } = useDigitalTwinStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL' || a.severity === 'HIGH').length;

  return (
    <header className="h-16 bg-panel-secondary border-b border-cyan/20 flex items-center justify-between px-6">
      <div className="flex items-center space-x-6">
        <div>
          <h1 className="text-xl font-bold text-glow">BAGHEWALA FIELD</h1>
          <p className="text-sm text-muted">WELL {well.name}</p>
        </div>
        <div className="h-8 w-px bg-cyan/20" />
        <div>
          <p className="text-sm text-muted">{well.location}</p>
          <p className="text-xs text-cyan">DIGITAL TWIN ● {isConnected ? 'ONLINE' : 'OFFLINE'}</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Wifi className={`w-4 h-4 ${isConnected ? 'text-green' : 'text-critical'}`} />
          <span className="text-sm text-muted">
            Sensor Network: {isConnected ? '● CONNECTED' : '● DISCONNECTED'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-muted" />
          <span className="text-sm text-muted">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted">Data Mode:</span>
          <span className="text-sm text-cyan">SIMULATION</span>
        </div>

        <div className="relative">
          <Bell className="w-5 h-5 text-muted cursor-pointer hover:text-cyan transition-colors" />
          {criticalAlerts > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-critical rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{criticalAlerts}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-muted" />
          <span className="text-sm text-muted">Engineer</span>
        </div>
      </div>
    </header>
  );
}
