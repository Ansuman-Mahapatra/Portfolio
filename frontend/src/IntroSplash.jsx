import { motion } from 'framer-motion';
import './IntroSplash.css';

export default function IntroSplash() {
  const bloodParticles = Array.from({ length: 80 });

  return (
    <motion.div 
      className="intro-fullscreen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px) brightness(3)", scale: 1.1 }}
      transition={{ duration: 1.5, ease: "easeIn" }}
    >
      <div className="intro-container">
        
        {/* Animated Silhouette to simulate flexing/charging up real movement */}
        <div className="intro-character-wrapper">
          <motion.img 
            src="/dark-sword.png" 
            className="intro-character"
            animate={{
              scale: [1, 1.05, 1, 1.15, 1.1, 1.4],
              rotate: [0, -1, 1, -3, 2, 0],
              y: [0, 5, 0, 15, -10, 40],
              filter: [
                "contrast(1.2) brightness(0.9)",
                "contrast(1.3) brightness(1.1)",
                "contrast(1.2) brightness(0.9)",
                "contrast(1.5) brightness(1.3)",
                "contrast(1.4) brightness(1)",
                "contrast(2) brightness(2) drop-shadow(0 0 50px #ff4500)"
              ]
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              times: [0, 0.4, 0.5, 0.7, 0.8, 1]
            }}
          />
        </div>

        {/* Erupting Fire Background */}
        <motion.div 
          className="intro-fire-bg"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(200, 50, 0, 0.2) 0%, #000 60%)",
              "radial-gradient(circle at 50% 50%, rgba(255, 80, 0, 0.6) 0%, #000 70%)",
              "radial-gradient(circle at 50% 50%, rgba(255, 120, 0, 0.9) 0%, #110 80%)",
              "radial-gradient(circle at 50% 50%, rgba(255, 200, 100, 1) 0%, #210 90%)"
            ],
            opacity: [0.3, 0.6, 1, 1]
          }}
          transition={{ duration: 5, times: [0, 0.6, 0.8, 1] }}
        />

        {/* Dynamic Blood & Embers swirling around him */}
        <div className="intro-particles">
          {bloodParticles.map((_, i) => {
             const size = Math.random() * 8 + 2; 
             const delay = Math.random() * 3;
             const duration = Math.random() * 1.5 + 0.5;
             const startX = Math.random() * 100;
             const endX = startX + (Math.random() - 0.5) * 50;
             return (
               <motion.div
                 key={i}
                 className="intro-blood-drop"
                 style={{ width: size, height: size, left: `${startX}%`, bottom: '-10%' }}
                 animate={{
                   y: [0, -600 - Math.random() * 400],
                   x: [0, endX - startX],
                   opacity: [0, 1, 0],
                   scale: [0, 2, 0.5]
                 }}
                 transition={{
                   duration: duration,
                   delay: delay,
                   ease: "easeOut",
                   repeat: Infinity
                 }}
               />
             );
          })}
        </div>

      </div>
    </motion.div>
  );
}
