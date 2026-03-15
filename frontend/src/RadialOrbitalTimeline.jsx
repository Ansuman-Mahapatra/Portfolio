import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Code2, ShieldAlert, Cpu, Database } from "lucide-react";

export function RadialOrbitalTimeline({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  // Configuration
  const VISIBLE_COUNT = items.length > 0 ? Math.min(items.length, 7) : 0;
  const HALF_VISIBLE = Math.floor(VISIBLE_COUNT / 2);
  const ROTATION_INTERVAL = 5000;
  
  const ICONS = [Code2, Zap, Cpu, Sparkles, ShieldAlert];

  // Logic to handle small or empty datasets
  useEffect(() => {
    if (items.length > 0 && activeIndex >= items.length) {
      setActiveIndex(0);
    }
  }, [items, activeIndex]);

  // Auto-rotation logic
  useEffect(() => {
    if (!isRotating || items.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [activeIndex, isRotating, items.length]);

  const getVisibleItems = () => {
    if (items.length === 0) return [];
    
    // For small arrays, we show everything or pad
    if (items.length <= 3) {
      return items.map((item, idx) => ({
        ...item,
        originalIndex: idx,
        relativePosition: idx - activeIndex
      }));
    }

    let result = [];
    const count = Math.min(items.length, 7);
    const half = Math.floor(count / 2);

    for (let i = -half; i <= half; i++) {
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
  const activeItem = items.length > 0 ? items[activeIndex] : null;

  return (
    <div 
      className="radial-orbital-wrapper w-full max-w-7xl mx-auto"
      onMouseEnter={() => setIsRotating(false)}
      onMouseLeave={() => setIsRotating(true)}
    >
      <div className="radial-container flex flex-col md:flex-row items-center gap-10 bg-black/40 backdrop-blur-xl rounded-[40px] border border-white/5 p-6 md:p-12 min-h-[650px] relative shadow-2xl">
        
        {/* Background Visuals */}
        <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff4500]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ff4500]/5 blur-[120px] rounded-full" />
        </div>

        {/* 1. LEFT: THE SELECTION WHEEL */}
        <div className="relative w-full md:w-1/2 h-[450px] md:h-[600px] flex items-center justify-center">
            {items.length === 0 ? (
                <div className="flex flex-col items-center text-zinc-600">
                    <Database className="animate-pulse mb-4" size={48} />
                    <p className="font-['Outfit'] tracking-widest uppercase text-sm">Awaiting Database Feed...</p>
                </div>
            ) : (
                <div className="relative w-full h-full">
                    {/* The Rail */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-gradient-to-b from-transparent via-[#ff4500]/20 to-transparent rounded-full" />
                    
                    <AnimatePresence initial={false}>
                        {visibleItems.map((item) => {
                            const { relativePosition, originalIndex } = item;
                            const isActive = originalIndex === activeIndex;
                            const isHovered = hoveredIndex === originalIndex;
                            
                            const offset = relativePosition * 90;
                            const opacity = 1 - Math.abs(relativePosition) * 0.3;
                            const scale = isActive ? 1 : 0.85;

                            const ItemIcon = ICONS[originalIndex % ICONS.length];

                            return (
                                <motion.div
                                    key={`orbit-${originalIndex}-${relativePosition}`}
                                    className="absolute left-4 top-1/2 cursor-pointer origin-left"
                                    initial={{ opacity: 0, x: -20, y: offset }}
                                    animate={{ 
                                        opacity, 
                                        x: isActive ? 20 : 0, 
                                        y: offset,
                                        scale,
                                        zIndex: isActive ? 50 : 10
                                    }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onClick={() => setActiveIndex(originalIndex)}
                                    onMouseEnter={() => setHoveredIndex(originalIndex)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                                >
                                    <div className="flex items-center gap-6 group">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                                            isActive 
                                            ? 'bg-[#ff4500] border-[#ff4500] shadow-[0_0_30px_#ff450066]' 
                                            : 'bg-white/5 border-white/10 group-hover:border-[#ff4500]/50'
                                        }`}>
                                            <ItemIcon size={20} className={isActive ? 'text-white' : 'text-zinc-500'} />
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="glow"
                                                    className="absolute inset-0 rounded-2xl bg-[#ff4500]/20 blur-xl"
                                                />
                                            )}
                                        </div>
                                        
                                        <div className="flex flex-col">
                                            <span className={`font-['Cinzel'] font-bold tracking-wider transition-colors duration-300 ${
                                                isActive ? 'text-white text-lg' : 'text-zinc-600 group-hover:text-zinc-400'
                                            }`}>
                                                {item.title || item.name}
                                            </span>
                                            {isActive && (
                                                <span className="text-[#ff4500] text-[10px] uppercase font-black tracking-[0.2em]">
                                                   PROJECT_NODE_{originalIndex + 1}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>

        {/* 2. RIGHT: THE DETAIL BLADE */}
        <div className="w-full md:w-1/2 min-h-[400px] flex flex-col justify-center border-l border-white/5 pl-0 md:pl-16">
          <AnimatePresence mode="wait">
            {activeItem ? (
                <motion.div
                    key={activeItem.id || activeIndex}
                    initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[2px] w-8 bg-[#ff4500]" />
                        <span className="text-[#ff4500] text-xs font-black uppercase tracking-[0.3em] font-['Outfit']">
                            {activeItem.type || activeItem.subtitle || "DATABASE_OBJECT"}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-['Cinzel'] font-black text-white mb-8 leading-none">
                        {activeItem.title || activeItem.name}
                    </h2>

                    <p className="text-zinc-400 text-lg md:text-xl font-['Outfit'] font-light leading-relaxed mb-10 opacity-80 border-l border-[#ff4500]/20 pl-6">
                        {activeItem.description || "Segment encrypted. Data successfully retrieved from core database."}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-12">
                        {activeItem.technologies?.split(/[•,|]+/).map((tech, i) => {
                            const t = tech.trim();
                            if (!t) return null;
                            return (
                                <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-zinc-300 text-xs font-bold uppercase tracking-widest hover:border-[#ff4500]/30 transition-all">
                                    {t}
                                </span>
                            );
                        })}
                    </div>

                    {activeItem.projectUrl && (
                        <a 
                            href={activeItem.projectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative flex items-center justify-center gap-4 bg-white text-black font-['Outfit'] font-black uppercase text-sm tracking-widest px-10 py-5 rounded-2xl hover:bg-[#ff4500] hover:text-white transition-all duration-500 overflow-hidden"
                        >
                            <span className="relative z-10">Access Conquest</span>
                            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                            <div className="absolute inset-0 bg-[#ff4500] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                        </a>
                    )}
                </motion.div>
            ) : (
                <div className="text-zinc-700 font-['Cinzel'] text-xl italic">
                    {items.length === 0 ? "NO LOCAL DATA FOUND" : "SELECT A NODE"}
                </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
