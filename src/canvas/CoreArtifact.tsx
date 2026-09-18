import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LiquidVertexShader, LiquidFragmentShader } from './Shaders';
import { PerformanceMode, ThemeMode } from '../types';

interface CoreArtifactProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
  perfMode: PerformanceMode;
  theme: ThemeMode;
}

export const CoreArtifact: React.FC<CoreArtifactProps> = ({
  scrollProgress,
  mousePos,
  perfMode,
  theme,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Geometric resolution based on performance mode
  const detail = useMemo(() => {
    if (perfMode === 'low') return 48;
    if (perfMode === 'ultra') return 128;
    return 80;
  }, [perfMode]);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.35 },
      uFrequency: { value: 1.2 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScrollProgress: { value: 0 },
      uColorBase: { value: new THREE.Color('#081022') },
      uColorAccent: { value: new THREE.Color('#0A6CDB') },
      uColorHighlight: { value: new THREE.Color('#9047FF') },
      uRoughness: { value: 0.2 },
      uThemeLight: { value: theme === 'light' ? 1.0 : 0.0 },
    }),
    []
  );

  // Smooth lerp values for rotation and position
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0, z: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // Advance time
    materialRef.current.uniforms.uTime.value += delta * 0.9;
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    materialRef.current.uniforms.uThemeLight.value = theme === 'light' ? 1.0 : 0.0;

    // Smooth mouse lerp in shader
    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mousePos.x, mousePos.y),
      0.08
    );

    // Dynamic distortion depending on scroll & mouse speed
    const baseDistort = perfMode === 'low' ? 0.2 : 0.38;
    materialRef.current.uniforms.uDistort.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uDistort.value,
      baseDistort + Math.sin(scrollProgress * Math.PI * 2) * 0.15,
      0.05
    );

    // Compute target position and rotation based on scroll stages
    let posX = 1.0;
    let posY = 0.0;
    let posZ = 0.0;
    let scale = 1.6;

    if (scrollProgress < 0.25) {
      // Hero stage: centered-right on desktop
      posX = window.innerWidth > 1024 ? 1.2 : 0;
      posY = window.innerWidth > 1024 ? 0.1 : -0.3;
      scale = window.innerWidth > 768 ? 1.6 : 1.25;
    } else if (scrollProgress < 0.5) {
      // Services stage: center-left
      posX = window.innerWidth > 1024 ? -1.4 : 0;
      posY = 0.2;
      scale = 1.4;
    } else if (scrollProgress < 0.75) {
      // Why Kosal stage: floating center background
      posX = 0;
      posY = -0.2;
      posZ = -1.2;
      scale = 1.8;
    } else {
      // Contact / Brief stage: right side focal orb
      posX = window.innerWidth > 1024 ? 1.5 : 0;
      posY = 0.4;
      scale = 1.2;
    }

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, posX, 0.04);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, posY, 0.04);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, posZ, 0.04);

    meshRef.current.position.set(
      currentPos.current.x,
      currentPos.current.y,
      currentPos.current.z
    );

    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.04);

    // Mouse tracking rotation + continuous idle spin
    targetRotation.current.x = mousePos.y * 0.4 + scrollProgress * 2.5;
    targetRotation.current.y = mousePos.x * 0.4 + state.clock.getElapsedTime() * 0.2;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y,
      0.05
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, detail, detail]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={LiquidVertexShader}
        fragmentShader={LiquidFragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
