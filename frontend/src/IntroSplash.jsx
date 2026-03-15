import { motion } from 'framer-motion';

export default function IntroSplash() {
  return (
    <motion.div 
      className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <motion.img 
          src="/logo.png" 
          alt="Ansuman Logo" 
          className="w-auto h-auto max-w-[80vw] max-h-[70vh] object-contain"
          // Subtle pulse of the fire aura
          animate={{
            filter: [
              "drop-shadow(0 0 20px rgba(255,69,0,0.2))",
              "drop-shadow(0 0 60px rgba(255,69,0,0.6))",
              "drop-shadow(0 0 20px rgba(255,69,0,0.2))"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
