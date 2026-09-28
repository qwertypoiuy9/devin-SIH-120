"""
DIGITAL TWIN DEMONSTRATION MODEL
Dynamometer Card Model for rod load analysis
This is a demonstration model for prototype purposes
"""

try:
    import numpy as np
except ImportError:
    import math
    import random
    
    class np:
        @staticmethod
        def linspace(start, stop, num):
            return [start + (stop - start) * i / (num - 1) for i in range(num)]
        
        @staticmethod
        def sin(x):
            return math.sin(x)
        
        @staticmethod
        def normal(loc, scale):
            return random.gauss(loc, scale)
        
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
        def trapz(y, x):
            return sum((y[i] + y[i+1]) * (x[i+1] - x[i]) / 2 for i in range(len(y)-1))

from typing import Dict, Tuple, List
from enum import Enum

class DynamometerClassification(Enum):
    NORMAL = "normal"
    WARNING = "warning"
    ROD_FLOAT = "rod_float"
    SEVERE_ROD_FLOAT = "severe_rod_float"
    IMPACT_LOADING = "impact_loading"
    PUMP_OFF = "pump_off"
    GAS_LOCK = "gas_lock"

class DynamometerModel:
    """
    Generates and classifies dynamometer cards
    """

    def __init__(self, params: Dict):
        self.stroke_length = params.get('stroke_length', 2.5)  # m
        self.max_load = params.get('max_load', 50.0)  # kN
        self.min_load = params.get('min_load', 10.0)  # kN
        self.spm = params.get('spm', 5.0)  # strokes per minute

    def generate_dynamometer_card(self, operating_state: str) -> Tuple[List[float], List[float]]:
        """
        Generate dynamometer card (position vs load) based on operating state
        """
        num_points = 100
        position = np.linspace(0, self.stroke_length, num_points)
        load = np.zeros(num_points)
        
        if operating_state == "normal":
            # Normal card - smooth sinusoidal pattern
            for i, pos in enumerate(position):
                phase = pos / self.stroke_length
                if phase < 0.5:
                    # Upstroke - increasing load
                    load[i] = self.min_load + (self.max_load - self.min_load) * np.sin(phase * np.pi)
                else:
                    # Downstroke - decreasing load
                    load[i] = self.max_load - (self.max_load - self.min_load) * np.sin((phase - 0.5) * np.pi)
        
        elif operating_state == "rod_float":
            # Rod float - flattened downstroke
            for i, pos in enumerate(position):
                phase = pos / self.stroke_length
                if phase < 0.5:
                    load[i] = self.min_load + (self.max_load - self.min_load) * np.sin(phase * np.pi)
                else:
                    # Flattened downstroke with irregular pattern
                    load[i] = self.max_load * 0.6 + np.random.normal(0, 2.0)
        
        elif operating_state == "impact_loading":
            # Impact loading - sharp peaks
            for i, pos in enumerate(position):
                phase = pos / self.stroke_length
                if phase < 0.5:
                    load[i] = self.min_load + (self.max_load - self.min_load) * np.sin(phase * np.pi)
                else:
                    # Sharp peaks on downstroke
                    if 0.6 < phase < 0.7:
                        load[i] = self.max_load * 1.2 + np.random.normal(0, 3.0)
                    else:
                        load[i] = self.max_load * 0.5 + np.random.normal(0, 2.0)
        
        elif operating_state == "pump_off":
            # Pump off - reduced load area
            for i, pos in enumerate(position):
                phase = pos / self.stroke_length
                load[i] = self.min_load + (self.max_load * 0.4 - self.min_load) * np.sin(phase * np.pi)
        
        else:
            # Default to normal
            for i, pos in enumerate(position):
                phase = pos / self.stroke_length
                load[i] = self.min_load + (self.max_load - self.min_load) * np.sin(phase * np.pi)
        
        # Add some noise
        load += np.random.normal(0, 0.5, num_points)
        
        return position.tolist(), load.tolist()

    def classify_dynamometer_card(self, position: List[float], load: List[float]) -> Dict:
        """
        Classify dynamometer card using simulated CNN-style classification
        """
        position = np.array(position)
        load = np.array(load)
        
        # Calculate features
        load_range = np.max(load) - np.min(load)
        load_std = np.std(load)
        load_area = np.trapz(load, position)
        
        # Calculate asymmetry
        mid_point = len(position) // 2
        upstroke_load = np.mean(load[:mid_point])
        downstroke_load = np.mean(load[mid_point:])
        asymmetry = abs(upstroke_load - downstroke_load) / (upstroke_load + downstroke_load + 1e-6)
        
        # Calculate flatness (indicator of rod float)
        downstroke_variance = np.var(load[mid_point:])
        flatness = 1.0 / (downstroke_variance + 1e-6)
        
        # Classification logic (simulated CNN)
        classification = DynamometerClassification.NORMAL
        confidence = 0.85
        rod_float_probability = 0.1
        impact_loading_risk = 0.1
        
        if flatness > 0.5 and asymmetry > 0.3:
            classification = DynamometerClassification.ROD_FLOAT
            rod_float_probability = 0.87
            confidence = 0.82
        elif flatness > 0.8:
            classification = DynamometerClassification.SEVERE_ROD_FLOAT
            rod_float_probability = 0.95
            confidence = 0.88
        elif load_std > 5.0 and asymmetry > 0.4:
            classification = DynamometerClassification.IMPACT_LOADING
            impact_loading_risk = 0.75
            confidence = 0.80
        elif load_area < self.max_load * self.stroke_length * 0.4:
            classification = DynamometerClassification.PUMP_OFF
            confidence = 0.78
        elif asymmetry > 0.2:
            classification = DynamometerClassification.WARNING
            confidence = 0.75
        
        # Determine mechanical stress level
        max_stress = np.max(load)
        if max_stress > self.max_load * 1.1:
            mechanical_stress = "HIGH"
        elif max_stress > self.max_load * 0.9:
            mechanical_stress = "MODERATE"
        else:
            mechanical_stress = "NORMAL"
        
        return {
            'classification': classification.value,
            'confidence': confidence,
            'rod_float_probability': rod_float_probability,
            'impact_loading_risk': impact_loading_risk,
            'mechanical_stress': mechanical_stress,
            'features': {
                'load_range': load_range,
                'load_std': load_std,
                'load_area': load_area,
                'asymmetry': asymmetry,
                'flatness': flatness
            },
            'model_type': 'SIMULATED CLASSIFICATION'
        }

    def get_dynamometer_state(self, operating_state: str) -> Dict:
        """
        Get complete dynamometer state
        """
        position, load = self.generate_dynamometer_card(operating_state)
        classification = self.classify_dynamometer_card(position, load)
        
        return {
            'position': position,
            'load': load,
            'classification': classification,
            'operating_state': operating_state
        }
