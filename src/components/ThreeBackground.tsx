import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

function Skyline() {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    state.camera.position.z;
    // slight subtle hover for the city could be cool, but static is better for architecture
  });

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      // Randomize position across a line
      const x = (Math.random() - 0.5) * 30; // wide spread
      const z = (Math.random() - 0.5) * 10 - 10; // pushed back
      const height = Math.random() * 4 + 1;
      const width = Math.random() * 0.8 + 0.2;
      const depth = Math.random() * 0.8 + 0.2;

      dummy.position.set(x, height / 2 - 4, z); // Start slightly below view
      dummy.scale.set(width, height, depth);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshStandardMaterial 
        color="#080808" 
        roughness={0.2} 
        metalness={0.9} 
      />
    </instancedMesh>
  );
}

function SkylineGlow() {
  // A glowing strip behind the skyline to give a silhouette effect
  return (
    <mesh position={[0, -4, -15]}>
      <planeGeometry args={[100, 10]} />
      <meshBasicMaterial 
        color="#E50914" 
        transparent 
        opacity={0.05} 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function ParticleSphere() {
  const points = useRef<THREE.Points>(null!);
  
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 0.4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Logic: 20% red nodes, 80% white/blue nodes
      if (Math.random() > 0.8) {
        cols[i * 3] = 0.898; // R (E5)
        cols[i * 3 + 1] = 0.035; // G (09)
        cols[i * 3 + 2] = 0.078; // B (14)
      } else {
        cols[i * 3] = 1;
        cols[i * 3 + 1] = 1;
        cols[i * 3 + 2] = 1;
      }
    }
    return cols;
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -mouse.y * 0.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function DataFlow() {
  const lineRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    lineRef.current.rotation.z = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={lineRef}>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[2.8 + Math.random() * 0.5, 0.002, 16, 100]} />
          <meshBasicMaterial 
            color={i % 4 === 0 ? "#E50914" : "#ffffff"} 
            transparent 
            opacity={0.08} 
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#050505] pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <Rig />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#E50914" />
        <pointLight position={[0, -5, -5]} intensity={5} color="#E50914" distance={20} />
        
        <Skyline />
        <SkylineGlow />

        <Stars radius={150} depth={50} count={7000} factor={4} saturation={0} fade speed={1.5} />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          {active && <ParticleSphere />}
        </Float>
        <DataFlow />
        <fog attach="fog" args={['#050505', 4, 15]} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.08),transparent_60%)]" />
    </div>
  );
}
