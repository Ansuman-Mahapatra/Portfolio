import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sword, Terminal, Zap, Globe, Shield, Monitor, Brain } from 'lucide-react';
import './SkillsConstellation.css';

const ICONS = [Code2, Sword, Terminal, Zap, Globe, Shield, Monitor, Brain];

// Hexagonal positions for up to 8 cells arranged in a honeycomb
const HEX_POSITIONS = [
  { col: 1, row: 0 },  // top-centre
  { col: 2, row: 0 },  // top-right
  { col: 2, row: 1 },  // mid-right
  { col: 1, row: 1 },  // centre
  { col: 0, row: 1 },  // mid-left
  { col: 0, row: 0 },  // top-left
  { col: 0, row: 2 },  // bottom-left
  { col: 1, row: 2 },  // bottom-centre
];

export default function SkillsConstellation({ skills }) {
  const [active, setActive] = useState(null);

  const HEX_W = 220;
  const HEX_H = 190;
  const X_STEP = HEX_W * 0.78;
  const Y_STEP = HEX_H * 0.87;
  const OFFSET_X_ODD = HEX_W * 0.39;

  return (
    <div className="sc-wrapper">
      <div className="sc-hex-grid">
        {skills.map((skill, i) => {
          const pos = HEX_POSITIONS[i] || { col: i % 3, row: Math.floor(i / 3) };
          const x = pos.col * X_STEP + (pos.row % 2 === 1 ? OFFSET_X_ODD : 0);
          const y = pos.row * Y_STEP;
          const Icon = ICONS[i % ICONS.length];
          const isActive = active === i;

          return (
            <motion.div
              key={skill.id}
              className={`sc-hex ${isActive ? 'sc-active' : ''}`}
              style={{ '--hex-x': `${x}px`, '--hex-y': `${y}px` }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.08 }}
              onClick={() => setActive(isActive ? null : i)}
              whileHover={{ scale: 1.07 }}
            >
              {/* Hex shape via clip-path */}
              <div className="sc-hex-inner">
                <div className="sc-hex-glow" />
                <Icon className="sc-icon" size={30} />
                <span className="sc-category">{skill.category}</span>

                {/* Expanded skill list */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="sc-skills-popup"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {skill.skills.split(/[,]/).map((s, j) => (
                        <span key={j} className="sc-tag">{s.trim()}</span>
                      ))}
                      {skill.officialUrl && (
                        <a
                          href={skill.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="sc-link"
                          onClick={e => e.stopPropagation()}
                        >
                          Official Docs →
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pulsing ring when active */}
              {isActive && <div className="sc-pulse-ring" />}
            </motion.div>
          );
        })}
      </div>

      <p className="sc-hint">Tap / click a node to expand its arsenal</p>
    </div>
  );
}
