import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react';

export default function Alerts() {
  const { alerts } = useDigitalTwinStore();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-critical border-critical';
      case 'HIGH':
        return 'text-amber border-amber';
      case 'MEDIUM':
        return 'text-cyan border-cyan';
      case 'LOW':
        return 'text-green border-green';
      default:
        return 'text-muted border-muted';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-critical/10';
      case 'HIGH':
        return 'bg-amber/10';
      case 'MEDIUM':
        return 'bg-cyan/10';
      case 'LOW':
        return 'bg-green/10';
      default:
        return 'bg-panel-secondary';
    }
  };

  const mockAlerts = alerts.length > 0 ? alerts : [
    {
      severity: 'HIGH',
      parameter: 'rod_float',
      value: 0.72,
      threshold: 0.5,
      prediction: 'ROD FLOAT PREDICTED',
      recommended_action: 'Reduce pump speed to 3.5 SPM',
      timestamp: new Date().toISOString(),
    },
    {
      severity: 'HIGH',
      parameter: 'temperature',
      value: 42.0,
      threshold: 45.0,
      prediction: 'VISCOSITY INCREASING',
      recommended_action: 'Schedule steam injection or reduce pump speed',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      severity: 'MEDIUM',
      parameter: 'pressure',
      value: 280.0,
      threshold: 300.0,
      prediction: 'PRESSURE DECLINING',
      recommended_action: 'Monitor pressure trends',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      severity: 'INFO',
      parameter: 'steam',
      value: 100.0,
      threshold: 0.0,
      prediction: 'STEAM CYCLE COMPLETE',
      recommended_action: 'Begin soak phase',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">ALERT CENTER</h2>
        <p className="text-muted">Industrial alert management system</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Alert Statistics */}
        <div className="col-span-8 space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-panel rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-critical" />
                <span className="text-xs text-muted">CRITICAL</span>
              </div>
              <p className="text-2xl font-bold text-critical">
                {mockAlerts.filter(a => a.severity === 'CRITICAL').length}
              </p>
            </div>
            <div className="glass-panel rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber" />
                <span className="text-xs text-muted">HIGH</span>
              </div>
              <p className="text-2xl font-bold text-amber">
                {mockAlerts.filter(a => a.severity === 'HIGH').length}
              </p>
            </div>
            <div className="glass-panel rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-cyan" />
                <span className="text-xs text-muted">MEDIUM</span>
              </div>
              <p className="text-2xl font-bold text-cyan">
                {mockAlerts.filter(a => a.severity === 'MEDIUM').length}
              </p>
            </div>
            <div className="glass-panel rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green" />
                <span className="text-xs text-muted">INFO</span>
              </div>
              <p className="text-2xl font-bold text-green">
                {mockAlerts.filter(a => a.severity === 'INFO').length}
              </p>
            </div>
          </div>

          {/* Alert List */}
          <div className="glass-panel rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-cyan">ACTIVE ALERTS</h3>
              <button className="flex items-center space-x-2 text-cyan text-sm hover:text-cyan/80">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>

            <div className="space-y-3">
              {mockAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${getSeverityBg(alert.severity)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={`w-4 h-4 ${getSeverityColor(alert.severity).split(' ')[0]}`} />
                      <span className={`text-sm font-bold ${getSeverityColor(alert.severity).split(' ')[0]}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted">Parameter</p>
                      <p className="text-sm text-cyan">{alert.parameter}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Value</p>
                      <p className="text-sm text-cyan">{alert.value.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Threshold</p>
                      <p className="text-sm text-cyan">{alert.threshold.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Prediction</p>
                      <p className="text-sm text-cyan">{alert.prediction}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted mb-1">Recommended Action</p>
                      <p className="text-sm text-green">{alert.recommended_action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* Alert Configuration */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">ALERT CONFIGURATION</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Rod Float Threshold</span>
                <span className="text-xs font-mono text-cyan">0.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Impact Loading Threshold</span>
                <span className="text-xs font-mono text-cyan">0.6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Temperature Threshold</span>
                <span className="text-xs font-mono text-cyan">45°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Vibration Threshold</span>
                <span className="text-xs font-mono text-cyan">2.0 mm/s</span>
              </div>
            </div>
          </div>

          {/* Alert History */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">RECENT HISTORY</h3>
            <div className="space-y-2">
              {[
                { time: '2h ago', event: 'Rod float resolved', severity: 'success' },
                { time: '5h ago', event: 'Steam injection started', severity: 'info' },
                { time: '1d ago', event: 'Pressure warning', severity: 'warning' },
                { time: '2d ago', event: 'Maintenance completed', severity: 'success' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-muted">{item.time}</span>
                  <span className={`${
                    item.severity === 'success' ? 'text-green' :
                    item.severity === 'warning' ? 'text-amber' :
                    'text-cyan'
                  }`}>
                    {item.event}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">NOTIFICATIONS</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Email Alerts</span>
                <span className="text-xs font-bold text-green">● ON</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">SMS Alerts</span>
                <span className="text-xs font-bold text-green">● ON</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Push Notifications</span>
                <span className="text-xs font-bold text-green">● ON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
