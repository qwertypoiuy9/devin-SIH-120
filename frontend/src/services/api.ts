import axios from 'axios';
import { Telemetry, ReservoirState, WellboreState, SRPState, DynamometerState, AIInsights, Alert, ScenarioType } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Well
  getWell: async () => {
    const response = await api.get('/api/well');
    return response.data;
  },

  // Telemetry
  getTelemetry: async (): Promise<Telemetry> => {
    const response = await api.get('/api/telemetry');
    return response.data;
  },

  // Reservoir
  getReservoirState: async (): Promise<ReservoirState> => {
    const response = await api.get('/api/reservoir/state');
    return response.data;
  },

  // Wellbore
  getWellboreState: async (): Promise<WellboreState> => {
    const response = await api.get('/api/wellbore/state');
    return response.data;
  },

  // SRP
  getSRPState: async (): Promise<SRPState> => {
    const response = await api.get('/api/srp/state');
    return response.data;
  },

  // CSS
  getCSSState: async () => {
    const response = await api.get('/api/css/state');
    return response.data;
  },

  // AI Insights
  getAIInsights: async (): Promise<AIInsights> => {
    const response = await api.get('/api/ai/insights');
    return response.data;
  },

  // Dynamometer
  getDynamometer: async (): Promise<DynamometerState> => {
    const response = await api.get('/api/dynamometer');
    return response.data;
  },

  // Simulation
  runSimulation: async (parameters: any) => {
    const response = await api.post('/api/simulation/run', parameters);
    return response.data;
  },

  // Optimization
  runOptimization: async (parameters: any) => {
    const response = await api.post('/api/optimization/run', parameters);
    return response.data;
  },

  // VFD
  simulateVFD: async (parameters: { target_spm: number }) => {
    const response = await api.post('/api/vfd/simulate', parameters);
    return response.data;
  },

  // Scenario
  setScenario: async (scenario: ScenarioType) => {
    const response = await api.post('/api/scenario', { scenario });
    return response.data;
  },

  // Alerts
  getAlerts: async (): Promise<Alert[]> => {
    const response = await api.get('/api/alerts');
    return response.data;
  },
};

export default apiService;
