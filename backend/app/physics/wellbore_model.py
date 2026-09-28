"""
DIGITAL TWIN DEMONSTRATION MODEL
Wellbore Model for fluid flow and heat transfer
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
        def pi():
            return math.pi

from typing import Dict, List, Tuple

class WellboreModel:
    """
    Simulates wellbore fluid flow, heat transfer, and pressure drop
    """

    def __init__(self, wellbore_params: Dict):
        self.depth = wellbore_params.get('depth', 1500.0)  # m
        self.casing_depth = wellbore_params.get('casing_depth', 1400.0)  # m
        self.tubing_depth = wellbore_params.get('tubing_depth', 1450.0)  # m
        self.pump_depth = wellbore_params.get('pump_depth', 1300.0)  # m
        self.perforation_depth = wellbore_params.get('perforation_depth', 1350.0)  # m
        self.tubing_diameter = wellbore_params.get('tubing_diameter', 0.076)  # m (3 inches)
        self.casing_diameter = wellbore_params.get('casing_diameter', 0.178)  # m (7 inches)
        self.rod_diameter = wellbore_params.get('rod_diameter', 0.025)  # m (1 inch)
        
        # Discretize wellbore
        self.num_segments = 100
        self.segment_length = self.depth / self.num_segments
        self.depths = np.linspace(0, self.depth, self.num_segments)
        
        # Initialize profiles
        self.temperature_profile = np.linspace(45.0, 60.0, self.num_segments)  # °C
        self.pressure_profile = np.linspace(100.0, 500.0, self.num_segments)  # kPa
        self.viscosity_profile = np.ones(self.num_segments) * 1000.0  # cP

    def update_temperature_profile(self, reservoir_temp: float, surface_temp: float = 25.0):
        """
        Update temperature profile based on reservoir and surface temperatures
        """
        # Linear gradient with thermal front influence
        gradient = (reservoir_temp - surface_temp) / self.depth
        self.temperature_profile = surface_temp + gradient * self.depths
        
        # Add thermal influence zone near perforations
        thermal_influence_zone = (self.depths > self.perforation_depth - 50) & \
                                (self.depths < self.perforation_depth + 50)
        self.temperature_profile[thermal_influence_zone] += (reservoir_temp - self.temperature_profile[thermal_influence_zone]) * 0.3

    def update_pressure_profile(self, flow_rate: float, viscosity: float):
        """
        Update pressure profile based on flow rate and viscosity
        """
        # Simplified pressure drop calculation
        friction_factor = 0.02
        pressure_drop = (friction_factor * self.depth * flow_rate * viscosity) / \
                       (self.tubing_diameter - self.rod_diameter)
        
        self.pressure_profile = np.linspace(100.0, 500.0 - pressure_drop, self.num_segments)

    def update_viscosity_profile(self, temperature_profile: np.ndarray, viscosity_model):
        """
        Update viscosity profile based on temperature
        """
        for i, temp in enumerate(temperature_profile):
            self.viscosity_profile[i] = viscosity_model.calculate_viscosity(temp)

    def calculate_flow_resistance(self, depth: float) -> float:
        """
        Calculate flow resistance at specific depth
        """
        segment_idx = int(depth / self.segment_length)
        segment_idx = min(segment_idx, self.num_segments - 1)
        
        viscosity = self.viscosity_profile[segment_idx]
        area = np.pi * ((self.tubing_diameter / 2)**2 - (self.rod_diameter / 2)**2)
        
        return viscosity / area

    def get_depth_parameters(self, depth: float) -> Dict:
        """
        Get parameters at specific depth
        """
        segment_idx = int(depth / self.segment_length)
        segment_idx = min(segment_idx, self.num_segments - 1)
        
        return {
            'depth': depth,
            'temperature': self.temperature_profile[segment_idx],
            'pressure': self.pressure_profile[segment_idx],
            'viscosity': self.viscosity_profile[segment_idx],
            'flow_resistance': self.calculate_flow_resistance(depth)
        }

    def get_wellbore_state(self) -> Dict:
        """
        Get complete wellbore state
        """
        return {
            'depth': self.depth,
            'casing_depth': self.casing_depth,
            'tubing_depth': self.tubing_depth,
            'pump_depth': self.pump_depth,
            'perforation_depth': self.perforation_depth,
            'temperature_profile': self.temperature_profile.tolist(),
            'pressure_profile': self.pressure_profile.tolist(),
            'viscosity_profile': self.viscosity_profile.tolist(),
            'model_type': 'DIGITAL TWIN DEMONSTRATION MODEL'
        }
