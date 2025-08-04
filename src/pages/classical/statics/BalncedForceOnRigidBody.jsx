"use client";
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";

const BalancedForceOnRigidBody = () => {
  const [activeEditor, setActiveEditor] = useState('bruteForce');
  const [copied, setCopied] = useState(false);

  const bruteForceCode = `
#include <vector>
#include <iostream>
#include <cmath>

struct Force {
    double Fx;  // x-component of force (N)
    double Fy;  // y-component of force (N)
    double x;   // x-position from pivot (m)
    double y;   // y-position from pivot (m)
};

bool isInEquilibrium(const std::vector<Force>& forces) {
    double sumFx = 0.0;     // Total x-component force
    double sumFy = 0.0;     // Total y-component force
    double sumTorque = 0.0; // Total torque about pivot

    for (const auto& f : forces) {
        sumFx += f.Fx;                    // Sum x-components
        sumFy += f.Fy;                    // Sum y-components
        sumTorque += f.x * f.Fy - f.y * f.Fx; // Torque = r × F (cross product)
    }

    return std::abs(sumFx) < 1e-9 && std::abs(sumFy) < 1e-9 && std::abs(sumTorque) < 1e-9;
}

int main() {
    std::vector<Force> forces = {
        {1.0, 0.0, 1.0, 0.0},
        {-1.0, 0.0, 2.0, 0.0}
    };
    std::cout << (isInEquilibrium(forces) ? "In Equilibrium" : "Not in Equilibrium") << "\\n";
    return 0;
}
`;

  const betterCode = `
#include <vector>
#include <numeric>
#include <iostream>
#include <cmath>

struct Force {
    double Fx;  // x-component of force (N)
    double Fy;  // y-component of force (N)
    double x;   // x-position from pivot (m)
    double y;   // y-position from pivot (m)
};

bool isInEquilibrium(const std::vector<Force>& forces) {
    double sumFx = std::accumulate(forces.begin(), forces.end(), 0.0,
        [](double sum, const Force& f) { return sum + f.Fx; });
    double sumFy = std::accumulate(forces.begin(), forces.end(), 0.0,
        [](double sum, const Force& f) { return sum + f.Fy; });
    double sumTorque = std::accumulate(forces.begin(), forces.end(), 0.0,
        [](double sum, const Force& f) { return sum + f.x * f.Fy - f.y * f.Fx; });

    return std::abs(sumFx) < 1e-9 && std::abs(sumFy) < 1e-9 && std::abs(sumTorque) < 1e-9;
}

int main() {
    std::vector<Force> forces = {
        {1.0, 0.0, 1.0, 0.0},
        {-1.0, 0.0, 2.0, 0.0}
    };
    std::cout << (isInEquilibrium(forces) ? "In Equilibrium" : "Not in Equilibrium") << "\\n";
    return 0;
}
`;

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-90 min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <section className="relative flex flex-col items-center justify-start bg-gradient-to-b from-indigo-100 via-pink-100 to-indigo-200 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-800 uppercase tracking-wide font-serif text-center mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Balanced Forces on a Rigid Body
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Exploring Equilibrium in Physics with Computational Solutions and Data Structures
        </motion.p>

        {/* Physics Concept Section */}
        <motion.section
          className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-indigo-700 mb-6 font-serif"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Physics Concept
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 mb-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            In physics, a rigid body is in <strong className="text-indigo-600 relative group">
              equilibrium
              <span className="absolute hidden group-hover:block bg-indigo-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                A state where no net acceleration occurs
              </span>
            </strong> when it experiences no net acceleration, meaning it either remains at rest or moves with constant velocity. This state is achieved when two conditions are met:
          </motion.p>
          <ul className="list-disc list-inside text-gray-600 space-y-4 mb-6">
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <strong>Translational Equilibrium</strong>: The sum of all forces acting on the body must be zero, ensuring no linear acceleration. Mathematically, this is expressed as:
              <br />
              <span className="font-mono bg-gray-100 p-2 rounded text-sm sm:text-base">ΣF = 0</span>
              <br />
              From a DSA perspective, this requires iterating over a collection of force vectors (e.g., stored in a <code className="bg-gray-100 px-2 py-1 rounded relative group">
                std::vector
                <span className="absolute hidden group-hover:block bg-indigo-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                  A dynamic array in C++ for storing forces
                </span>
              </code>) and summing their x- and y-components, an operation with O(n) time complexity where n is the number of forces.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <strong>Rotational Equilibrium</strong>: The sum of all torques (moments) about any point must be zero, preventing rotational acceleration. This is expressed as:
              <br />
              <span className="font-mono bg-gray-100 p-2 rounded text-sm sm:text-base">Στ = 0</span>
              <br />
              In DSA terms, torque calculation involves computing the cross product for each force and its position vector, again requiring a linear traversal of the force data structure, resulting in O(n) complexity.
            </motion.li>
          </ul>
          <motion.p
            className="text-base sm:text-lg text-gray-600"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            These conditions ensure the body does not accelerate linearly or rotationally. The use of a <code className="bg-gray-100 px-2 py-1 rounded">std::vector</code> to store forces is ideal due to its dynamic size and contiguous memory, which provides O(1) access time for iteration, making it efficient for processing forces in equilibrium calculations.
          </motion.p>
          <motion.div
            className="mt-6 bg-gray-100 h-32 sm:h-40 md:h-48 flex items-center justify-center rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-gray-500 text-sm sm:text-base">[Diagram: Rod with forces and pivot point]</p>
          </motion.div>
        </motion.section>

        {/* Problem Statement Section */}
        <motion.section
          className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-indigo-700 mb-6 font-serif"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Problem Statement
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Consider a rigid rod of length <strong className="text-indigo-600">L</strong>, fixed at one end (the pivot). Two forces, <strong className="text-indigo-600">F1</strong> and <strong className="text-indigo-600">F2</strong>, are applied at distances <strong className="text-indigo-600">d1</strong> and <strong className="text-indigo-600">d2</strong> from the pivot, respectively. Each force has components in the x- and y-directions, and their positions are defined relative to the pivot. The goal is to determine whether the rod is in equilibrium by checking if the net force and net torque are zero.
          </motion.p>
          <motion.p
            className="text-base sm:text-lg text-gray-600 mt-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            From a DSA perspective, this problem involves processing a collection of force objects, each containing force components and position coordinates. A suitable data structure, such as a <code className="bg-gray-100 px-2 py-1 rounded">std::vector</code>, allows efficient storage and iteration. The algorithm must compute sums of forces and torques, leveraging linear-time operations to ensure scalability for larger datasets.
          </motion.p>
        </motion.section>

        {/* Intuition Section */}
        <motion.section
          className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-indigo-700 mb-6 font-serif"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Intuition
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 mb-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            To keep the rod balanced, two key physical principles must be satisfied, which align closely with DSA concepts:
          </motion.p>
          <ul className="list-disc list-inside text-gray-600 space-y-4 mb-6">
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              The <strong>net force</strong> must be zero, meaning all forces cancel out in both magnitude and direction. This is akin to summing elements in an array (or vector) to check if they balance to zero, a common operation in DSA. For example, iterating over a <code className="bg-gray-100 px-2 py-1 rounded">std::vector</code> of forces to compute <code className="bg-gray-100 px-2 py-1 rounded">sumFx</code> and <code className="bg-gray-100 px-2 py-1 rounded">sumFy</code> is a linear-time reduction operation.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              The <strong>net torque</strong> must be zero, ensuring no rotational motion. Torque is calculated as the cross product of position and force vectors, requiring a similar linear traversal of the data structure. This computation mirrors DSA patterns where each element contributes to a cumulative result, such as prefix sums or fold operations.
            </motion.li>
          </ul>
          <motion.p
            className="text-base sm:text-lg text-gray-600"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            Intuitively, imagine a seesaw: equal weights at equal distances from the pivot keep it level. In DSA terms, this balance is achieved by efficiently processing a list of forces using a data structure that supports fast access and iteration, ensuring the algorithm scales well with the number of forces.
          </motion.p>
        </motion.section>

        {/* Code Solutions Section */}
        <motion.section
          className="max-w-4xl mx-auto mt-12 p-6 sm:p-8 bg-white rounded-2xl shadow-lg sticky top-0 z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mb-6 font-serif">
            Solutions in C++
          </h3>
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {['Brute Force', 'Better Solution'].map((tab) => (
              <motion.button
                key={tab}
                className={`px-6 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 border-2 bg-gradient-to-r ${
                  activeEditor === tab.toLowerCase().replace(' ', '')
                    ? 'from-indigo-600 to-purple-600 text-white border-indigo-700 shadow-lg'
                    : 'from-white to-gray-100 text-indigo-600 border-indigo-300 hover:from-indigo-50 hover:to-indigo-100 hover:border-indigo-400'
                } min-w-[120px] touch-manipulation`}
                onClick={() => setActiveEditor(tab.toLowerCase().replace(' ', ''))}
                onTouchStart={() => setActiveEditor(tab.toLowerCase().replace(' ', ''))}
                whileHover={{ scale: 1.05, boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={activeEditor === tab.toLowerCase().replace(' ', '')}
              >
                {tab}
              </motion.button>
            ))}
          </div>
          <div className="w-full p-2 relative">
            <motion.button
              className="absolute top-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors duration-300"
              onClick={() => handleCopyCode(activeEditor === 'bruteForce' ? bruteForceCode : betterCode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </motion.button>
            <SyntaxHighlighter
              language="cpp"
              style={dark}
              showLineNumbers={true}
              codeTagProps={{ style: { whiteSpace: "pre-wrap" } }}
              className="w-full max-h-[400px] overflow-auto rounded-lg border border-gray-200 p-4 text-sm"
            >
              {activeEditor === 'bruteForce' ? bruteForceCode : betterCode}
            </SyntaxHighlighter>
          </div>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4 font-serif">Optimization Insights</h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Both solutions run in <strong className="text-indigo-600">O(n)</strong> time, where n is the number of forces, as each force must be processed to compute sums and torques. This is optimal since every force contributes to the equilibrium conditions. The "Brute Force" solution uses a simple for-loop to iterate over the <code className="bg-gray-100 px-2 py-1 rounded">std::vector</code>, performing direct summation.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mt-3">
              The "Better Solution" leverages <code className="bg-gray-100 px-2 py-1 rounded relative group">
                std::accumulate
                <span className="absolute hidden group-hover:block bg-indigo-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                  A C++ STL function for reducing a range
                </span>
              </code>, a higher-level abstraction from the C++ Standard Library. This not only improves code readability but also aligns with functional programming paradigms, reducing the chance of errors in manual summation. The use of lambda functions in <code className="bg-gray-100 px-2 py-1 rounded">std::accumulate</code> demonstrates how DSA concepts like reduction can be applied to physics problems, transforming a sequence of forces into a single result (net force or torque).
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mt-3">
              For massive datasets (e.g., millions of forces), further optimizations could include:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-3">
              <li>
                <strong>Parallel Processing</strong>: Using multithreading (e.g., OpenMP) or GPU parallelization to distribute summation tasks across cores, reducing runtime for large n. This is a common DSA technique for scaling linear algorithms.
              </li>
              <li>
                <strong>Prefix Sums</strong>: If forces are applied in a structured pattern, prefix sum algorithms could precompute partial sums, enabling faster queries for subsets of forces, a technique often used in range-sum problems in DSA.
              </li>
              <li>
                <strong>Data Structure Optimization</strong>: For dynamic systems where forces are frequently added or removed, a more complex data structure like a segment tree could maintain running sums, though this may be overkill for static force sets.
              </li>
            </ul>
            <p className="text-base sm:text-lg text-gray-600 mt-3">
              For most practical scenarios, the "Better Solution" is efficient and maintainable, balancing physics accuracy with DSA elegance. The choice of <code className="bg-gray-100 px-2 py-1 rounded">std::vector</code> ensures cache-friendly memory access, critical for performance in iterative computations.
            </p>
          </motion.div>
        </motion.section>
      </section>
    </article>
  );
};

export default BalancedForceOnRigidBody;