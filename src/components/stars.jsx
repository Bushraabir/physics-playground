import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Stars as DreiStars } from '@react-three/drei';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three-stdlib';

// Extend the library to include UnrealBloomPass
extend({ UnrealBloomPass });

// Helper function to generate random star positions and colors
const generateStars = (count, radius) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * 2 * Math.PI;

    const r = radius * (Math.random() * 0.5 + 0.5); // Slight variation in distance
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    const color = new THREE.Color(`hsl(${Math.random() * 360}, 70%, ${70 + Math.random() * 30}%)`);
    const twinkleSpeed = 0.5 + Math.random();

    stars.push({ position: [x, y, z], color, twinkleSpeed });
  }
  return stars;
};

// Component to render twinkling stars with glowing effect
const StarsWithTwinkle = ({ count, radius, parallaxFactor }) => {
  const stars = useMemo(() => generateStars(count, radius), [count, radius]);

  return (
    <>
      {stars.map(({ position, color, twinkleSpeed }, idx) => (
        <Star key={idx} position={position} color={color} twinkleSpeed={twinkleSpeed} parallaxFactor={parallaxFactor} />
      ))}
    </>
  );
};

// Single star component with glowing effect and twinkling animation
const Star = ({ position, color, twinkleSpeed, parallaxFactor }) => {
  const starRef = useRef();

  useFrame(({ clock, mouse, camera }) => {
    if (starRef.current) {
      // Twinkle effect
      starRef.current.material.opacity = 0.7 + 0.3 * Math.sin(clock.getElapsedTime() * twinkleSpeed);

      // Parallax effect based on camera and mouse movement
      const { x, y, z } = camera.position;
      const mouseX = (mouse.x * 0.5 + 0.5) * parallaxFactor;
      const mouseY = (mouse.y * 0.5 + 0.5) * parallaxFactor;
      starRef.current.position.set(position[0] + x * mouseX, position[1] + y * mouseY, position[2] + z * parallaxFactor);
    }
  });

  return (
    <mesh ref={starRef} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color={color} transparent emissive={color} emissiveIntensity={1.2} />
    </mesh>
  );
};

// Shooting star effect with particle animation and trails
const ShootingStar = () => {
  const starRef = useRef();
  const [start, setStart] = useState({
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    z: -50,
  });

  useFrame(({ clock }) => {
    if (starRef.current) {
      const elapsed = clock.getElapsedTime();
      const progress = elapsed % 2; // Shooting star lasts for 2 seconds
      starRef.current.position.set(
        start.x + progress * 50,
        start.y + progress * 30,
        start.z + progress * 50
      );

      if (progress > 1.9) {
        setStart({
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          z: -50,
        });
      }
    }
  });

  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

// Galaxy Cluster with rotating effect
const Galaxy = () => {
  const galaxy = useMemo(() => generateStars(2000, 10), []);
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {galaxy.map(({ position, color }, idx) => (
        <mesh key={idx} position={position}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

// Constellations with lines
const Constellations = () => {
  const lineMaterial = new THREE.LineBasicMaterial({ color: 'white', transparent: true, opacity: 0.5 });
  const positions = useMemo(() => generateStars(8, 20).map((star) => star.position), []);

  const points = new THREE.BufferGeometry().setFromPoints(positions.map((p) => new THREE.Vector3(...p)));

  return <line geometry={points} material={lineMaterial} />;
};

// Nebula with animated colors and shaders
const Nebula = () => {
  const meshRef = useRef();
  const clock = new THREE.Clock();

  useFrame(() => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.material.color.setHSL((Math.sin(time * 0.1) + 1) * 0.5, 0.6, 0.5);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[100, 64, 64]} />
      <meshBasicMaterial color={0x9333ea} transparent side={THREE.BackSide} />
    </mesh>
  );
};

// Custom component for UnrealBloomPass
const BloomPass = ({ width, height }) => {
  const passRef = useRef();

  useEffect(() => {
    if (passRef.current) {
      passRef.current.setSize(width, height);
    }
  }, [width, height]);

  return <unrealBloomPass ref={passRef} args={[undefined, 1.5, 0.4, 256]} />;
};

// Main Component with interactive star field and black theme
const AdvancedStarField = () => {
  return (
    <Canvas 
      className="absolute top-0 left-0 w-full h-full z-0" 
      style={{ backgroundColor: 'black' }} 
      camera={{ position: [0, 0, 15], fov: 75 }}>
      
      {/* Stars with Twinkle and Parallax */}
      <StarsWithTwinkle count={5000} radius={50} parallaxFactor={0.02} />

      {/* Shooting Stars */}
      <ShootingStar />

      {/* Galaxy Cluster */}
      <Galaxy />

      {/* Constellations */}
      <Constellations />

      {/* Nebula */}
      <Nebula />

      {/* Lighting and Controls */}
      <ambientLight intensity={0.3} />
      <directionalLight intensity={0.8} position={[0, 0, 10]} />
      <OrbitControls enableZoom={true} />
      
      {/* Bloom effect */}
      <BloomPass width={window.innerWidth} height={window.innerHeight} />
    </Canvas>
  );
};

export default AdvancedStarField;
