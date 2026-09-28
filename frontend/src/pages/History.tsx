import { History as HistoryIcon, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

export default function History() {
  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">HISTORICAL ANALYTICS</h2>
        <p className="text-muted">Historical data and trend analysis</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Main Historical View */}
        <div className="col-span-8 space-y-4">
          {/* Timeline */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>CSS CYCLE TIMELINE</span>
            </h3>

            <div className="space-y-4">
              {[
                { cycle: 5, start: '2024-01-15', end: '2024-02-20', production: 150, status: 'active' },
                { cycle: 4, start: '2023-12-10', end: '2024-01-14', production: 145, status: 'complete' },
                { cycle: 3, start: '2023-11-05', end: '2023-12-09', production: 138, status: 'complete' },
                { cycle: 2, start: '2023-10-01', end: '2023-11-04', production: 132, status: 'complete' },
                { cycle: 1, start: '2023-08-25', end: '2023-09-30', production: 125, status: 'complete' },
              ].map((cycle) => (
                <div key={cycle.cycle} className="bg-panel-secondary rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-cyan">Cycle {cycle.cycle}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        cycle.status === 'active' ? 'bg-green/20 text-green' : 'bg-cyan/20 text-cyan'
                      }`}>
                        {cycle.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-muted">{cycle.start} - {cycle.end}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted">Production</p>
                      <p className="text-sm font-mono text-cyan">{cycle.production} m³</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Steam Volume</p>
                      <p className="text-sm font-mono text-cyan">500 t</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">SOR</p>
                      <p className="text-sm font-mono text-cyan">3.3</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Trends */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4">HISTORICAL TRENDS</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-panel-secondary rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green" />
                  <span className="text-sm font-bold text-green">PRODUCTION TREND</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">30-day avg</span>
                    <span className="text-cyan">15.2 m³/d</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Trend</span>
                    <span className="text-green">+2.3%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Peak</span>
                    <span className="text-cyan">18.5 m³/d</span>
                  </div>
                </div>
              </div>

              <div className="bg-panel-secondary rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-amber" />
                  <span className="text-sm font-bold text-amber">SOR TREND</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">30-day avg</span>
                    <span className="text-cyan">3.4</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Trend</span>
                    <span className="text-green">-0.2</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Best</span>
                    <span className="text-cyan">3.1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* Filters */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">FILTERS</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted mb-2 block">Date Range</label>
                <select className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-3 py-2 text-cyan text-sm">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                  <option>All time</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted mb-2 block">Cycle</label>
                <select className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-3 py-2 text-cyan text-sm">
                  <option>All cycles</option>
                  <option>Cycle 5</option>
                  <option>Cycle 4</option>
                  <option>Cycle 3</option>
                  <option>Cycle 2</option>
                  <option>Cycle 1</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted mb-2 block">Event Type</label>
                <select className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-3 py-2 text-cyan text-sm">
                  <option>All events</option>
                  <option>CSS cycles</option>
                  <option>Production</option>
                  <option>Steam injection</option>
                  <option>Alerts</option>
                  <option>Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Event Statistics */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">EVENT STATISTICS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Total CSS Cycles</span>
                <span className="text-xs font-mono text-cyan">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Total Production</span>
                <span className="text-xs font-mono text-cyan">690 m³</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Steam Consumed</span>
                <span className="text-xs font-mono text-cyan">2,400 t</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Rod Float Events</span>
                <span className="text-xs font-mono text-amber">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Impact Loading Events</span>
                <span className="text-xs font-mono text-amber">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Maintenance Events</span>
                <span className="text-xs font-mono text-cyan">1</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">KEY METRICS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Avg Production</span>
                <span className="text-xs font-mono text-cyan">15.0 m³/d</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Avg SOR</span>
                <span className="text-xs font-mono text-cyan">3.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Avg Energy/Barrel</span>
                <span className="text-xs font-mono text-cyan">2.1 GJ</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Uptime</span>
                <span className="text-xs font-mono text-green">94.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
