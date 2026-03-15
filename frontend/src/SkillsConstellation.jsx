import { motion } from 'framer-motion';
import { Code2, Sword, Terminal, Zap, Globe, Shield, Monitor, Brain } from 'lucide-react';
import './SkillsConstellation.css';

const ICONS = [Code2, Sword, Terminal, Zap, Globe, Shield, Monitor, Brain];

// Width percentages for a pleasing mosaic feel (must pair to fill rows neatly)
const WIDTHS = ['60%', '37%', '37%', '60%', '37%', '37%', '60%', '37%'];

const ACCENT_COLORS = [
  '#ff4500', '#ff6a00', '#e63900',
  '#ff3300', '#cc2200', '#ff5500',
  '#dd3300', '#ff7733',
];

export default function SkillsConstellation({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="sc-wrapper">
      <div className="sc-mosaic">
        {skills.map((skill, i) => {
          const Icon = ICONS[i % ICONS.length];
          const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];

          return (
            <motion.div
              key={skill.id || i}
              className="sc-tile"
              style={{ '--tile-accent': accent, '--tile-w': WIDTHS[i] || '47%' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="sc-tile-inner">

                {/* FRONT */}
                <div className="sc-face sc-front">
                  <div className="sc-front-glow" />
                  <Icon size={38} className="sc-tile-icon" />
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
