import { FileText, Download, Calendar } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">ENGINEERING REPORTS</h2>
        <p className="text-muted">Generate and export digital twin reports</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
        {/* Report Generation */}
        <div className="col-span-8 space-y-4">
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>GENERATE REPORT</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-muted mb-2 block">Report Type</label>
                <select className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan">
                  <option>Complete Digital Twin Report</option>
                  <option>Reservoir Analysis</option>
                  <option>Wellbore Analysis</option>
                  <option>SRP Performance</option>
                  <option>CSS Performance</option>
                  <option>AI Predictions</option>
                  <option>Optimization Summary</option>
                  <option>Alert Summary</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted mb-2 block">Date Range</label>
                <select className="w-full bg-panel-secondary border border-cyan/20 rounded-lg px-4 py-2 text-cyan">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Custom range</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 py-3 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg text-cyan font-bold transition-colors">
                <Download className="w-4 h-4" />
                <span>EXPORT PDF</span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-3 px-4 bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 rounded-lg text-cyan font-bold transition-colors">
                <Download className="w-4 h-4" />
                <span>EXPORT CSV</span>
              </button>
            </div>
          </div>

          {/* Report Preview */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="text-lg font-bold text-cyan mb-4">REPORT PREVIEW</h3>
            
            <div className="bg-panel-secondary rounded-lg p-6 space-y-4">
              <div className="text-center border-b border-cyan/20 pb-4">
                <h2 className="text-xl font-bold text-cyan">BAGHEWALA DIGITAL TWIN REPORT</h2>
                <p className="text-sm text-muted mt-2">Well BW-07 | Baghewala Field, Rajasthan, India</p>
                <p className="text-xs text-muted mt-1">Generated: {new Date().toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-cyan mb-2">WELL SUMMARY</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted">Well Name:</span>
                      <span className="text-cyan">BW-07</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Field:</span>
                      <span className="text-cyan">Baghewala</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Depth:</span>
                      <span className="text-cyan">1500 m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Status:</span>
                      <span className="text-green">PRODUCING</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-cyan mb-2">RESERVOIR CONDITION</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted">Temperature:</span>
                      <span className="text-cyan">55.0°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Pressure:</span>
                      <span className="text-cyan">300 kPa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Viscosity:</span>
                      <span className="text-cyan">1200 cP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Mobility:</span>
                      <span className="text-cyan">0.42 mD/cP</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-cyan mb-2">CSS PERFORMANCE</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted">Current Cycle:</span>
                      <span className="text-cyan">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Steam Volume:</span>
                      <span className="text-cyan">500 t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">SOR:</span>
                      <span className="text-cyan">3.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Cycle Production:</span>
                      <span className="text-cyan">150 m³</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-cyan mb-2">SRP PERFORMANCE</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted">SPM:</span>
                      <span className="text-cyan">5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Rod Load:</span>
                      <span className="text-cyan">30.0 kN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Pump Efficiency:</span>
                      <span className="text-cyan">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Vibration:</span>
                      <span className="text-cyan">0.5 mm/s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-cyan/20 pt-4">
                <p className="text-xs text-muted text-center">
                  DEMONSTRATION / SIMULATION DATA - Not for operational use
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
          {/* Recent Reports */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">RECENT REPORTS</h3>
            <div className="space-y-2">
              {[
                { name: 'Digital Twin Report', date: '2024-01-20', type: 'PDF' },
                { name: 'CSS Performance', date: '2024-01-15', type: 'PDF' },
                { name: 'SRP Analysis', date: '2024-01-10', type: 'CSV' },
                { name: 'Alert Summary', date: '2024-01-05', type: 'PDF' },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between text-xs p-2 bg-panel-secondary rounded">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-3 h-3 text-cyan" />
                    <span className="text-cyan">{report.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted">{report.date}</span>
                    <span className="text-muted">{report.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Templates */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">REPORT TEMPLATES</h3>
            <div className="space-y-2">
              {[
                'Daily Operations Report',
                'Weekly Performance Summary',
                'Monthly CSS Analysis',
                'Quarterly Optimization Review',
                'Annual Well Performance',
              ].map((template, index) => (
                <button
                  key={index}
                  className="w-full py-2 px-3 bg-panel-secondary hover:bg-cyan/10 border border-cyan/20 rounded-lg text-cyan text-sm text-left transition-colors"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          {/* Scheduled Reports */}
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-sm font-bold text-cyan mb-4">SCHEDULED REPORTS</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Daily Report</span>
                <span className="text-xs font-bold text-green">● Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Weekly Summary</span>
                <span className="text-xs font-bold text-green">● Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Monthly Analysis</span>
                <span className="text-xs font-bold text-green">● Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
