import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

function AnimatedSphere({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[scale, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  const particles = useMemo(() => {
    const temp = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      temp.set([
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
      ], i * 3);
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0003;
      pointsRef.current.rotation.y += 0.0005;
      
      // Mouse interaction
      pointsRef.current.rotation.x += mouse.y * 0.0001;
      pointsRef.current.rotation.y += mouse.x * 0.0001;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#666666"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.002;
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, 0, -8 - i * 2]} rotation={[0, 0, i * Math.PI / 3]}>
          <torusGeometry args={[3 + i, 0.1, 16, 100]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

export default function EnhancedThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#cccccc" />
        
        <AnimatedSphere position={[-6, 3, -8]} color="#000000" scale={2} />
        <AnimatedSphere position={[4, -2, -6]} color="#333333" scale={1.5} />
        <AnimatedSphere position={[0, 4, -10]} color="#1a1a1a" scale={1.8} />
        <AnimatedSphere position={[7, 1, -12]} color="#404040" scale={1.2} />
        <AnimatedSphere position={[-3, -4, -5]} color="#262626" scale={1.6} />
        
        <ParticleField />
        <FloatingRings />
        
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}