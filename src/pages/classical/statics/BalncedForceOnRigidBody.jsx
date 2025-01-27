import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import styled, { createGlobalStyle } from "styled-components";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Latex from "react-latex-next";
import { motion } from "framer-motion";

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Georgia', serif;
    background-color: #000;
    color: #f0f0f0;
  }
`;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  color: #888888;
  margin-bottom: 2rem;
  font-weight: 300;
`;

const Content = styled.div`
  max-width: 800px;
  text-align: justify;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #0f0f0f, #111111);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.7);
  overflow: hidden;
`;

// Custom Component to Draw Force Arrows
const ForceArrows = () => {
  const groupRef = useRef();

  useEffect(() => {
    // Add ArrowHelpers directly using THREE.js
    const group = groupRef.current;

    const arrow1 = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0).normalize(), // Direction
      new THREE.Vector3(0, 0, 0),            // Origin
      3,                                     // Length
      0xff4500                               // Color
    );

    const arrow2 = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0).normalize(),
      new THREE.Vector3(0, 0, 0),
      3,
      0x32cd32
    );

    const arrow3 = new THREE.ArrowHelper(
      new THREE.Vector3(-1, -1, 0).normalize(),
      new THREE.Vector3(0, 0, 0),
      3,
      0x1e90ff
    );

    group.add(arrow1);
    group.add(arrow2);
    group.add(arrow3);

    // Cleanup
    return () => {
      group.remove(arrow1, arrow2, arrow3);
    };
  }, []);

  return (
    <group ref={groupRef}>
      {/* Rigid Body */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color=" #CED2D7" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

const BalancedForceOnRigidBody = () => {
  return (
    <>
      {/* Global Style */}
      <GlobalStyle />

    {/* Page Content */}
    <PageContainer>
    <div className="bg-gray-900 text-gray-100 p-8 min-h-screen font-sans">
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-white"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Balanced Force On A Rigid Body
      </motion.h1>

      {/* Newton Section */}
      <section className="mb-1">
        <motion.h2
          className="text-xl font-semibold mb-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Newton, I. (1687)
        </motion.h2>
        <p className="italic text-gray-400 mb-2">
          The change of motion is proportional to the motive force impressed;
          and is made in the direction of the right line in which that force is
          impressed.
        </p>
        <p className="text-gray-300 mb-4">
          Newton's second law defines force as mass times acceleration:
        </p>

        {/* Equation */}
        <div className="flex justify-center mb-2">
          <Latex>{`$$F = ma$$`}</Latex>
        </div>


      {/* Euler Section */}

        <motion.h2
          className="text-xl font-semibold mb-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Euler, L. (1757)
        </motion.h2>
        <p className="text-gray-300 mb-2">
          Euler extended Newton's law to systems with variable mass:
        </p>

        {/* Equation */}
        <div className="flex justify-center mb-4">
          <Latex>{`$$\\frac{d(mv)}{dt} = F$$`}</Latex>
        </div>

        {/* Explanation List */}
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          <li>
            <strong>m</strong> is the mass of the object (variable with time).
          </li>
          <li>
            <strong>v</strong> is the velocity of the object.
          </li>
          <li>
            <strong>mv</strong> is momentum (mass × velocity).
          </li>
          <li>
            <strong>F</strong> is the net force acting on the object.
          </li>
        </ul>


      {/* Final Combined Equation */}

        <motion.div
          className="text-lg text-gray-100"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Latex>
            {`$$F = ma \\quad \\Rightarrow \\quad \\frac{d(mv)}{dt} = F$$`}
          </Latex>
        </motion.div>
        <p className="text-gray-400 italic mt-2">
          This equation helps describe forces acting on systems with changing
          mass, like rockets.
        </p>
      </section>
    </div>  

















        {/* 3D Visualization */}
        <CanvasContainer>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <ForceArrows />
            <OrbitControls />
          </Canvas>
        </CanvasContainer>
      </PageContainer>
    </>
  );
};

export default BalancedForceOnRigidBody;
