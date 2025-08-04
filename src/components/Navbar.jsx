import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/classical-physics">Classical Physics</Link></li>
        <li><Link to="/modern-physics">Modern Physics</Link></li>
        <li><Link to="/statics/balanced-force">Balanced Force</Link></li>
        <li><Link to="/classical/motion/linear-motion">Linear Motion</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
