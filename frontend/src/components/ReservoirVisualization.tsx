import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Text } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function ReservoirBlock({ position, color, scale }: { position: [number, number, number], color: string, scale: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

function ThermalFront({ radius, temperature }: { radius: number, temperature: number }) {
  const getColor = (temp: number) => {
    if (temp > 80) return '#FF3B30';
    if (temp > 60) return '#FFB020';
    if (temp > 50) return '#FFFF00';
    if (temp > 45) return '#36F59A';
    return '#00C8FF';
  };

  return (
    <mesh position={[0, -4, 0]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={getColor(temperature)} 
        transparent 
        opacity={0.3}
        emissive={getColor(temperature)}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function WellTrajectory() {
  const points = [];
  for (let i = 0; i <= 10; i++) {
    points.push(new THREE.Vector3(0, -i, 0));
  }

  return (
    <Line
      points={points}
      color="#00C8FF"
      lineWidth={2}
    />
  );
}

export default function ReservoirVisualization() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF3B30" />

        <Grid args={[20, 20]} cellSize={1} cellThickness={0.5} cellColor="#1a3a5c" sectionSize={5} sectionThickness={1} sectionColor="#00C8FF" fadeDistance={30} fadeStrength={1} followCamera={false} infiniteGrid />

        {/* Surface layer */}
        <ReservoirBlock position={[0, -0.5, 0]} color="#2a5a8c" scale={[20, 0.5, 20]} />

        {/* Overburden */}
        <ReservoirBlock position={[0, -2, 0]} color="#1a3a5c" scale={[20, 2, 20]} />

        {/* Reservoir layer */}
        <ReservoirBlock position={[0, -4, 0]} color="#1a3a5c" scale={[20, 2, 20]} />

        {/* Production zone */}
        <ReservoirBlock position={[0, -5, 0]} color="#FFB020" scale={[6, 1, 6]} />

        {/* Underburden */}
        <ReservoirBlock position={[0, -7, 0]} color="#1a3a5c" scale={[20, 2, 20]} />

        {/* Thermal front */}
        <ThermalFront radius={4} temperature={55} />

        {/* Well trajectory */}
        <WellTrajectory />

        {/* Perforation zone indicator */}
        <mesh position={[0, -5, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#36F59A" emissive="#36F59A" emissiveIntensity={0.5} />
        </mesh>

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>

      <div className="absolute top-4 left-4 glass-panel rounded-lg p-3">
        <p className="text-xs text-muted mb-2">LEGEND</p>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-[#2a5a8c]" />
            <span className="text-xs text-muted">Rock Layers</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-[#FFB020]" />
            <span className="text-xs text-muted">Production Zone</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-[#36F59A]" />
            <span className="text-xs text-muted">Perforation Zone</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-[#00C8FF]" />
            <span className="text-xs text-muted">Well Trajectory</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 glass-panel rounded-lg p-3">
        <p className="text-xs text-muted">THERMAL FRONT</p>
        <p className="text-xs text-cyan mt-1">Steam-affected region</p>
      </div>
    </div>
  );
}
