import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PerformanceMode, ThemeMode } from '../types';

interface ParticleFieldProps {
  mousePos: { x: number; y: number };
  perfMode: PerformanceMode;
  theme: ThemeMode;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  mousePos,
  perfMode,
  theme,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const count = useMemo(() => {
    if (perfMode === 'low') return 350;
    if (perfMode === 'ultra') return 2200;
    return 1000;
  }, [perfMode]);

  // Generate particle positions and random drift factors
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sc[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow ambient rotation
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.015;

    // Mouse parallax tilt
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      mousePos.x * 0.8,
      0.03
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      mousePos.y * 0.8,
      0.03
    );
  });

  const particleColor = theme === 'light' ? '#0A6CDB' : '#72b3ff';

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={perfMode === 'low' ? 0.04 : 0.03}
        color={particleColor}
        transparent={true}
        opacity={theme === 'light' ? 0.45 : 0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
