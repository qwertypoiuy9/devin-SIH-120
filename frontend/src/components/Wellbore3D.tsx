import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Line, Text } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface Wellbore3DProps {
  selectedDepth: number;
}

function Casing({ depth }: { depth: number }) {
  return (
    <mesh position={[0, -depth / 200, 0]}>
      <cylinderGeometry args={[0.8, 0.8, depth / 100, 32]} />
      <meshStandardMaterial color="#1a3a5c" transparent opacity={0.5} wireframe />
    </mesh>
  );
}

function Tubing({ depth }: { depth: number }) {
  return (
    <mesh position={[0, -depth / 200, 0]}>
      <cylinderGeometry args={[0.4, 0.4, depth / 100, 32]} />
      <meshStandardMaterial color="#2a5a8c" transparent opacity={0.7} />
    </mesh>
  );
}

function SuckerRod({ depth, selectedDepth }: { depth: number, selectedDepth: number }) {
  const segments = 20;
  const segmentHeight = depth / segments;

  return (
    <group>
      {Array.from({ length: segments }).map((_, i) => {
        const y = -i * segmentHeight / 100 - segmentHeight / 200;
        const isSelected = Math.abs(i * segmentHeight - selectedDepth) < 50;
        
        return (
          <mesh key={i} position={[0, y, 0]}>
            <cylinderGeometry args={[0.15, 0.15, segmentHeight / 100, 16]} />
            <meshStandardMaterial 
              color={isSelected ? "#36F59A" : "#00C8FF"} 
              transparent 
              opacity={0.9}
              emissive={isSelected ? "#36F59A" : "#00C8FF"}
              emissiveIntensity={isSelected ? 0.5 : 0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Pump({ depth }: { depth: number }) {
  return (
    <mesh position={[0, -depth / 100, 0]}>
      <boxGeometry args={[0.6, 0.8, 0.6]} />
      <meshStandardMaterial color="#36F59A" emissive="#36F59A" emissiveIntensity={0.3} />
    </mesh>
  );
}

function PerforationZone({ depth }: { depth: number }) {
  return (
    <mesh position={[0, -depth / 100, 0]}>
      <cylinderGeometry args={[1.2, 1.2, 0.5, 32]} />
      <meshStandardMaterial color="#FFB020" transparent opacity={0.4} emissive="#FFB020" emissiveIntensity={0.2} />
    </mesh>
  );
}

function DepthMarker({ depth, label }: { depth: number, label: string }) {
  return (
    <group position={[2, -depth / 100, 0]}>
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color="#00C8FF"
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[1, 0.05, 0.05]} />
        <meshStandardMaterial color="#00C8FF" />
      </mesh>
    </group>
  );
}

function SelectedDepthIndicator({ depth }: { depth: number }) {
  return (
    <mesh position={[0, -depth / 100, 0]}>
      <torusGeometry args={[1.5, 0.05, 16, 100]} />
      <meshStandardMaterial color="#36F59A" emissive="#36F59A" emissiveIntensity={0.5} />
    </mesh>
  );
}

export default function Wellbore3D({ selectedDepth }: Wellbore3DProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00C8FF" />

        <Grid args={[10, 10]} cellSize={1} cellThickness={0.5} cellColor="#1a3a5c" sectionSize={5} sectionThickness={1} sectionColor="#00C8FF" fadeDistance={30} fadeStrength={1} followCamera={false} infiniteGrid />

        <Casing depth={1400} />
        <Tubing depth={1450} />
        <SuckerRod depth={1300} selectedDepth={selectedDepth} />
        <Pump depth={1300} />
        <PerforationZone depth={1350} />

        <DepthMarker depth={0} label="0m" />
        <DepthMarker depth={500} label="500m" />
        <DepthMarker depth={1000} label="1000m" />
        <DepthMarker depth={1500} label="1500m" />

        <SelectedDepthIndicator depth={selectedDepth} />

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>

      <div className="absolute top-4 left-4 glass-panel rounded-lg p-3">
        <p className="text-xs text-muted mb-2">LEGEND</p>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-[#1a3a5c]" />
            <span className="text-xs text-muted">Casing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-[#2a5a8c]" />
            <span className="text-xs text-muted">Tubing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-[#00C8FF]" />
            <span className="text-xs text-muted">Sucker Rod</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-[#36F59A]" />
            <span className="text-xs text-muted">Pump</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-[#FFB020]" />
            <span className="text-xs text-muted">Perforation Zone</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 glass-panel rounded-lg p-3">
        <p className="text-xs text-muted">SELECTED DEPTH</p>
        <p className="text-sm text-cyan font-bold mt-1">{selectedDepth}m</p>
      </div>
    </div>
  );
}
