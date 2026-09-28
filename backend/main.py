from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
import json
import asyncio
from datetime import datetime

try:
    import numpy as np
    NUMPY_AVAILABLE = True
except ImportError:
    NUMPY_AVAILABLE = False
    print("NumPy not available - using fallback calculations")
    
    import math
    
    class NumpyFallback:
        @staticmethod
        def mean(data):
            return sum(data) / len(data) if data else 0.0
        
        @staticmethod
        def var(data):
            if not data:
                return 0.0
            m = NumpyFallback.mean(data)
            return sum((x - m) ** 2 for x in data) / len(data)
        
        @staticmethod
        def exp(x):
            return math.exp(x)
        
        @staticmethod
        def sin(x):
            return math.sin(x)
        
        @staticmethod
        def sqrt(x):
            return math.sqrt(x)
        
        @staticmethod
        def pi():
            return math.pi
    
    np = NumpyFallback

try:
    from .database import engine, get_db, Base
    from .models import *
    DATABASE_AVAILABLE = True
except ImportError:
    DATABASE_AVAILABLE = False
    print("Database not available - running in demo mode")

# Mock Session for demo mode
if not DATABASE_AVAILABLE:
    class Session:
        pass
from .physics.thermal_model import ThermalModel
from .physics.viscosity_model import ViscosityModel
from .physics.wellbore_model import WellboreModel
from .physics.rod_dynamics import RodDynamicsModel
from .physics.dynamometer_model import DynamometerModel
from .physics.rod_float_detector import RodFloatDetector
from .physics.surface_model import SurfaceModel

# Create database tables if available
if DATABASE_AVAILABLE:
    Base.metadata.create_all(bind=engine)

app = FastAPI(title="Baghewala Digital Twin API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Digital Twin State
class DigitalTwinState:
    def __init__(self):
        self.well = {
            "id": 1,
            "name": "BW-07",
            "field": "Baghewala",
            "location": "Rajasthan, India",
            "depth": 1500.0,
            "reservoir_depth": 1350.0,
            "api_gravity": 18.0,
            "status": "PRODUCING"
        }
        
        # Initialize physics models
        self.thermal_model = ThermalModel({
            'initial_temperature': 45.0,
            'steam_temperature': 250.0,
            'porosity': 0.25,
            'permeability': 500.0,
            'thermal_conductivity': 2.0,
            'heat_capacity': 2000.0,
            'thermal_radius': 10.0,
            'thermal_decline_rate': 0.1
        })
        
        self.viscosity_model = ViscosityModel({
            'base_viscosity': 1000.0,
            'reference_temperature': 20.0,
            'activation_energy': 15000.0,
            'rheology_model': 'power_law',
            'consistency_index': 500.0,
            'flow_behavior_index': 0.8
        })
        
        self.wellbore_model = WellboreModel({
            'depth': 1500.0,
            'casing_depth': 1400.0,
            'tubing_depth': 1450.0,
            'pump_depth': 1300.0,
            'perforation_depth': 1350.0,
            'tubing_diameter': 0.076,
            'casing_diameter': 0.178,
            'rod_diameter': 0.025
        })
        
        self.rod_dynamics_model = RodDynamicsModel({
            'rod_length': 1300.0,
            'rod_diameter': 0.025,
            'rod_density': 7850.0,
            'youngs_modulus': 2.1e11,
            'damping_coefficient': 0.5
        })
        
        self.dynamometer_model = DynamometerModel({
            'stroke_length': 2.5,
            'max_load': 50.0,
            'min_load': 10.0,
            'spm': 5.0
        })
        
        self.rod_float_detector = RodFloatDetector({
            'velocity_threshold': 0.5,
            'load_threshold': 15.0,
            'vibration_threshold': 2.0
        })
        
        self.surface_model = SurfaceModel({
            'motor_power': 50.0,
            'motor_efficiency': 0.90,
            'gearbox_ratio': 30.0,
            'vfd_efficiency': 0.95
        })
        
        # Current operating state
        self.current_spm = 5.0
        self.current_scenario = "normal"
        self.timestamp = datetime.utcnow()
        
        # Update models
        self.update_state()

    def update_state(self):
        """Update all models based on current state"""
        # Update thermal model
        thermal_state = self.thermal_model.get_thermal_state()
        
        # Update viscosity model
        viscosity_state = self.viscosity_model.get_viscosity_state(
            thermal_state['current_temperature']
        )
        
        # Update wellbore model
        self.wellbore_model.update_temperature_profile(
            thermal_state['current_temperature']
        )
        self.wellbore_model.update_viscosity_profile(
            self.wellbore_model.temperature_profile,
            self.viscosity_model
        )
        
        # Update rod dynamics
        surface_displacement = self.rod_dynamics_model.calculate_surface_displacement(
            self.current_spm, 2.5, 0.0
        )
        self.rod_dynamics_model.solve_wave_equation(
            surface_displacement, 0.0, 500.0
        )
        
        # Update dynamometer
        dynamometer_state = self.dynamometer_model.get_dynamometer_state(
            self.current_scenario
        )
        
        # Update surface model
        rod_dynamics_state = self.rod_dynamics_model.get_rod_dynamics_state()
        surface_state = self.surface_model.get_surface_state(
            np.mean(rod_dynamics_state['load_profile']),
            15.0,
            np.var(dynamometer_state['load']),
            dynamometer_state['classification']['rod_float_probability']
        )
        
        # Store states
        self.thermal_state = thermal_state
        self.viscosity_state = viscosity_state
        self.wellbore_state = self.wellbore_model.get_wellbore_state()
        self.rod_dynamics_state = rod_dynamics_state
        self.dynamometer_state = dynamometer_state
        self.surface_state = surface_state
        
        self.timestamp = datetime.utcnow()

    def set_scenario(self, scenario: str):
        """Set operating scenario"""
        self.current_scenario = scenario
        
        if scenario == "normal":
            self.thermal_model.current_temperature = 55.0
            self.current_spm = 5.0
        elif scenario == "cooling":
            self.thermal_model.current_temperature = 48.0
            self.current_spm = 5.0
        elif scenario == "high_viscosity":
            self.thermal_model.current_temperature = 42.0
            self.current_spm = 5.0
        elif scenario == "rod_float":
            self.thermal_model.current_temperature = 40.0
            self.current_spm = 5.0
        elif scenario == "impact_loading":
            self.thermal_model.current_temperature = 45.0
            self.current_spm = 6.0
        elif scenario == "optimized":
            self.thermal_model.current_temperature = 52.0
            self.current_spm = 3.5
        
        self.update_state()

# Global state
digital_twin = DigitalTwinState()

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

# API Endpoints
@app.get("/")
async def root():
    return {
        "message": "Baghewala Digital Twin API",
        "version": "1.0.0",
        "status": "online"
    }

@app.get("/api/well")
async def get_well():
    return digital_twin.well

@app.get("/api/telemetry")
async def get_telemetry():
    digital_twin.update_state()
    
    pressure_profile = digital_twin.wellbore_state['pressure_profile']
    load_profile = digital_twin.rod_dynamics_state['load_profile']
    
    if NUMPY_AVAILABLE:
        pressure = np.mean(pressure_profile)
        rod_load = np.mean(load_profile)
    else:
        pressure = sum(pressure_profile) / len(pressure_profile) if pressure_profile else 300.0
        rod_load = sum(load_profile) / len(load_profile) if load_profile else 30.0
    
    return {
        "timestamp": digital_twin.timestamp.isoformat(),
        "temperature": digital_twin.thermal_state['current_temperature'],
        "pressure": pressure,
        "flow_rate": 15.0,
        "spm": digital_twin.current_spm,
        "rod_load": rod_load,
        "surface_vibration": digital_twin.surface_state['surface_vibration'],
        "motor_load": digital_twin.surface_state['power_consumption'],
        "vfd_frequency": digital_twin.surface_state['vfd_frequency'],
        "pump_efficiency": digital_twin.surface_state['pump_efficiency'],
        "production_rate": 15.0,
        "energy_consumption": digital_twin.surface_state['power_consumption']
    }

@app.get("/api/reservoir/state")
async def get_reservoir_state():
    digital_twin.update_state()
    return digital_twin.thermal_state

@app.get("/api/wellbore/state")
async def get_wellbore_state():
    digital_twin.update_state()
    return digital_twin.wellbore_state

@app.get("/api/srp/state")
async def get_srp_state():
    digital_twin.update_state()
    return {
        "spm": digital_twin.current_spm,
        "stroke_length": 2.5,
        "rod_load": np.mean(digital_twin.rod_dynamics_state['load_profile']),
        "surface_vibration": digital_twin.surface_state['surface_vibration'],
        "pump_efficiency": digital_twin.surface_state['pump_efficiency'],
        "downhole_pressure": np.mean(digital_twin.wellbore_state['pressure_profile']),
        "displacement": digital_twin.rod_dynamics_state['displacement_profile'],
        "velocity": digital_twin.rod_dynamics_state['velocity_profile'],
        "status": "operating"
    }

@app.get("/api/css/state")
async def get_css_state():
    return {
        "cycle_number": 5,
        "injection_start": "2024-01-15T00:00:00",
        "injection_end": "2024-01-20T00:00:00",
        "soak_start": "2024-01-20T00:00:00",
        "soak_end": "2024-01-25T00:00:00",
        "production_start": "2024-01-25T00:00:00",
        "production_end": None,
        "steam_volume": 500.0,
        "steam_injection_rate": 100.0,
        "injection_pressure": 8.0,
        "target_temperature": 180.0,
        "production_cutoff": 5.0,
        "steam_oil_ratio": 3.5,
        "cycle_production": 150.0,
        "status": "production"
    }

@app.get("/api/ai/insights")
async def get_ai_insights():
    digital_twin.update_state()
    
    # Generate AI recommendation based on current state
    temp = digital_twin.thermal_state['current_temperature']
    viscosity = digital_twin.viscosity_state['current_viscosity']
    rod_float_prob = digital_twin.dynamometer_state['classification']['rod_float_probability']
    impact_risk = digital_twin.dynamometer_state['classification']['impact_loading_risk']
    
    condition = "normal"
    recommended_spm = digital_twin.current_spm
    reasoning = []
    
    if temp < 45.0:
        condition = "increasing_viscosity"
        reasoning.append("Reservoir temperature declined")
        reasoning.append("Predicted oil viscosity increased")
        recommended_spm = 3.5
    
    if rod_float_prob > 0.5:
        condition = "rod_float_risk"
        reasoning.append("Rod float probability elevated")
        reasoning.append("Fluid resistance increased")
        recommended_spm = 3.0
    
    if impact_risk > 0.5:
        condition = "impact_loading_risk"
        reasoning.append("Impact loading risk elevated")
        reasoning.append("Mechanical stress high")
        recommended_spm = 3.5
    
    if viscosity > 2000.0:
        reasoning.append("High viscosity detected")
        recommended_spm = min(recommended_spm, 3.0)
    
    return {
        "condition": condition,
        "rod_float_probability": rod_float_prob,
        "impact_loading_risk": impact_risk,
        "recommended_spm": recommended_spm,
        "recommended_vfd_frequency": digital_twin.surface_model.calculate_frequency_from_spm(recommended_spm),
        "confidence": 0.85,
        "reasoning": reasoning,
        "physics_evidence": {
            "temperature": temp,
            "viscosity": viscosity,
            "fluid_resistance": viscosity / 1000.0,
            "rod_dynamics": "elevated_stress",
            "rod_float": rod_float_prob,
            "impact_load": impact_risk,
            "failure_risk": "moderate" if rod_float_prob < 0.7 else "high"
        }
    }

@app.post("/api/simulation/run")
async def run_simulation(parameters: Dict):
    # Clone current state
    original_spm = digital_twin.current_spm
    original_scenario = digital_twin.current_scenario
    
    # Apply simulation parameters
    if 'spm' in parameters:
        digital_twin.current_spm = parameters['spm']
    
    # Update state
    digital_twin.update_state()
    
    # Get results
    results = {
        "baseline": {
            "spm": original_spm,
            "rod_load": np.mean(digital_twin.rod_dynamics_state['load_profile']),
            "vibration": digital_twin.surface_state['surface_vibration'],
            "rod_float_risk": digital_twin.dynamometer_state['classification']['rod_float_probability'],
            "impact_loading_risk": digital_twin.dynamometer_state['classification']['impact_loading_risk'],
            "energy": digital_twin.surface_state['power_consumption']
        },
        "simulated": {
            "spm": digital_twin.current_spm,
            "rod_load": np.mean(digital_twin.rod_dynamics_state['load_profile']),
            "vibration": digital_twin.surface_state['surface_vibration'],
            "rod_float_risk": digital_twin.dynamometer_state['classification']['rod_float_probability'],
            "impact_loading_risk": digital_twin.dynamometer_state['classification']['impact_loading_risk'],
            "energy": digital_twin.surface_state['power_consumption']
        },
        "improvement": {
            "rod_load_reduction": 0.0,
            "vibration_reduction": 0.0,
            "rod_float_risk_reduction": 0.0,
            "energy_savings": 0.0
        }
    }
    
    # Restore original state
    digital_twin.current_spm = original_spm
    digital_twin.current_scenario = original_scenario
    digital_twin.update_state()
    
    return results

@app.post("/api/optimization/run")
async def run_optimization(parameters: Dict):
    # Multi-objective optimization
    objectives = parameters.get('objectives', {
        'maximize_production': True,
        'minimize_energy': True,
        'minimize_rod_float_risk': True
    })
    
    # Evaluate different SPM scenarios
    scenarios = [5.0, 4.5, 4.0, 3.5, 3.0]
    results = []
    
    for spm in scenarios:
        digital_twin.current_spm = spm
        digital_twin.update_state()
        
        results.append({
            "spm": spm,
            "production": 15.0 * (spm / 5.0),
            "energy": digital_twin.surface_state['power_consumption'],
            "rod_float_risk": digital_twin.dynamometer_state['classification']['rod_float_probability'],
            "impact_loading_risk": digital_twin.dynamometer_state['classification']['impact_loading_risk'],
            "vibration": digital_twin.surface_state['surface_vibration']
        })
    
    # Select best scenario
    best_scenario = min(results, key=lambda x: (
        x['energy'] if objectives.get('minimize_energy') else 0 +
        x['rod_float_risk'] * 10 if objectives.get('minimize_rod_float_risk') else 0
    ))
    
    # Restore original state
    digital_twin.current_spm = 5.0
    digital_twin.update_state()
    
    return {
        "current_state": results[0],
        "optimized_state": best_scenario,
        "all_scenarios": results,
        "recommendation": {
            "spm": best_scenario['spm'],
            "vfd_frequency": digital_twin.surface_model.calculate_frequency_from_spm(best_scenario['spm']),
            "expected_improvement": {
                "energy_savings": (results[0]['energy'] - best_scenario['energy']) / results[0]['energy'] * 100,
                "rod_float_risk_reduction": (results[0]['rod_float_risk'] - best_scenario['rod_float_risk']),
                "production_change": (best_scenario['production'] - results[0]['production']) / results[0]['production'] * 100
            }
        }
    }

@app.post("/api/vfd/simulate")
async def simulate_vfd(parameters: Dict):
    target_spm = parameters.get('target_spm', 3.5)
    
    # Update VFD
    result = digital_twin.surface_model.update_vfd(target_spm)
    digital_twin.current_spm = result['current_spm']
    digital_twin.update_state()
    
    return {
        "vfd_result": result,
        "telemetry": {
            "rod_load": np.mean(digital_twin.rod_dynamics_state['load_profile']),
            "vibration": digital_twin.surface_state['surface_vibration'],
            "power_consumption": digital_twin.surface_state['power_consumption']
        }
    }

@app.post("/api/scenario")
async def set_scenario(parameters: Dict):
    scenario = parameters.get('scenario', 'normal')
    digital_twin.set_scenario(scenario)
    return {
        "scenario": scenario,
        "state": "applied",
        "timestamp": digital_twin.timestamp.isoformat()
    }

@app.get("/api/alerts")
async def get_alerts():
    digital_twin.update_state()
    
    alerts = []
    rod_float_prob = digital_twin.dynamometer_state['classification']['rod_float_probability']
    impact_risk = digital_twin.dynamometer_state['classification']['impact_loading_risk']
    temp = digital_twin.thermal_state['current_temperature']
    
    if rod_float_prob > 0.7:
        alerts.append({
            "severity": "CRITICAL",
            "parameter": "rod_float",
            "value": rod_float_prob,
            "threshold": 0.7,
            "prediction": "ROD FLOAT DETECTED",
            "recommended_action": "REDUCE SPM IMMEDIATELY",
            "timestamp": digital_twin.timestamp.isoformat()
        })
    elif rod_float_prob > 0.5:
        alerts.append({
            "severity": "HIGH",
            "parameter": "rod_float",
            "value": rod_float_prob,
            "threshold": 0.5,
            "prediction": "ROD FLOAT PREDICTED",
            "recommended_action": "Consider reducing SPM",
            "timestamp": digital_twin.timestamp.isoformat()
        })
    
    if impact_risk > 0.6:
        alerts.append({
            "severity": "HIGH",
            "parameter": "impact_loading",
            "value": impact_risk,
            "threshold": 0.6,
            "prediction": "IMPACT LOADING PREDICTED",
            "recommended_action": "Reduce pump speed or check rod string",
            "timestamp": digital_twin.timestamp.isoformat()
        })
    
    if temp < 45.0:
        alerts.append({
            "severity": "HIGH",
            "parameter": "temperature",
            "value": temp,
            "threshold": 45.0,
            "prediction": "VISCOSITY INCREASING",
            "recommended_action": "Schedule steam injection or reduce pump speed",
            "timestamp": digital_twin.timestamp.isoformat()
        })
    elif temp < 50.0:
        alerts.append({
            "severity": "MEDIUM",
            "parameter": "temperature",
            "value": temp,
            "threshold": 50.0,
            "prediction": "RESERVOIR COOLING",
            "recommended_action": "Monitor temperature and viscosity",
            "timestamp": digital_twin.timestamp.isoformat()
        })
    
    return alerts

@app.get("/api/dynamometer")
async def get_dynamometer():
    digital_twin.update_state()
    return digital_twin.dynamometer_state

@app.websocket("/ws/digital-twin")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Update state
            digital_twin.update_state()
            
            # Send telemetry
            telemetry = {
                "timestamp": digital_twin.timestamp.isoformat(),
                "temperature": digital_twin.thermal_state['current_temperature'],
                "pressure": np.mean(digital_twin.wellbore_state['pressure_profile']),
                "flow_rate": 15.0,
                "spm": digital_twin.current_spm,
                "rod_load": np.mean(digital_twin.rod_dynamics_state['load_profile']),
                "surface_vibration": digital_twin.surface_state['surface_vibration'],
                "motor_load": digital_twin.surface_state['power_consumption'],
                "vfd_frequency": digital_twin.surface_state['vfd_frequency'],
                "pump_efficiency": digital_twin.surface_state['pump_efficiency'],
                "production_rate": 15.0,
                "energy_consumption": digital_twin.surface_state['power_consumption']
            }
            
            await websocket.send_json(telemetry)
            await asyncio.sleep(2)  # Send every 2 seconds
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
