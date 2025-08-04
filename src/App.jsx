import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import About from './pages/About';
import Contact from './pages/Contact';
import ClassicalPhysics from './pages/ClassicalPhysics';
import ModernPhysics from './pages/ModernPhysics';
import LinearMotion from './pages/classical/motion/LinearMotion/LinearMotion';
import HomePage from './pages/HomePage';
import BalancedForceOnRigidBody from './pages/classical/statics/BalncedForceOnRigidBody';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/physics-playground/" element={<HomePage />} />
        <Route path="/physics-playground/about" element={<About />} />
        <Route path="/physics-playground/contact" element={<Contact />} />
        <Route path="/physics-playground/classical-physics" element={<ClassicalPhysics />} />
        <Route path="/physics-playground/modern-physics" element={<ModernPhysics />} />

        {/* Classical Physics */}
        <Route path="/physics-playground/classical/motion/linear-motion" element={<LinearMotion />} />
        <Route path="/physics-playground/classical/statics/balanced-force-on-rigid-body" element={<BalancedForceOnRigidBody />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
