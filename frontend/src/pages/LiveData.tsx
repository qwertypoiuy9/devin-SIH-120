import { useDigitalTwinStore } from '../store/digitalTwinStore';
import { useState, useEffect } from 'react';
import RealTimeChart from '../components/RealTimeChart';

export default function LiveData() {
  const { telemetry, isConnected } = useDigitalTwinStore();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = {
          timestamp: new Date().toISOString(),
          temperature: telemetry.temperature,
          pressure: telemetry.pressure,
          flow_rate: telemetry.flow_rate,
          spm: telemetry.spm,
          rod_load: telemetry.rod_load,
          surface_vibration: telemetry.surface_vibration,
          motor_load: telemetry.motor_load,
          vfd_frequency: telemetry.vfd_frequency,
        };
        return [...prev.slice(-59), newData]; // Keep last 60 data points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [telemetry]);

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-glow mb-2">REAL-TIME TELEMETRY</h2>
        <p className="text-muted">Live sensor data streaming</p>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green animate-pulse' : 'bg-critical'}`} />
          <span className="text-sm text-muted">
            SENSOR NETWORK {isConnected ? '● CONNECTED' : '● DISCONNECTED'}
          </span>
        </div>
        <div className="text-sm text-muted">24/24 SENSORS ONLINE</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <RealTimeChart
          title="Reservoir Temperature"
          data={chartData}
          dataKey="temperature"
          unit="°C"
          color="#00C8FF"
        />
        <RealTimeChart
          title="Wellbore Pressure"
          data={chartData}
          dataKey="pressure"
          unit="kPa"
          color="#36F59A"
        />
        <RealTimeChart
          title="Flow Rate"
          data={chartData}
          dataKey="flow_rate"
          unit="m³/d"
          color="#FFB020"
        />
        <RealTimeChart
          title="SPM"
          data={chartData}
          dataKey="spm"
          unit="spm"
          color="#19D9FF"
        />
        <RealTimeChart
          title="Rod Load"
          data={chartData}
          dataKey="rod_load"
          unit="kN"
          color="#FF3B30"
        />
        <RealTimeChart
          title="Surface Vibration"
          data={chartData}
          dataKey="surface_vibration"
          unit="mm/s"
          color="#FFB020"
        />
        <RealTimeChart
          title="Motor Load"
          data={chartData}
          dataKey="motor_load"
          unit="kW"
          color="#36F59A"
        />
        <RealTimeChart
          title="VFD Frequency"
          data={chartData}
          dataKey="vfd_frequency"
          unit="Hz"
          color="#00C8FF"
        />
        <RealTimeChart
          title="Steam Injection Rate"
          data={chartData}
          dataKey="steam_injection_rate"
          unit="t/d"
          color="#FF3B30"
        />
      </div>
    </div>
  );
}
