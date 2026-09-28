import { Settings as SettingsIcon, User, Bell, Database, Cpu, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [role, setRole] = useState('ENGINEER');

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">SETTINGS</h2>
        <p className="text-muted">System configuration and preferences</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Main Settings */}
        <div className="col-span-8 space-y-4">
          {/* User Settings */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>USER SETTINGS</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted mb-2 block">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan"
                >
                  <option value="ENGINEER">ENGINEER</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted mb-2 block">Permissions</label>
                <div className="bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan text-sm">
                  {role === 'ENGINEER' ? 'Full access' : 'Read-only access'}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-panel-secondary rounded-lg">
              <p className="text-xs text-muted">
                <strong className="text-cyan">ENGINEER:</strong> Can simulate, optimize, and approve demo actions
              </p>
              <p className="text-xs text-muted mt-1">
                <strong className="text-cyan">VIEWER:</strong> Can view data but cannot apply actions
              </p>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>NOTIFICATION SETTINGS</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan">Email Alerts</p>
                  <p className="text-xs text-muted">Receive critical alerts via email</p>
                </div>
                <div className="w-12 h-6 bg-green rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan">SMS Alerts</p>
                  <p className="text-xs text-muted">Receive critical alerts via SMS</p>
                </div>
                <div className="w-12 h-6 bg-green rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan">Push Notifications</p>
                  <p className="text-xs text-muted">Receive in-app notifications</p>
                </div>
                <div className="w-12 h-6 bg-green rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan">Sound Alerts</p>
                  <p className="text-xs text-muted">Play sound for critical alerts</p>
                </div>
                <div className="w-12 h-6 bg-panel border border-cyan/20 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-muted rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
              <Cpu className="w-5 h-5" />
              <span>SYSTEM SETTINGS</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-2 block">Data Refresh Rate</label>
                <select className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan">
                  <option>1 second</option>
                  <option selected>2 seconds</option>
                  <option>5 seconds</option>
                  <option>10 seconds</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Time Zone</label>
                <select className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan">
                  <option selected>UTC+5:30 (India)</option>
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Units</label>
                <select className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan">
                  <option selected>Metric (m, °C, kPa)</option>
                  <option>Imperial (ft, °F, psi)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* System Status */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">SYSTEM STATUS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Digital Twin</span>
                <span className="text-xs font-bold text-green">● ONLINE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Reservoir Model</span>
                <span className="text-xs font-bold text-green">● RUNNING</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Wellbore Model</span>
                <span className="text-xs font-bold text-green">● RUNNING</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Surface Model</span>
                <span className="text-xs font-bold text-green">● RUNNING</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">AI Engine</span>
                <span className="text-xs font-bold text-green">● ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">VFD Link</span>
                <span className="text-xs font-bold text-amber">● SIMULATED</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Data Pipeline</span>
                <span className="text-xs font-bold text-green">● HEALTHY</span>
              </div>
            </div>
          </div>

          {/* Database Settings */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4 flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>DATABASE</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Status</span>
                <span className="text-xs font-bold text-green">● Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Type</span>
                <span className="text-xs text-cyan">PostgreSQL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Records</span>
                <span className="text-xs text-cyan">1,234,567</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Last Backup</span>
                <span className="text-xs text-cyan">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4 flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>SECURITY</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Authentication</span>
                <span className="text-xs font-bold text-green">● Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Encryption</span>
                <span className="text-xs font-bold text-green">● AES-256</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Audit Log</span>
                <span className="text-xs font-bold text-green">● Active</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="glass-panel rounded-lg p-4 border border-amber/30">
            <h3 className="text-sm font-bold text-amber mb-2">DISCLAIMER</h3>
            <p className="text-xs text-muted">
              This is a demonstration / simulation system. All values are simulated data unless explicitly stated otherwise. This system is not connected to actual Oil India Limited production control systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
