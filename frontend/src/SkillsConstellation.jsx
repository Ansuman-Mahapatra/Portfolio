import { motion } from 'framer-motion';
import { Code2, Sword, Terminal, Zap } from 'lucide-react';

const ICONS = [Code2, Sword, Terminal, Zap, Code2, Sword, Terminal, Zap];

export default function SkillsConstellation({ skills }) {
  if (!skills || skills.length === 0) return null;

  const slashInLeft = {
    hidden: { opacity: 0, x: -80, skewX: 5 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
  };
  const slashInRight = {
    hidden: { opacity: 0, x: 80, skewX: -5 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
  };

  return (
    <div className="skills-grid">
      {skills.map((skill, index) => {
        const Icon = ICONS[index % ICONS.length];
        return (
          <motion.div
            key={skill.id || index}
            variants={index % 2 === 0 ? slashInLeft : slashInRight}
            className="skill-card glass-card"
          >
            <div className="skill-icon-wrapper">
              <Icon size={28} className="accent-icon" />
            </div>
            <h4>{skill.category}</h4>
            <p>{skill.skills}</p>
            {skill.officialUrl && (
              <a
                href={skill.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="skill-link"
                onClick={e => e.stopPropagation()}
              >
                Visit Official Site →
              </a>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

