import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDigitalTwinStore } from './store/digitalTwinStore';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import LiveData from './pages/LiveData';
import Reservoir from './pages/Reservoir';
import Wellbore from './pages/Wellbore';
import AIInsights from './pages/AIInsights';
import Simulation from './pages/Simulation';
import PumpControl from './pages/PumpControl';
import CSSControl from './pages/CSSControl';
import Optimization from './pages/Optimization';
import Alerts from './pages/Alerts';
import History from './pages/History';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { apiService } from './services/api';
import { websocketService } from './services/websocket';

function AppContent() {
  const location = useLocation();
  const {
    setTelemetry,
    setReservoir,
    setWellbore,
    setSRP,
    setDynamometer,
    setAI,
    setAlerts,
    setConnected,
    setLoading,
  } = useDigitalTwinStore();

  useEffect(() => {
    // Initial data load
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        const [telemetry, reservoir, wellbore, srp, dynamometer, ai, alerts] = await Promise.all([
          apiService.getTelemetry(),
          apiService.getReservoirState(),
          apiService.getWellboreState(),
          apiService.getSRPState(),
          apiService.getDynamometer(),
          apiService.getAIInsights(),
          apiService.getAlerts(),
        ]);

        setTelemetry(telemetry);
        setReservoir(reservoir);
        setWellbore(wellbore);
        setSRP(srp);
        setDynamometer(dynamometer);
        setAI(ai);
        setAlerts(alerts);
        setConnected(true);
        setLoading(false);
      } catch (error) {
        console.error('Error loading initial data:', error);
        setLoading(false);
      }
    };

    loadInitialData();

    // Connect to WebSocket for real-time updates
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/digital-twin';
    websocketService.connect(wsUrl);

    websocketService.onMessage((data) => {
      setTelemetry(data);
    });

    return () => {
      websocketService.disconnect();
    };
  }, [setTelemetry, setReservoir, setWellbore, setSRP, setDynamometer, setAI, setAlerts, setConnected, setLoading]);

  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-background grid-bg">
      {!isLoginPage && <Sidebar />}
      <div className={`flex flex-col ${!isLoginPage ? 'ml-20' : ''}`}>
        {!isLoginPage && <Header />}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/live-data" element={<LiveData />} />
            <Route path="/reservoir" element={<Reservoir />} />
            <Route path="/wellbore" element={<Wellbore />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/pump-control" element={<PumpControl />} />
            <Route path="/css-control" element={<CSSControl />} />
            <Route path="/optimization" element={<Optimization />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/history" element={<History />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
