import { motion } from 'framer-motion';
import './IntroSplash.css';

export default function IntroSplash() {
  // Generate random blood bombs (explosions)
  const bloodBombs = Array.from({ length: 8 });

  return (
    <motion.div 
      className="intro-fullscreen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(30px)", scale: 1.2 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* 
        The main container smoothly zooms in over the 5 seconds 
        starting from black (opacity 0) 
      */}
      <motion.div 
        className="intro-camera-push"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.6, opacity: [0, 1, 1, 0.9] }}
        transition={{ duration: 5, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
      >
        
        {/* Fire Background */}
        <div className="intro-fire-bg" />

        {/* The Man & Sword */}
        <div className="intro-character-wrapper">
          <img 
            src="/dark-sword.png" 
            className="intro-character"
            alt="Dark Warrior"
          />
        </div>

        {/* Blood Bombs (Explosive bursts) */}
        <div className="intro-particles">
          {bloodBombs.map((_, i) => {
             const top = Math.random() * 80 + 10;
             const left = Math.random() * 80 + 10;
             const delay = Math.random() * 3;
             return (
               <motion.div
                 key={i}
                 className="blood-bomb"
                 style={{ top: `${top}%`, left: `${left}%` }}
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: [0, 3, 5], opacity: [0, 1, 0] }}
                 transition={{
                   duration: 1.5,
                   delay: delay,
                   ease: "easeOut",
                   repeat: Infinity,
                   repeatDelay: Math.random() * 2
                 }}
               />
             );
          })}
        </div>
        
        {/* Ambient floating ember/blood dust */}
        <div className="intro-particles">
          {Array.from({ length: 30 }).map((_, i) => (
             <motion.div
               key={`ember-${i}`}
               className="intro-blood-drop"
               style={{ 
                 width: Math.random() * 8 + 2, 
                 height: Math.random() * 8 + 2, 
                 left: `${Math.random() * 100}%`, 
                 bottom: '-10%' 
               }}
               animate={{
                 y: [0, -800 - Math.random() * 500],
                 x: [0, (Math.random() - 0.5) * 200],
                 opacity: [0, 1, 0]
               }}
               transition={{
                 duration: Math.random() * 2 + 1,
                 delay: Math.random() * 4,
                 ease: "easeOut",
                 repeat: Infinity
               }}
             />
          ))}
        </div>

      </motion.div>
    </motion.div>
  );
}
