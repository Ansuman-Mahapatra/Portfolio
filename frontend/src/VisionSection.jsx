import { motion } from 'framer-motion';
import './VisionSection.css';

export default function VisionSection() {
  // Generate blood particle array
  const bloodParticles = Array.from({ length: 40 });

  return (
    <div className="vision-container">
      <div className="vision-background glass-card">
        
        {/* Generated Silhouette Image */}
        <div className="vision-img-wrapper">
          <img src="/dark-sword.png" alt="Dark Sword Silhouette" className="vision-image" />
        </div>

        {/* Animated Flames Overlay */}
        <div className="fire-overlay" />
        <div className="fire-overlay fire-overlay-2" />

        {/* Animated Blood Dust Overlay */}
        <div className="blood-particles-container">
          {bloodParticles.map((_, i) => {
            const size = Math.random() * 6 + 2; 
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            const left = Math.random() * 100;
            const dx = (Math.random() - 0.5) * 100;
            return (
                <motion.div
                  key={i}
                  className="blood-particle"
                  style={{ width: size, height: size, left: `${left}%`, bottom: '-5%' }}
                  animate={{ y: [0, -300 - Math.random() * 200], x: [0, dx, dx * 1.5], opacity: [0, 0.8, 0], scale: [0, 1.5, 0.5] }}
                  transition={{ duration: duration, ease: "easeOut", repeat: Infinity, delay: delay }}
                />
              );
            })}
          </div>

          <div className="vision-text-content">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            THE DARK VISIONS
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            "A man taking a sword in front of him, shown in only black. Flames everywhere. Blood surrounds him."
          </motion.p>
        </div>
      </div>
    </div>
  );
}
