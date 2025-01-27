import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaAtom, FaFlask, FaRocket } from 'react-icons/fa';
import './HomePage.css';
import backgroundVideo from '../assets/vedio/1.mp4';
import AdvancedStarField from '../components/stars';
function HomePage() {
  return (
   
    <div className="relative min-h-screen">
      {/* Background Video Element */}
      {/* Background Video Element */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden', // Ensures content doesn't spill out
        }}
      >
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures the video covers the full container
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </motion.div>


      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 py-6 px-8 bg-black bg-opacity-70 shadow-xl backdrop-blur-md">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white tracking-wide uppercase">Physics Playground</h1>
          <div className="space-x-8">
            <Link to="/about" className="text-gray-300 hover:text-white transition duration-300 ease-in-out text-lg">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300 ease-in-out text-lg">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen pt-32 px-6 bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 flex justify-center items-center text-white overflow-hidden">
        <motion.div
          className="text-center max-w-6xl mx-auto p-12 bg-black bg-opacity-50 backdrop-blur-xl rounded-xl shadow-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Heading with Staggered Animation */}
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter leading-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          >
            Explore, Visualize, Learn
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-8 leading-relaxed opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            Unravel the secrets of the universe with immersive simulations, interactive experiments, and simplified explanations of complex concepts.
          </motion.p>

          {/* Call to Action Buttons with Icon Effects */}
          <motion.div className="flex justify-center gap-10 mt-12">
          <Link to="/classical-physics"  className="btn-primary">
                                                       
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 px-8 py-4 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FaPlay className="text-2xl" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Start with Classical Physics
                </motion.span>
              </motion.div>
            </Link>

            <Link to="/modern-physics" className="btn-secondary">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 px-8 py-4 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transform hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <FaAtom className="text-2xl" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Dive into Modern Physics
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Why Learn Physics Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-6xl mx-auto text-center px-8">
          <h2 className="text-4xl font-semibold mb-6 text-white">Why Physics?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Physics is the key to understanding the rules of the universe. From everyday phenomena to the most profound mysteries, physics equips you with the tools to see the world in a whole new way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Visualize Concepts",
                description: "Experience abstract theories come to life with vivid 3D animations and simulations.",
                image: 'src/assets/images/2.jpg',
              },
              {
                title: "Learn by Doing",
                description: "Interact with experiments and solve real-world problems to deepen your understanding.",
                image: 'src/assets/images/4.jpg',
              },
              {
                title: "Simplified Explanations",
                description: "Complex topics are broken down into simple, digestible lessons for learners of all levels.",
                image: 'src/assets/images/3.jpg',
              },
            ].map((item, index) => (
              <motion.div key={index} className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Simulations Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-black">
        <div className="max-w-6xl mx-auto text-center px-8">
          <h2 className="text-4xl font-semibold mb-6 text-white">Featured Simulations</h2>
          <p className="text-lg text-gray-300 mb-8">
            Explore these interactive experiences to see physics in action:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Gravity and Orbits", link: "/gravity-orbits", icon: <FaRocket /> },
              { title: "Electromagnetic Waves", link: "/em-waves", icon: <FaFlask /> },
              { title: "Quantum Tunneling", link: "/quantum-tunneling", icon: <FaAtom /> },
            ].map((simulation, index) => (
              <motion.div key={index} className="bg-black p-6 rounded-lg shadow-md hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  {simulation.icon} {simulation.title}
                </h3>
                <Link to={simulation.link} className="text-indigo-400 hover:text-indigo-600 transition">
                  View Simulation →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-black bg-opacity-60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto text-center px-8">
          <h2 className="text-4xl font-semibold mb-6 text-white">Join Our Community</h2>
          <p className="text-lg text-gray-300 mb-8">
            Physics Playground isn’t just a website—it’s a growing community of curious minds. Join us, ask questions, share ideas, and explore together!
          </p>
          <motion.div>
            <Link to="/join" className="btn-primary">
              Join Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage; 
