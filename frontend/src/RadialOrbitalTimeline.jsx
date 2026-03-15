import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Code2, ShieldAlert, Cpu } from "lucide-react";

export function RadialOrbitalTimeline({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  // Configuration
  const VISIBLE_COUNT = 7; // Must be odd
  const HALF_VISIBLE = Math.floor(VISIBLE_COUNT / 2);
  const ROTATION_INTERVAL = 4000;
  const ITEM_HEIGHT = 80;
  
  const ICONS = [Code2, Zap, Cpu, Sparkles, ShieldAlert];

  // Auto-rotation logic
  useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [activeIndex, isRotating]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const getVisibleItems = () => {
    let result = [];
    for (let i = -HALF_VISIBLE; i <= HALF_VISIBLE; i++) {
      let fetchIndex = (activeIndex + i) % items.length;
      if (fetchIndex < 0) fetchIndex += items.length;
      result.push({
        ...items[fetchIndex],
        originalIndex: fetchIndex,
        relativePosition: i
      });
    }
    return result;
  };

  const visibleItems = getVisibleItems();
  const activeItem = items[activeIndex];

  return (
    <div 
      className="radial-orbital-wrapper"
      onMouseEnter={() => setIsRotating(false)}
      onMouseLeave={() => setIsRotating(true)}
    >
      <div className="radial-container max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-black/95 rounded-3xl border border-[#ff4500]/20 shadow-2xl overflow-hidden relative min-h-[500px] md:min-h-[600px]">
        
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4500]/5 via-transparent to-[#1a0800]/50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#ff4500]/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

        {/* ORBITAL TIMELINE SECTION */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-[600px] flex items-center justify-center">
          
          {/* Orbital path lines */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-[#ff4500]/10 rounded-full border-l-transparent border-b-transparent transform rotate-45" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-[#ff4500]/5 rounded-full border-r-transparent border-b-transparent transform -rotate-12" />

          {/* Core center point - Hidden on small mobile to save space if needed, or moved */}
          <div className="absolute left-[-20px] md:left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#ff4500] rounded-full shadow-[0_0_20px_#ff4500] z-20">
            <div className="absolute inset-0 bg-[#ff4500] rounded-full animate-ping opacity-50" />
            <div className="absolute w-[100px] md:w-[200px] h-[1px] bg-gradient-to-r from-[#ff4500] to-transparent left-full top-1/2 -translate-y-1/2 opacity-30" />
          </div>

          <div className="relative w-full h-[350px] md:h-[500px]">
            <AnimatePresence initial={false}>
              {visibleItems.map((item, index) => {
                const { relativePosition, originalIndex } = item;
                const progress = (relativePosition + HALF_VISIBLE) / (VISIBLE_COUNT - 1);
                
                // Calculate position along curve
                const angle = (progress * Math.PI) - (Math.PI / 2); // -90 to 90 degrees
                const radiusX = 250;
                const radiusY = 300;
                
                const x = Math.cos(angle) * radiusX;
                const y = Math.sin(angle) * radiusY;
                
                const isActive = relativePosition === 0;
                let isHovered = hoveredIndex === originalIndex;

                const ItemIcon = ICONS[originalIndex % ICONS.length];

                return (
                  <motion.div
                    key={`${originalIndex}-${item.title}-${relativePosition}`}
                    className="absolute left-0 top-1/2 cursor-pointer z-10"
                    initial={{ opacity: 0, scale: 0.5, x: x - 50, y: y }}
                    animate={{
                      opacity: 1 - Math.abs(relativePosition) * 0.25,
                      scale: isActive ? 1.1 : 1 - Math.abs(relativePosition) * 0.1,
                      x: x + (isActive ? 40 : 20),
                      y: y,
                      zIndex: isActive ? 30 : 10 - Math.abs(relativePosition)
                    }}
                    exit={{ opacity: 0, scale: 0.5, x: x + 50, y: y }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      mass: 0.8
                    }}
                    onMouseEnter={() => setHoveredIndex(originalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setActiveIndex(originalIndex)}
                  >
                    <div className="relative flex items-center group -translate-y-1/2">
                      {/* Connection line to center */}
                      <motion.div 
                        className={`absolute right-full h-[1px] transform origin-right transition-all duration-500`}
                        animate={{
                          width: isActive ? `${x + 20}px` : `${Math.max(0, x - 20)}px`,
                          opacity: isActive ? 0.3 : 0.1,
                          backgroundColor: isActive ? '#ff4500' : '#888'
                        }}
                      />

                      {/* Node point */}
                      <div className={`
                        relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center
                        transition-colors duration-500 backdrop-blur-sm
                        ${isActive 
                          ? 'bg-[#1a0800] border-[#ff4500] shadow-[0_0_30px_rgba(255,69,0,0.3)]' 
                          : 'bg-black border-[#444] group-hover:border-[#ff4500]/50'}
                      `}>
                        <ItemIcon size={18} className={isActive ? 'text-[#ff4500]' : 'text-[#666] group-hover:text-[#ff4500]/70 transition-colors'} />
                        {isActive && (
                          <motion.div 
                            className="absolute inset-0 rounded-full border border-[#ff4500]"
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>

                      {/* Info label attached to node */}
                      <div className="ml-4 w-[280px]">
                        <motion.h3 
                          className={`font-semibold overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-300 ${
                            isActive ? 'text-white text-lg' : 'text-zinc-500 text-sm'
                          }`}
                        >
                          {item.title || item.name || item.role}
                        </motion.h3>
                        {(isActive || isHovered) && (item.subtitle || item.company) && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-[#ff4500] text-xs font-medium uppercase tracking-wider mt-1"
                          >
                            {item.subtitle || item.company}
                          </motion.p>
                        )}
                        {(isActive || isHovered) && item.date && (
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mt-1 block"
                          >
                            {item.date}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* DETAIL CONTENT SECTION */}
        <div className="w-full md:w-1/2 relative z-20 pl-0 md:pl-12">
          {items && items.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem?.id || activeIndex}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full justify-center"
              >
                {/* Type tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4500]/10 border border-[#ff4500]/20 text-[#ff4500] text-xs font-bold uppercase tracking-widest w-fit mb-6">
                  <Sparkles size={14} />
                  {activeItem?.type || activeItem?.subtitle || "Deployment Active"}
                </div>

                  {/* Title & Desc */}
                <h2 className="text-3xl md:text-5xl font-['Cinzel'] font-black text-white mb-6 leading-none tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#ff4500]/50">
                    {activeItem?.title || activeItem?.name}
                  </span>
                </h2>
                
                <p className="text-zinc-300 text-lg md:text-xl font-['Outfit'] font-light leading-relaxed mb-8 max-w-xl opacity-90">
                  {activeItem?.description || "The architecture is shielded. Data streams are being processed for active deployment overview."}
                </p>

                {/* Tech / Tags - Support multiple separators */}
                <div className="flex flex-wrap gap-3 mb-12">
                  {activeItem?.technologies?.split(/[•,|]+/).map((tech, i) => {
                    const cleanTech = tech.trim();
                    if (!cleanTech) return null;
                    return (
                      <span 
                        key={i} 
                        className="px-4 py-1.5 bg-[#ff4500]/5 border border-[#ff4500]/20 rounded-full text-[#ff4500] text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[#ff4500]/10 transition-colors"
                      >
                        {cleanTech}
                      </span>
                    );
                  })}
                </div>

                {/* Action */}
                {activeItem?.projectUrl && (
                  <a 
                    href={activeItem.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 bg-[#ff4500]/10 hover:bg-[#ff4500]/20 border border-[#ff4500]/30 hover:border-[#ff4500] text-white px-6 py-3 rounded-lg w-fit transition-all duration-300 shadow-[0_0_20px_rgba(255,69,0,0.1)]"
                  >
                    <span className="font-bold tracking-wide uppercase text-sm">Access Repository</span>
                    <ArrowRight size={16} className="text-[#ff4500] group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-zinc-500 italic">Scanning conquest logs...</div>
          )}
        </div>
      </div>
    </div>
  );
}
