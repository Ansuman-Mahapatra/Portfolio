import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import './ProjectTimeline.css';

// Gradient themes per project type
const TYPE_GRADIENTS = {
  'Java Desktop Applications':      'linear-gradient(135deg, #3a1200 0%, #1a0800 100%)',
  'Java Backend Projects':           'linear-gradient(135deg, #0d1f3a 0%, #060e1a 100%)',
  'Full-Stack & Intelligent Systems':'linear-gradient(135deg, #1a0d30 0%, #080412 100%)',
};

const TYPE_BADGE_COLORS = {
  'Java Desktop Applications':      { bg: 'rgba(255,80,0,0.15)',  color: '#ff6622', border: 'rgba(255,80,0,0.3)'  },
  'Java Backend Projects':           { bg: 'rgba(30,100,255,0.12)', color: '#6699ff', border: 'rgba(30,100,255,0.3)' },
  'Full-Stack & Intelligent Systems':{ bg: 'rgba(160,60,255,0.12)', color: '#cc88ff', border: 'rgba(160,60,255,0.3)' },
};

const DEFAULT_GRADIENT = 'linear-gradient(135deg, #1a0a04 0%, #080402 100%)';
const DEFAULT_BADGE = { bg: 'rgba(255,69,0,0.12)', color: '#ff6600', border: 'rgba(255,69,0,0.3)' };

export default function ProjectTimeline({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="pj-wrapper">
      <div className="pj-grid">
        {projects.map((project, i) => {
          const gradient = TYPE_GRADIENTS[project.type] || DEFAULT_GRADIENT;
          const badge = TYPE_BADGE_COLORS[project.type] || DEFAULT_BADGE;
          const tags = project.technologies.split('•').map(t => t.trim()).filter(Boolean);

          return (
            <motion.div
              key={project.id || i}
              className="pj-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
            >
              {/* Hero banner */}
              <div className="pj-hero" style={{ background: gradient }}>
                <span
                  className="pj-type-badge"
                  style={{ background: badge.bg, color: badge.color, borderColor: badge.border }}
                >
                  {project.type}
                </span>
                {project.date && (
                  <span className="pj-date">
                    <Calendar size={11} /> {project.date}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="pj-body">
                <h4 className="pj-name">{project.name}</h4>
                <p className="pj-desc">{project.description}</p>

                {/* Tech stack */}
                <div className="pj-tags">
                  {tags.map((tag, j) => (
                    <span key={j} className="pj-tag">{tag}</span>
                  ))}
                </div>

                {/* Action row */}
                <div className="pj-actions">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="pj-btn pj-btn-primary"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  <a
                    href={project.projectUrl || 'https://github.com/Ansuman-Mahapatra'}
                    target="_blank"
                    rel="noreferrer"
                    className="pj-btn pj-btn-ghost"
                  >
                    <Github size={14} /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
