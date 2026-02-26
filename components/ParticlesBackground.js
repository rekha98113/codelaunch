"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function RotatingParticles() {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000 * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0008;
      pointsRef.current.rotation.x += 0.0004;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#60a5fa"
        size={0.06}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticlesBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={1} />
        <RotatingParticles />
      </Canvas>
    </div>
  );
}