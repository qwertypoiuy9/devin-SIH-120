import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Line, Text } from '@react-three/drei';
import { useState, useRef } from 'react';
import * as THREE from 'three';

function Wellbore() {
  const meshRef = useRef<THREE.Group>(null);

  return (
    <group ref={meshRef}>
      {/* Casing */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 10, 32]} />
        <meshStandardMaterial color="#1a3a5c" transparent opacity={0.6} />
      </mesh>

      {/* Tubing */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 10, 32]} />
        <meshStandardMaterial color="#2a5a8c" transparent opacity={0.8} />
      </mesh>

      {/* Sucker Rod */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 10, 16]} />
        <meshStandardMaterial color="#00C8FF" transparent opacity={0.9} />
      </mesh>

      {/* Pump */}
      <mesh position={[0, -10, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.8]} />
        <meshStandardMaterial color="#36F59A" />
      </mesh>
    </group>
  );
}

function ReservoirLayers() {
  return (
    <group>
      {/* Surface layer */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[20, 0.5, 20]} />
        <meshStandardMaterial color="#2a5a8c" transparent opacity={0.3} />
      </mesh>

      {/* Reservoir layer */}
      <mesh position={[0, -3, 0]}>
        <boxGeometry args={[20, 2, 20]} />
        <meshStandardMaterial color="#1a3a5c" transparent opacity={0.4} />
      </mesh>

      {/* Production zone */}
      <mesh position={[0, -4, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial color="#FFB020" transparent opacity={0.3} />
      </mesh>

      {/* Steam influence zone */}
      <mesh position={[0, -4, 0]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial color="#FF3B30" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function DepthMarkers() {
  const depths = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000];

  return (
    <group>
      {depths.map((depth, index) => (
        <group key={depth} position={[8, -depth / 250, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.3}
            color="#00C8FF"
            anchorX="left"
            anchorY="middle"
          >
            {depth}m
          </Text>
          <mesh position={[-0.5, 0, 0]}>
            <boxGeometry args={[1, 0.05, 0.05]} />
            <meshStandardMaterial color="#00C8FF" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Pumpjack() {
  return (
    <group position={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="#1a3a5c" />
      </mesh>

      {/* Mast */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[0.3, 5, 0.3]} />
        <meshStandardMaterial color="#2a5a8c" />
      </mesh>

      {/* Walking beam */}
      <mesh position={[0, 5.5, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[4, 0.2, 0.2]} />
        <meshStandardMaterial color="#00C8FF" />
      </mesh>

      {/* Horsehead */}
      <mesh position={[2, 5.2, 0]}>
        <boxGeometry args={[1, 1, 0.3]} />
        <meshStandardMaterial color="#36F59A" />
      </mesh>
    </group>
  );
}

export default function DigitalTwin3D() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00C8FF" />

        <Grid args={[20, 20]} cellSize={1} cellThickness={0.5} cellColor="#1a3a5c" sectionSize={5} sectionThickness={1} sectionColor="#00C8FF" fadeDistance={30} fadeStrength={1} followCamera={false} infiniteGrid />

        <ReservoirLayers />
        <Wellbore />
        <Pumpjack />
        <DepthMarkers />

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>

      <div className="absolute bottom-4 left-4 glass-panel rounded-lg p-4">
        <p className="text-xs text-muted mb-2">DEPTH SCALE</p>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan rounded" />
            <span className="text-xs text-muted">Surface</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber rounded" />
            <span className="text-xs text-muted">Production Zone</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-critical rounded" />
            <span className="text-xs text-muted">Steam Influence</span>
          </div>
        </div>
      </div>
    </div>
  );
}
