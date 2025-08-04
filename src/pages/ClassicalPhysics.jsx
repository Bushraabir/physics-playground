import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { useInView } from 'react-intersection-observer';
import 'react-vertical-timeline-component/style.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

// Reusable Card Component
const Card = ({ title, links }) => (
  <motion.div
    className="p-6 rounded-xl bg-primary/80 backdrop-blur-lg shadow-glow hover:shadow-lg transition-all duration-300"
    whileHover={{ scale: 1.01 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Tilt options={{ max: 15, scale: 1.01, speed: 400 }}>
      <h2 className="text-2xl font-bold text-accent mb-4 font-serif">{title}</h2>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className="text-whiteSmoke hover:text-secondary transition-colors duration-300 font-sans"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Tilt>
  </motion.div>
);

// Chapters Data
const chapters = [
  {
    title: 'Statics',
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
      { label: 'Combined Loading', path: '/center-of-mass' },
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
      { label: 'Coupled Motion', path: '/relative-motion' },
      { label: 'Spiral Motion', path: '/relative-motion' },
    ],
  },
  {
    title: 'Collisions',
    description: 'about statics',
    links: [
      { label: 'Elastic Collisions', path: '/newtons-laws' },
      { label: 'Inelastic Collisions', path: '/momentum' },
      { label: '1D Collisions', path: '/energy-power' },
      { label: '2D Collisions', path: '/conservation-laws' },
      { label: 'Oblique Collisions', path: '/newtons-laws' },
      { label: 'Multiple Collisions', path: '/momentum' },
      { label: 'Collisions with Barriers', path: '/energy-power' },
      { label: 'Momentum Transfer', path: '/conservation-laws' },
      { label: 'Energy Loss in Collisions', path: '/conservation-laws' },
    ],
  },
  {
    title: 'Friction',
    description: 'about statics',
    links: [
      { label: 'Object at Rest', path: '/balanced-force' },
      { label: 'Sliding Objects on Surfaces', path: '/equilibrium' },
      { label: 'Rolling Objects', path: '/torques' },
      { label: 'Friction in Liquids', path: '/center-of-mass' },
      { label: 'Applications of Friction', path: '/trusses' },
    ],
  },
  {
    title: 'Work, Energy, and Power',
    description: 'about statics',
    links: [
      { label: 'Work and Work-Energy Theorem', path: '/linear-motion' },
      { label: 'Kinetic Energy', path: '/circular-motion' },
      { label: 'Potential Energy', path: '/projectile-motion' },
      { label: 'Conservation of Energy', path: '/rotational-motion' },
      { label: 'Power', path: '/relative-motion' },
      { label: 'Mechanical Advantage and Efficiency', path: '/relative-motion' },
    ],
  },
  {
    title: 'Gravitation',
    description: 'about statics',
    links: [
      { label: 'Universal Law of Gravitation', path: '/newtons-laws' },
      { label: 'Gravitational Potential Energy', path: '/momentum' },
      { label: 'Orbits and Kepler’s Laws', path: '/energy-power' },
      { label: 'Escape Velocity', path: '/conservation-laws' },
      { label: 'Gravitational Field', path: '/conservation-laws' },
    ],
  },
  {
    title: 'Pressure and Fluids',
    description: 'about statics',
    links: [
      { label: 'Fluid Statics', path: '/linear-motion' },
      { label: 'Buoyancy and Archimedes’ Principle', path: '/circular-motion' },
      { label: 'Viscosity and Fluid Resistance', path: '/projectile-motion' },
    ],
  },
  {
    title: 'Elasticity and Deformation',
    description: 'about statics',
    links: [
      { label: 'Elasticity in Solids', path: '/newtons-laws' },
      { label: 'Stress-Strain Curve', path: '/momentum' },
      { label: 'Elastic Potential Energy', path: '/energy-power' },
      { label: 'Bulk and Shear Moduli', path: '/conservation-laws' },
      { label: 'Anisotropic and Viscoelastic Materials', path: '/newtons-laws' },
    ],
  },
  {
    title: 'Simple Harmonic Motion and Oscillations',
    description: 'about statics',
    links: [
      { label: 'Simple Harmonic Motion (SHM)', path: '/balanced-force' },
      { label: 'Energy in SHM', path: '/equilibrium' },
      { label: 'Damped Harmonic Motion', path: '/torques' },
      { label: 'Forced Oscillations and Resonance', path: '/center-of-mass' },
      { label: 'Coupled Oscillations', path: '/trusses' },
    ],
  },
  {
    title: 'Waves and Sound',
    description: 'about statics',
    links: [
      { label: 'Nature of Waves', path: '/linear-motion' },
      { label: 'Sound Waves', path: '/circular-motion' },
      { label: 'Doppler Effect', path: '/projectile-motion' },
      { label: 'Interference and Diffraction', path: '/rotational-motion' },
      { label: 'Wave Propagation in Different Media', path: '/relative-motion' },
    ],
  },
  {
    title: 'Rotational Dynamics',
    description: 'about statics',
    links: [
      { label: 'Rotational Motion', path: '/newtons-laws' },
      { label: 'Conservation of Angular Momentum', path: '/momentum' },
      { label: 'Gyroscopic Effects', path: '/energy-power' },
      { label: 'Flywheels and Rotational Energy', path: '/conservation-laws' },
      { label: 'Rotational Kinetic Energy and Work', path: '/conservation-laws' },
    ],
  },
];

// Main Component
const ClassicalPhysics = () => {
  const contentRef = useRef(null);

  // Scroll to content
  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Fix for useInView cleanup in useEffect
  useEffect(() => {
    // No need for manual scroll handling; useInView handles visibility
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-dark text-whiteSmoke font-sans overflow-hidden">
      {/* Header */}
     
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-accent font-serif uppercase tracking-wider">
            Classical Physics
          </h1>
          <p className="mt-4 text-lg md:text-xl text-center text-whiteSmoke/80">
            Classical physics deals with the fundamental principles of matter, energy, and their interactions. It encompasses the theories and concepts developed before the rise of modern physics, including Newtonian mechanics, electromagnetism, thermodynamics, and classical wave theory. These concepts form the foundation of many engineering and scientific disciplines.
          </p>
        </div>


      {/* Overlay Text */}
      <motion.div
        className="fixed px-8 py-3 bottom-10 left-1/2 transform -translate-x-1/2 bg-primary/70 rounded-full shadow-glow cursor-pointer backdrop-blur-md"
        onClick={scrollToContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, animation: 'fadeIn' }}
      >
        <p className="text-lg font-semibold text-secondary font-sans">
          Explore Classical Physics!
        </p>
      </motion.div>

      {/* Content Section */}
      <main
        ref={contentRef}
        className="relative z-10 pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <VerticalTimeline lineColor="transparent">
          {chapters.map((chapter, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });

            return (
              <VerticalTimelineElement
                key={index}
                date={`Chapter ${index + 1}`}
                iconStyle={{
                  background: 'linear-gradient(145deg, #38bdf8, #9333ea)',
                  color: '#fff',
                  boxShadow: '0 5px 15px rgba(147, 51, 234, 0.6)',
                }}
                icon={<FontAwesomeIcon icon={faBook} />}
                contentStyle={{
                  background: 'linear-gradient(145deg, #1e293b, #0a0a0a)',
                  color: '#f5f5f5',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.8), 0 5px 15px rgba(56, 189, 248, 0.4)',
                  borderRadius: '1rem',
                }}
                contentArrowStyle={{ borderRight: '10px solid #1e293b' }}
              >
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{
                    opacity: inView ? 1 : 0,
                    y: inView ? 0 : 50,
                    scale: inView ? 1 : 0.95,
                  }}
                  transition={{ duration: 1, animation: 'fadeIn' }}
                  className="relative p-6 md:p-8 bg-primary/80 rounded-xl backdrop-blur-lg shadow-glow group hover:shadow-lg transition-all duration-300"
                >
                  {/* Connector Line */}
                  <div className="absolute top-0 left-1/2 w-1 h-full transform -translate-x-1/2 bg-gradient-to-b from-accent via-dark to-secondary animate-pulse" />

                  {/* Description */}
                  <motion.div
                    className="text-lg font-semibold text-whiteSmoke/80 mb-4 font-sans"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {chapter.description}
                  </motion.div>

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Card title={chapter.title} links={chapter.links} />
                  </motion.div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-accent via-secondary to-accent opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                </motion.div>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center bg-primary shadow-inner">
        <p className="text-whiteSmoke/80 font-sans">
          &copy; {new Date().getFullYear()} Classical Physics Learning. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default ClassicalPhysics;