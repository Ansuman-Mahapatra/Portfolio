import React from 'react';
import './FireParticles.css';

const FireParticles = () => {
  const embers = Array.from({ length: 80 }).map((_, i) => ({
    id: `ember-${i}`,
    left: `${Math.random() * 100}%`,
    duration: `${2 + Math.random() * 4}s`,
    delay: `${Math.random() * 5}s`,
    size: `${2 + Math.random() * 5}px`,
    opacity: Math.random() * 0.8 + 0.2,
    wiggle: Math.random() > 0.5 ? 30 : -30
  }));

  const bubbles = Array.from({ length: 25 }).map((_, i) => ({
    id: `bubble-${i}`,
    left: `${Math.random() * 100}%`,
    duration: `${6 + Math.random() * 8}s`,
    delay: `${Math.random() * 10}s`,
    size: `${30 + Math.random() * 80}px`,
    wiggle: `${Math.random() * 150 - 75}px`
  }));

  return (
    <div className="fire-particles-container">
      {/* Background fiery gradient shift */}
      <div className="fire-bg-shift"></div>

      {/* Floating Magma Bubbles */}
      {bubbles.map(b => (
        <div 
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: b.duration,
            animationDelay: b.delay,
            '--wiggle': b.wiggle
          }}
        />
      ))}
      
      {/* Rising Embers */}
      {embers.map(e => (
        <div 
          key={e.id}
          className="ember"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            animationDuration: e.duration,
            animationDelay: e.delay,
            '--start-opacity': e.opacity,
            '--wiggle': `${e.wiggle}px`
          }}
        />
      ))}

      {/* Burning Fire Base */}
      <div className="fire-base"></div>
    </div>
  );
};

export default FireParticles;
