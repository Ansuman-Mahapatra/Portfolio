import { motion } from 'framer-motion';
import { Code2, Sword, Terminal, Zap, Globe, Shield, Monitor, Brain, ExternalLink } from 'lucide-react';
import './SkillsConstellation.css';

const ICONS = [Code2, Sword, Terminal, Zap, Globe, Shield, Monitor, Brain];

const CATEGORY_COLORS = [
  { bg: 'rgba(255,69,0,0.08)',  border: 'rgba(255,69,0,0.3)',  dot: '#ff4500' },
  { bg: 'rgba(255,120,0,0.08)', border: 'rgba(255,120,0,0.3)', dot: '#ff7800' },
  { bg: 'rgba(220,40,0,0.08)',  border: 'rgba(220,40,0,0.3)',  dot: '#dc2800' },
  { bg: 'rgba(255,80,30,0.08)', border: 'rgba(255,80,30,0.3)', dot: '#ff501e' },
  { bg: 'rgba(200,50,0,0.08)',  border: 'rgba(200,50,0,0.3)',  dot: '#c83200' },
  { bg: 'rgba(255,100,0,0.08)', border: 'rgba(255,100,0,0.3)', dot: '#ff6400' },
  { bg: 'rgba(180,40,0,0.08)',  border: 'rgba(180,40,0,0.3)',  dot: '#b42800' },
  { bg: 'rgba(255,60,0,0.08)',  border: 'rgba(255,60,0,0.3)',  dot: '#ff3c00' },
];

export default function SkillsConstellation({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="sk-wrapper">
      <div className="sk-grid">
        {skills.map((skill, i) => {
          const Icon = ICONS[i % ICONS.length];
          const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
          const tags = skill.skills.split(/[,•]/).map(s => s.trim()).filter(Boolean);

          return (
            <motion.div
              key={skill.id || i}
              className="sk-card"
              style={{ '--sk-dot': color.dot, '--sk-bg': color.bg, '--sk-border': color.border }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Card header */}
              <div className="sk-header">
                <div className="sk-icon-box">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="sk-cat">{skill.category}</h4>
                  <span className="sk-count">{tags.length} skills</span>
                </div>
                {skill.officialUrl && (
                  <a
                    href={skill.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sk-ext-link"
                    title="Official docs"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              {/* Divider */}
              <div className="sk-divider" />

              {/* Skill tags */}
              <div className="sk-tags">
                {tags.map((tag, j) => (
                  <span key={j} className="sk-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
