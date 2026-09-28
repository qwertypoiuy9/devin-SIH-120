"""
DIGITAL TWIN DEMONSTRATION MODEL
Rod Dynamics Model based on Gibbs wave equation
This is a demonstration model for prototype purposes
"""

try:
    import numpy as np
except ImportError:
    import math
    class np:
        @staticmethod
        def linspace(start, stop, num):
            return [start + (stop - start) * i / (num - 1) for i in range(num)]
        
        @staticmethod
        def zeros(shape):
            if isinstance(shape, int):
                return [0.0] * shape
            return [[0.0 for _ in range(shape[1])] for _ in range(shape[0])]
        
        @staticmethod
        def mean(data):
            return sum(data) / len(data) if data else 0.0
        
        @staticmethod
        def var(data):
            if not data:
                return 0.0
            m = np.mean(data)
            return sum((x - m) ** 2 for x in data) / len(data)
        
        @staticmethod
        def max(data):
            return max(data) if data else 0.0

from typing import Dict, List, Tuple

class RodDynamicsModel:
    """
    Simulates sucker rod dynamics using 1D damped wave equation
    Based on Gibbs method for sucker-rod pumping
    """

    def __init__(self, rod_params: Dict):
        self.rod_length = rod_params.get('rod_length', 1300.0)  # m
        self.rod_diameter = rod_params.get('rod_diameter', 0.025)  # m
        self.rod_density = rod_params.get('rod_density', 7850.0)  # kg/m³
        self.youngs_modulus = rod_params.get('youngs_modulus', 2.1e11)  # Pa
        self.damping_coefficient = rod_params.get('damping_coefficient', 0.5)
        
        # Wave equation parameters
        self.wave_speed = np.sqrt(self.youngs_modulus / self.rod_density)
        self.rod_area = np.pi * (self.rod_diameter / 2)**2
        self.rod_mass_per_length = self.rod_density * self.rod_area
        
        # Discretize rod
        self.num_segments = 50
        self.segment_length = self.rod_length / self.num_segments
        self.depths = np.linspace(0, self.rod_length, self.num_segments)
        
        # Initialize state
        self.displacement = np.zeros(self.num_segments)
        self.velocity = np.zeros(self.num_segments)
        self.load = np.zeros(self.num_segments)
        self.stress = np.zeros(self.num_segments)

    def calculate_surface_displacement(self, spm: float, stroke_length: float, time: float) -> float:
        """
        Calculate surface displacement based on SPM and stroke length
        """
        period = 60.0 / spm  # seconds per stroke
        phase = (time % period) / period
        
        # Simplified sinusoidal motion
        if phase < 0.5:
            # Downstroke
            displacement = stroke_length * np.sin(2 * np.pi * phase)
        else:
            # Upstroke
            displacement = stroke_length * np.sin(2 * np.pi * phase)
        
        return displacement

    def solve_wave_equation(self, surface_displacement: float, surface_velocity: float, 
                           fluid_resistance: float, time_step: float = 0.01) -> Tuple[np.ndarray, np.ndarray]:
        """
        Solve 1D damped wave equation for rod dynamics
        """
        # Finite difference solution
        dt = time_step
        dx = self.segment_length
        c = self.wave_speed
        alpha = (c * dt / dx)**2
        damping = self.damping_coefficient * dt
        
        # Previous displacement
        displacement_prev = self.displacement.copy()
        
        # Apply boundary condition at surface
        self.displacement[0] = surface_displacement
        self.velocity[0] = surface_velocity
        
        # Solve wave equation
        for i in range(1, self.num_segments - 1):
            # Wave equation with damping
            self.displacement[i] = 2 * self.displacement[i] - displacement_prev[i] + \
                                 alpha * (self.displacement[i+1] - 2*self.displacement[i] + self.displacement[i-1]) - \
                                 damping * self.velocity[i]
            
            # Add fluid resistance effect
            fluid_force = fluid_resistance * self.velocity[i]
            self.displacement[i] -= fluid_force * dt / self.rod_mass_per_length
            
            # Calculate velocity
            self.velocity[i] = (self.displacement[i] - displacement_prev[i]) / dt
        
        # Apply boundary condition at pump (simplified)
        self.displacement[-1] = self.displacement[-2] * 0.95
        
        # Calculate load and stress
        for i in range(self.num_segments):
            strain = (self.displacement[i] - self.displacement[i-1]) / dx if i > 0 else 0
            self.stress[i] = self.youngs_modulus * strain
            self.load[i] = self.stress[i] * self.rod_area + \
                          self.rod_mass_per_length * 9.81 * (self.rod_length - self.depths[i])
        
        return self.displacement, self.load

    def calculate_rod_float_probability(self, downstroke_velocity: float, fluid_resistance: float) -> float:
        """
        Calculate probability of rod float based on downstroke dynamics
        """
        # Critical velocity threshold
        critical_velocity = 0.5  # m/s
        
        # Resistance threshold
        critical_resistance = 1000.0  # Pa·s/m²
        
        # Calculate probability based on velocity and resistance
        velocity_factor = max(0, (critical_velocity - downstroke_velocity) / critical_velocity)
        resistance_factor = min(1, fluid_resistance / critical_resistance)
        
        probability = 0.3 + 0.7 * (velocity_factor * 0.6 + resistance_factor * 0.4)
        
        return min(1.0, probability)

    def calculate_impact_loading_risk(self, load_variance: float, max_load: float) -> float:
        """
        Calculate impact loading risk based on load dynamics
        """
        # Normalized load variance
        normalized_variance = load_variance / (max_load + 1e-6)
        
        # Risk increases with variance
        risk = 0.2 + 0.8 * min(1.0, normalized_variance * 2.0)
        
        return risk

    def get_rod_state(self, depth: float) -> Dict:
        """
        Get rod state at specific depth
        """
        segment_idx = int(depth / self.segment_length)
        segment_idx = min(segment_idx, self.num_segments - 1)
        
        return {
            'depth': depth,
            'displacement': self.displacement[segment_idx],
            'velocity': self.velocity[segment_idx],
            'load': self.load[segment_idx],
            'stress': self.stress[segment_idx]
        }

    def get_rod_dynamics_state(self) -> Dict:
        """
        Get complete rod dynamics state
        """
        return {
            'displacement_profile': self.displacement.tolist(),
            'velocity_profile': self.velocity.tolist(),
            'load_profile': self.load.tolist(),
            'stress_profile': self.stress.tolist(),
            'rod_float_probability': self.calculate_rod_float_probability(
                np.mean(self.velocity[self.velocity < 0]), 
                500.0  # Average fluid resistance
            ),
            'impact_loading_risk': self.calculate_impact_loading_risk(
                np.var(self.load),
                np.max(self.load)
            ),
            'model_type': 'PHYSICS SIMULATION ENGINE - DIGITAL TWIN DEMONSTRATION'
        }
