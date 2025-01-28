import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt'; // React Tilt for tilt effect
import { motion } from 'framer-motion'; // For animations
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { useInView } from 'react-intersection-observer'; // For scroll-triggered visibility
import 'react-vertical-timeline-component/style.min.css'; // Import timeline styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

import './ClassicalPhysics.css';

// Reusable Card Component
const Card = ({ title, description, links }) => (
  <motion.div
    className="p-6 mb-8 transition-transform transform shadow-lg card rounded-xl backdrop-blur-lg bg-white/20 hover:scale-105"
    whileHover={{ scale: 1.05 }} // Hover effect with Framer Motion
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Tilt className="tilt-card" options={{ max: 25, scale: 1.1, speed: 400 }}>
      <h2 className="mb-4 text-3xl font-bold text-indigo-400">{title}</h2>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className="text-gray-300 transition duration-300 hover:text-indigo-500"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Tilt>
  </motion.div>
);




// Cards Data
const chapters = [
  {
    title: ' Statics',
    description: 'about statics',
    links: [
      { label: 'Balanced Force on Rigid Bodies', path: '/physics-playground/classical/statics/balanced-force-on-rigid-body' },
      { label: 'Balanced Torques', path: '/equilibrium' },
      { label: 'Center of Mass and Centroid', path: '/torques' },
      { label: 'Trusses and Frames', path: '/center-of-mass' },
      { label: 'Beams and Support Reactions', path: '/trusses' },
      { label: 'Friction in Static Systems', path: '/friction' },
      { label: 'Equilibrium of Particles', path: '/balanced-force' },
      { label: 'Static Pressure', path: '/equilibrium' },
      { label: 'Stability and Tipping', path: '/torques' },
      { label: 'Combined Loading', path: '/center-of-mass' }
    ],
  },
  {
    title: 'Motion',
    description: 'about statics',
    links: [
      { label: 'Linear Motion', path: '/linear-motion' },
      { label: 'Circular Motion', path: '/circular-motion' },
      { label: 'Projectile Motion', path: '/projectile-motion' },
      { label: 'Rotational Motion', path: '/rotational-motion' },
      { label: 'Relative Motion', path: '/relative-motion' },
      { label: 'Motion in a Gravitational Field', path: '/projectile-motion' },
      { label: 'Motion in Friction', path: '/rotational-motion' },
      { label: 'Uniform and Non-Uniform Acceleration', path: '/relative-motion' },      
      { label: 'Coupled Motion ', path: '/relative-motion' },     
      { label: 'Spiral Motion', path: '/relative-motion' }      
 


    ],
  },
  {
    title: 'Collisions',
    description: 'about statics',
    links: [
      { label: "Elastic Collisions", path: '/newtons-laws' },
      { label: 'Inelastic Collisions', path: '/momentum' },
      { label: '1D Collisions', path: '/energy-power' },
      { label: '2D Collisions', path: '/conservation-laws' },
      { label: "Oblique Collisions", path: '/newtons-laws' },
      { label: 'Multiple Collisions', path: '/momentum' },
      { label: 'Collisions with Barriers', path: '/energy-power' },
      { label: 'Momentum Transfer', path: '/conservation-laws' },
      { label: 'Energy Loss in Collisions', path: '/conservation-laws' }
    ],
  },
  {
    title: 'Friction',
    description: 'about statics',
    links: [
      { label: '    Object at Rest ', path: '/balanced-force' },
      { label: '    Sliding Objects on Surfaces ', path: '/equilibrium' },
      { label: '    Rolling Objects ', path: '/torques' },
      { label: '    Friction in Liquids ', path: '/center-of-mass' },
      { label: '    Applications of Friction ', path: '/trusses' }

    ],
  },
  {
    title: 'Work, Energy, and Power',
    description: 'about statics',
    links: [
      { label: 'Work and Work-Energy Theorem', path: '/linear-motion' },
      { label: '    Kinetic Energy ', path: '/circular-motion' },
      { label: '    Potential Energy ', path: '/projectile-motion' },
      { label: '    Conservation of Energy ', path: '/rotational-motion' },
      { label: '    Power ', path: '/relative-motion' },
      { label: '    Mechanical Advantage and Efficiency ', path: '/relative-motion' },
    ],
  },
  {
    title: 'Gravitation',
    description: 'about statics',
    links: [
      { label: "    Universal Law of Gravitation ", path: '/newtons-laws' },
      { label: '    Gravitational Potential Energy ', path: '/momentum' },
      { label: '    Orbits and Kepler’s Laws ', path: '/energy-power' },
      { label: '    Escape Velocity ', path: '/conservation-laws' },
      { label: '    Gravitational Field ', path: '/conservation-laws' },
    ],
  },

  {
    title: 'Pressure and Fluids ',
    description: 'about statics',
    links: [
      { label: '    Fluid Statics ', path: '/linear-motion' },
      { label: 'Buoyancy and Archimedes’ Principle', path: '/circular-motion' },
      { label: '    Viscosity and Fluid Resistance ', path: '/projectile-motion' }
       
    ],
  },
  {
    title: 'Elasticity and Deformation ',
    description: 'about statics',
    links: [
      { label: "    Elasticity in Solids ", path: '/newtons-laws' },
      { label: '    Stress-Strain Curve ', path: '/momentum' },
      { label: '    Elastic Potential Energy ', path: '/energy-power' },
      { label: '    Bulk and Shear Moduli ', path: '/conservation-laws' },
      { label: "    Anisotropic and Viscoelastic Materials ", path: '/newtons-laws' }

    ],
  },
  {
    title: 'Simple Harmonic Motion and Oscillations ',
    description: 'about statics',
    links: [
      { label: '    Simple Harmonic Motion (SHM) ', path: '/balanced-force' },
      { label: '    Energy in SHM ', path: '/equilibrium' },
      { label: '     Damped Harmonic Motion ', path: '/torques' },
      { label: '    Forced Oscillations and Resonance ', path: '/center-of-mass' },
      { label: '    Coupled Oscillations ', path: '/trusses' }

    ],
  },
  {
    title: 'Waves and Sound ',
    description: 'about statics',
    links: [
      { label: '    Nature of Waves ', path: '/linear-motion' },
      { label: '     Sound Waves ', path: '/circular-motion' },
      { label: '    Doppler Effect ', path: '/projectile-motion' },
      { label: '    Interference and Diffraction ', path: '/rotational-motion' },
      { label: '    Wave Propagation in Different Media ', path: '/relative-motion' }

    ],
  },
  {
    title: ' Rotational Dynamics ',
    description: 'about statics',
    links: [
      { label: "    Rotational Motion ", path: '/newtons-laws' },
      { label: '    Conservation of Angular Momentum ', path: '/momentum' },
      { label: '    Gyroscopic Effects ', path: '/energy-power' },
      { label: '    Flywheels and Rotational Energy ', path: '/conservation-laws' },
      { label: '    Rotational Kinetic Energy and Work ', path: '/conservation-laws' },
    ],
  },






];

// Main Component
const ModernPhysics = () => {
  const contentRef = useRef(null);

  // Scroll to content
  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const handleScroll = () => {
      const element = contentRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const inViewNow = rect.top <= window.innerHeight && rect.bottom >= 0;
        setInView(inViewNow);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden text-gray-100 bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 w-full py-6 shadow-lg bg-opacity-90 backdrop-blur-md">
  <h1 className="text-5xl font-extrabold tracking-wider text-center text-white uppercase">
    Modern Physics
  </h1>
  <p className="px-6 mt-2 text-xl text-center text-gray-300">
    Classical physics deals with the fundamental principles of matter, energy, and their interactions. It encompasses the theories and concepts developed before the rise of modern physics, including Newtonian mechanics, electromagnetism, thermodynamics, and classical wave theory. These concepts form the foundation of many engineering and scientific disciplines.
  </p>
</header>


      {/* Overlay Text */}
      <motion.div
        className="absolute px-10 py-3 transform -translate-x-1/2 bg-transparent rounded-full shadow-lg cursor-pointer bottom-20 left-1/2 backdrop-blur-md animate-pulse"
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <p className="text-xl font-semibold tracking-wide text-center text-yellow-500">
          Explore the classical physics!
        </p>
      </motion.div>

      {/* Content Section */}
      <main
        ref={contentRef}
        className="container relative z-10 grid grid-cols-1 gap-12 px-6 py-20 mx-auto mt-48 space-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
              <VerticalTimeline
      lineColor="transparent" // Remove default straight line
    >
      {chapters.map((chapter, index) => {
        const { ref, inView } = useInView({
          triggerOnce: true,
          threshold: 0.5,
        });

        return (
          <VerticalTimelineElement
            key={index}
            date={`Chapter ${index + 1}`}
            iconStyle={{
              background: 'linear-gradient(145deg, #5B0060, #800080)',
              color: '#fff',
              boxShadow: '0 5px 15px rgba(128, 0, 128, 0.6)',
            }}
            icon={<FontAwesomeIcon icon={faBook} />}

            contentStyle={{
              background: 'linear-gradient(145deg, #000, #1A1A1A)',
              color: '#fff',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.8), 0 10px 20px rgba(80, 0, 80, 0.6)',
            }}
            contentArrowStyle={{ borderRight: '10px solid #1A1A1A' }}
          >
            {/* Connector Line */}
            <div className="absolute top-0 w-1 h-full transform -translate-x-1/2 left-1/2">
              <div className="w-1 h-full rounded-full bg-gradient-to-b from-purple-700 via-black to-purple-900 animate-pulse" />
            </div>

            <motion.div
              ref={ref}
              initial={{
                opacity: 0,
                y: 100,
                rotate: 5,
                scale: 0.95,
                skewX: -15,
              }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 100,
                rotate: inView ? 0 : 5,
                scale: inView ? 1 : 0.95,
                skewX: inView ? 0 : -15,
              }}
              transition={{
                duration: 1.2,
                ease: 'easeOut',
              }}
              className="relative p-8 text-white transition-all duration-300 ease-in-out transform shadow-xl bg-gradient-to-br from-purple-900 via-black to-purple-800 rounded-2xl group hover:scale-105 hover:rotate-1"
            >
              {/* 3D Effect Background */}
              <div className="absolute inset-0 z-0 transition-all duration-300 ease-in-out bg-gradient-to-br from-purple-600 via-purple-800 to-black opacity-70 rounded-2xl group-hover:opacity-100" />
              <div className="absolute inset-0 z-0 transition-all duration-300 ease-in-out bg-black opacity-40 rounded-2xl group-hover:opacity-70" />

              {/* Interactive Text Layer */}
              <motion.div
                className="absolute z-10 text-lg font-bold text-left text-white transition-colors duration-300 ease-in-out top-6 left-6 group-hover:text-yellow-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
                transition={{ duration: 0.8 }}
              >
                {chapter.description}
              </motion.div>

              {/* Card Content */}
              <div className="relative z-20">
                <motion.h2
                  className="text-2xl font-bold text-purple-300 transition-all duration-300 ease-in-out group-hover:text-yellow-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {chapter.title}
                </motion.h2>
                <Card title={chapter.title} links={chapter.links} />
              </div>

              {/* Subtle Glow Effect */}
              <div className="absolute -inset-1 rounded-2xl opacity-10 group-hover:opacity-30 animate-pulse bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900" />
            </motion.div>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-800 shadow-inner">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Classical Physics Learning. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default ModernPhysics;