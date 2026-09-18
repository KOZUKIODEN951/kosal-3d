import React, { Component, ErrorInfo, ReactNode, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CoreArtifact } from './CoreArtifact';
import { FloatingRings } from './FloatingRings';
import { ParticleField } from './ParticleField';
import { FallbackCanvas } from './FallbackCanvas';
import { PerformanceMode, ThemeMode } from '../types';

interface KosalCanvasProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
  perfMode: PerformanceMode;
  theme: ThemeMode;
}

// Function to test WebGL support safely
const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Error boundary to catch any R3F or WebGL initialization failures
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL initialization failed, falling back to 2D canvas simulation:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const KosalCanvas: React.FC<KosalCanvasProps> = ({
  scrollProgress,
  mousePos,
  perfMode,
  theme,
}) => {
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    setWebglSupported(checkWebGLSupport());
  }, []);

  if (!webglSupported) {
    return (
      <FallbackCanvas
        scrollProgress={scrollProgress}
        mousePos={mousePos}
        perfMode={perfMode}
        theme={theme}
      />
    );
  }

  return (
    <WebGLErrorBoundary
      fallback={
        <FallbackCanvas
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          perfMode={perfMode}
          theme={theme}
        />
      }
    >
      <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          dpr={perfMode === 'low' ? 1 : perfMode === 'ultra' ? [1, 2] : [1, 1.5]}
          gl={{
            antialias: perfMode !== 'low',
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={theme === 'light' ? 0.9 : 0.4} />

            <pointLight position={[5, 4, 3]} intensity={2.2} color="#0A6CDB" />
            <pointLight position={[-5, -3, 2]} intensity={1.8} color="#9047FF" />
            <directionalLight
              position={[0, 5, 5]}
              intensity={theme === 'light' ? 1.5 : 0.8}
              color="#ffffff"
            />

            <CoreArtifact
              scrollProgress={scrollProgress}
              mousePos={mousePos}
              perfMode={perfMode}
              theme={theme}
            />

            <FloatingRings
              scrollProgress={scrollProgress}
              mousePos={mousePos}
              theme={theme}
            />

            <ParticleField
              mousePos={mousePos}
              perfMode={perfMode}
              theme={theme}
            />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
};
