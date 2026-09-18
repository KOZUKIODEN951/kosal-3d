import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ThemeMode } from '../types';

interface FloatingRingsProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
  theme: ThemeMode;
}

export const FloatingRings: React.FC<FloatingRingsProps> = ({
  scrollProgress,
  mousePos,
  theme,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Follow the artifact center
    let posX = window.innerWidth > 1024 ? 1.2 : 0;
    let posY = 0;
    if (scrollProgress >= 0.25 && scrollProgress < 0.5) {
      posX = window.innerWidth > 1024 ? -1.4 : 0;
      posY = 0.2;
    } else if (scrollProgress >= 0.5 && scrollProgress < 0.75) {
      posX = 0;
      posY = -0.2;
    } else if (scrollProgress >= 0.75) {
      posX = window.innerWidth > 1024 ? 1.5 : 0;
      posY = 0.4;
    }

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, posX, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, posY, 0.04);

    // Multi-axis independent rotation for gyroscopic celestial feel
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.35;
      ring1Ref.current.rotation.y += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.25;
      ring2Ref.current.rotation.z += delta * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.18;
      ring3Ref.current.rotation.z -= delta * 0.3;
    }

    // Interactive mouse inclination
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mousePos.y * 0.3,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mousePos.x * 0.3,
      0.05
    );
  });

  const ringColor = theme === 'light' ? '#0A6CDB' : '#5FA6F3';
  const emissiveColor = theme === 'light' ? '#003366' : '#0A6CDB';

  return (
    <group ref={groupRef}>
      {/* Outer Gyroscopic Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.015, 16, 100]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={emissiveColor}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Mid Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.7, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#9047FF"
          emissive="#5a189a"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* Inner Accent Ring */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[1.4, 0.01, 16, 80]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284c7"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={1.0}
        />
      </mesh>
    </group>
  );
};
