import { motion } from 'framer-motion';
import { Code2, Sword, Terminal, Zap, Globe, Shield, Monitor, Brain } from 'lucide-react';
import './SkillsConstellation.css';

const ICONS = [Code2, Sword, Terminal, Zap, Globe, Shield, Monitor, Brain];

// Explicit grid-area class per position — guarantees zero-gap mosaic
const AREA_CLASSES = [
  'tile-area-0',   // Programming Languages — large 2×2
  'tile-area-1',   // Frameworks            — small 1×1
  'tile-area-2',   // Databases             — tall  1×2
  'tile-area-3',   // Tools                 — small 1×1
  'tile-area-4',   // Cloud Platforms       — small 1×1
  'tile-area-5',   // DevOps                — wide  2×2
  'tile-area-6',   // OS                    — tall  1×2
  'tile-area-7',   // Soft Skills           — wide  2×1
];

const ACCENT_COLORS = [
  '#ff4500', '#ff6a00', '#e63900',
  '#ff3300', '#cc2200', '#ff5500',
  '#dd3300', '#ff7733',
];

export default function SkillsConstellation({ skills }) {
  return (
    <div className="sc-wrapper">
      <div className="sc-mosaic">
        {skills.map((skill, i) => {
          const Icon = ICONS[i % ICONS.length];
          const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
          const sizeClass = SIZES[i] || 'tile-medium';

          return (
            <motion.div
              key={skill.id}
              className={`sc-tile ${AREA_CLASSES[i] || 'tile-area-1'}`}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 110, damping: 16, delay: i * 0.07 }}
              style={{ '--tile-accent': accent }}
            >
              <div className="sc-tile-inner">

                {/* FRONT */}
                <div className="sc-face sc-front">
                  <div className="sc-front-glow" />
                  <Icon size={40} className="sc-tile-icon" />
                  <h4 className="sc-tile-cat">{skill.category}</h4>
                  <span className="sc-tile-hint">hover to explore</span>
                </div>

                {/* BACK */}
                <div className="sc-face sc-back">
                  <p className="sc-back-title">{skill.category}</p>
                  <div className="sc-back-tags">
                    {skill.skills.split(/[,•]/).map((s, j) => (
                      <span key={j} className="sc-back-tag">{s.trim()}</span>
                    ))}
                  </div>
                  {skill.officialUrl && (
                    <a
                      href={skill.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="sc-back-link"
                    >
                      Official Docs →
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
