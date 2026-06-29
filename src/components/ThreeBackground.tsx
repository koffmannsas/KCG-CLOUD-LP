import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Africa Boundary Check
const isPointInAfrica = (lat: number, lon: number): boolean => {
  if (lat > 37 || lat < -34.8) return false;
  if (lon < -17.5 || lon > 51.4) return false;

  if (lat > 15) {
    // Sahara and far North Africa
    return lon >= -17 && lon <= 34;
  }
  if (lat > 4) {
    // West Africa Bulb & East/Central
    return lon >= -17 && lon <= 48;
  }
  if (lat > -5) {
    // Central narrowing region
    return lon >= 8 && lon <= 42;
  }
  if (lat > -20) {
    // Southern African mid
    return lon >= 11 && lon <= 38;
  }
  // South Africa tip
  return lon >= 16 && lon <= 33;
};

function FuturisticSkyline() {
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const wireMeshRef = useRef<THREE.InstancedMesh>(null!);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current || !wireMeshRef.current) return;
    
    // Seeded random to make the city layout consistent across renders
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const x = (random() - 0.5) * 36; // wide spread
      const z = (random() - 0.5) * 12 - 12; // pushed back
      const height = random() * 5 + 1.5;
      const width = random() * 0.9 + 0.3;
      const depth = random() * 0.9 + 0.3;

      dummy.position.set(x, height / 2 - 5, z); // Start slightly below view
      dummy.scale.set(width, height, depth);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
      wireMeshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    wireMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  return (
    <group>
      {/* Solid Dark Buildings */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry />
        <meshStandardMaterial 
          color="#060608" 
          roughness={0.15} 
          metalness={0.95} 
        />
      </instancedMesh>
      
      {/* Holographic Glowing Wireframes */}
      <instancedMesh ref={wireMeshRef} args={[undefined, undefined, count]}>
        <boxGeometry />
        <meshBasicMaterial 
          color="#C8102E" 
          wireframe 
          transparent 
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}

function HolographicAfricaGlobe() {
  const pointsRef = useRef<THREE.Points>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);

  const count = 4500;
  
  // Generate coordinates on Fibonacci Sphere
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * i;

      const lonRad = theta % (Math.PI * 2);
      const latRad = Math.asin(y);

      const r = 2.4; // Globe sphere radius
      pos[i * 3] = r * Math.cos(latRad) * Math.sin(lonRad);
      pos[i * 3 + 1] = r * Math.sin(latRad);
      pos[i * 3 + 2] = r * Math.cos(latRad) * Math.cos(lonRad);
    }
    return pos;
  }, []);

  // Generate color palette (Red for Africa, dim cyan-blue for others)
  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * i;

      const lonRad = theta % (Math.PI * 2);
      const latRad = Math.asin(y);

      // Map back to lat/lon for African landmass detection
      const lon = ((lonRad * 180) / Math.PI) - 180;
      const lat = (latRad * 180) / Math.PI;

      if (isPointInAfrica(lat, lon)) {
        // Vibrant sovereign KCG Red
        cols[i * 3] = 0.784;     // R (200/255)
        cols[i * 3 + 1] = 0.063; // G (16/255)
        cols[i * 3 + 2] = 0.180; // B (46/255)
      } else {
        // Faint cybernetic grey-cyan
        cols[i * 3] = 0.12;
        cols[i * 3 + 1] = 0.18;
        cols[i * 3 + 2] = 0.25;
      }
    }
    return cols;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Slow rotational velocity for elegance
    pointsRef.current.rotation.y = elapsed * 0.035;
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.02) * 0.04;
    
    // Core expansion and pulse
    const coreScale = 1.0 + Math.sin(elapsed * 2.5) * 0.05;
    coreRef.current.scale.set(coreScale, coreScale, coreScale);
    
    // Orbit rings spin
    ring1Ref.current.rotation.y = elapsed * 0.15;
    ring1Ref.current.rotation.x = elapsed * 0.08;
    ring2Ref.current.rotation.y = -elapsed * 0.1;
    ring2Ref.current.rotation.z = elapsed * 0.12;
  });

  return (
    <group position={[0, 0.5, 0]}>
      {/* 3D Dot Matrix Continent-Mapped Particles */}
      <points ref={pointsRef}>
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
          size={0.016}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Volumetric Fusion Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial 
          color="#C8102E" 
          transparent 
          opacity={0.08} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbit paths / Gyroscope rings */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.9, 0.008, 8, 80]} />
          <meshBasicMaterial color="#C8102E" transparent opacity={0.15} />
        </mesh>
      </group>
      <group ref={ring2Ref}>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[3.2, 0.006, 8, 80]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>
      </group>
    </group>
  );
}

function DataRays() {
  const lineRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    lineRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={lineRef}>
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 10 - 5;
        const h = Math.random() * 8 + 4;
        return (
          <mesh key={i} position={[x, h / 2 - 4, z]}>
            <cylinderGeometry args={[0.005, 0.005, h, 4]} />
            <meshBasicMaterial 
              color={i % 3 === 0 ? "#C8102E" : "#ffffff"} 
              transparent 
              opacity={0.05} 
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function CinematicRig() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [zoomProgress, setZoomProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Soft opening camera flight
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 2500; // 2.5s duration
      if (elapsed >= 1) {
        setZoomProgress(1);
        clearInterval(interval);
      } else {
        // Cubic ease out for extreme luxury feel
        setZoomProgress(1 - Math.pow(1 - elapsed, 3));
      }
    }, 16);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  useFrame((state) => {
    // Camera zooms from z=15 on load down to z=7.2
    const targetZ = THREE.MathUtils.lerp(14, 7.2, zoomProgress);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);

    // Subtle parallax reaction to user's mouse
    const targetX = mouse.x * 0.8;
    const targetY = -mouse.y * 0.4 + 0.3; // camera looking slightly downward
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0.3, 0);
  });
  return null;
}

export default function ThreeBackground() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#020203] pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 14]} fov={45} />
        <CinematicRig />
        <ambientLight intensity={0.4} />
        
        {/* Volumetric Spotlighting on the core */}
        <spotLight position={[0, 10, 2]} intensity={2} angle={0.6} penumbra={0.5} color="#C8102E" />
        <pointLight position={[5, 3, 5]} intensity={1.5} color="#C8102E" />
        <pointLight position={[-5, -2, -5]} intensity={2.5} color="#0a2a4a" />
        
        {/* Futuristic Skyline and wireframes */}
        <FuturisticSkyline />

        {/* Outer Deep Space Stars */}
        <Stars radius={180} depth={60} count={6000} factor={4} saturation={0} fade speed={1.2} />
        
        {/* Holographic 3D Globe of Africa */}
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.15}>
          {active && <HolographicAfricaGlobe />}
        </Float>

        {/* Connected Vertical Infrastructure Data Streams */}
        <DataRays />
        
        <fog attach="fog" args={['#020203', 5, 16]} />
      </Canvas>
      
      {/* Luxury Cinematic Shadow Layer overlaying the 3D space */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020203]/90 via-transparent to-[#020203]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,16,46,0.12),transparent_70%)]" />
    </div>
  );
}
