# Baghewala Digital Twin

**AI-Powered Well-to-Surface Optimization Platform for Heavy Oil Wells**

A complete digital twin prototype for Oil India Limited's Baghewala Field, demonstrating the integration of reservoir thermal behavior, wellbore mechanics, and surface artificial-lift optimization for Cyclic Steam Stimulation (CSS) and Sucker Rod Pump (SRP) operations.

## 🎯 Project Overview

This platform implements a comprehensive digital twin that connects:
- **Reservoir Module**: Thermal modeling and viscosity prediction
- **Wellbore Module**: Fluid flow and heat transfer simulation
- **Surface Module**: Pumpjack and VFD control
- **AI/ML Layer**: Physics-informed neural networks for prediction and optimization
- **CSS Optimization**: Steam injection and production cycle management
- **SRP Optimization**: Rod dynamics and pump efficiency optimization

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **Physics Models**: Thermal, viscosity, wellbore, rod dynamics, surface models
- **AI/ML**: Prediction engine, optimization engine, recommendation system
- **API**: RESTful endpoints and WebSocket for real-time telemetry
- **Database**: PostgreSQL schema for wells, telemetry, CSS cycles, alerts

### Frontend (React/TypeScript)
- **3D Visualizations**: Three.js for wellbore, reservoir, and pumpjack
- **Real-time Charts**: Recharts for telemetry data
- **State Management**: Zustand for digital twin state
- **Routing**: React Router for 15 application pages

## 📁 Project Structure

```
devin-SIH-120/
├── backend/
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── models/        # Database models
│   │   ├── physics/       # Physics simulation models
│   │   ├── schemas/       # Pydantic schemas
│   │   └── database/      # Database configuration
│   ├── main.py            # FastAPI application
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Application pages
│   │   ├── services/      # API and WebSocket services
│   │   ├── store/         # State management
│   │   ├── types/         # TypeScript types
│   │   └── main.tsx       # Application entry
│   ├── package.json       # Node dependencies
│   └── vite.config.ts     # Vite configuration
└── README.md
```

## 🚀 Installation

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL 13+

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/baghewala_digital_twin"
```

5. Run the FastAPI server:
```bash
python main.py
```

The backend will start on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🎨 Application Pages

1. **Overview**: Main command center with 3D digital twin visualization
2. **Live Data**: Real-time telemetry streaming with charts
3. **Reservoir**: Subsurface thermal and viscosity analysis
4. **Wellbore**: Interactive wellbore mechanics and fluid dynamics
5. **AI Insights**: Physics-informed AI analysis and recommendations
6. **Simulation**: What-if scenario testing laboratory
7. **Pump Control**: Surface SRP and VFD control interface
8. **CSS Control**: Cyclic Steam Stimulation optimization
9. **Optimization**: Multi-objective optimization center
10. **Alerts**: Industrial alert management system
11. **History**: Historical analytics and trend analysis
12. **Reports**: Engineering report generation
13. **Settings**: System configuration and preferences

## 🔬 Demo Scenarios

The system includes pre-configured scenarios to demonstrate different operating states:

- **Normal Production**: Optimal operating conditions
- **Reservoir Cooling**: Temperature decline and viscosity increase
- **High Viscosity**: Elevated fluid resistance
- **Rod Float**: Mechanical instability risk
- **Impact Loading**: High stress conditions
- **Optimized Operation**: AI-recommended settings

## 🎯 Key Features

### Physics Simulation
- **Thermal Model**: Bober-Lantz framework for CSS operations
- **Viscosity Model**: Temperature-dependent with configurable rheology
- **Wellbore Model**: Heat transfer and fluid flow simulation
- **Rod Dynamics**: Gibbs wave equation for sucker-rod motion
- **Dynamometer Classification**: Rod float and impact loading detection

### AI/ML Capabilities
- **Physics-Informed Neural Networks**: PINN architecture
- **Multi-objective Optimization**: Production vs energy vs risk
- **Explainable AI**: Physics evidence chain for recommendations
- **Real-time Prediction**: Temperature, viscosity, rod float risk

### Visualization
- **3D Wellbore**: Interactive depth inspection
- **Reservoir Cross-section**: Thermal front visualization
- **Pumpjack Animation**: State-driven motion
- **Real-time Charts**: Streaming telemetry data
- **Dynamometer Cards**: Load vs position analysis

## ⚠️ Disclaimer

**This is a demonstration/simulation prototype.**

- All numerical values are demonstration/simulation data unless explicitly stated
- The system is not connected to actual Oil India Limited production control systems
- No real VFD commands or SCADA writes are performed
- All controls are simulated for demonstration purposes
- Models require field calibration for operational use

## 🔒 Security

- Role-based access control (Engineer/Viewer)
- Audit trail for all recommendations and actions
- No real industrial control connections
- Simulated VFD and equipment control

## 📊 Key Performance Indicators

- Production Rate
- Steam-Oil Ratio (SOR)
- Energy per Barrel
- Rod Float Risk
- Impact Loading Risk
- Pump Efficiency
- Mechanical Stress
- Equipment Downtime

## 🤝 Contributing

This is a demonstration prototype for the SIH hackathon. For production deployment, the following would be required:

- Field calibration of physics models
- Integration with real SCADA systems
- Training of ML models on historical data
- Security hardening and authentication
- Regulatory compliance and safety systems

## 📄 License

This is a demonstration project for educational purposes.

## 🙏 Acknowledgments

- Oil India Limited for the problem statement and research
- SIH 2024 for the opportunity to build this solution
- The research team for the technical foundation

---

**Built with ❤️ for the Smart India Hackathon 2026**
