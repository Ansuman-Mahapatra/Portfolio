import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function ProjectTimeline({ projects }) {
  if (!projects || projects.length === 0) return null;

  const slashInLeft = {
    hidden: { opacity: 0, x: -80, skewX: 5 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
  };
  const slashInRight = {
    hidden: { opacity: 0, x: 80, skewX: -5 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
  };

  return (
    <div className="projects-grid">
      {projects.map((project, idx) => (
        <motion.a
          key={project.id || idx}
          href={project.projectUrl}
          target="_blank"
          rel="noreferrer"
          className="project-card glass-card clickable"
          variants={idx % 2 === 0 ? slashInLeft : slashInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          <div className="project-type">{project.type}</div>
          <h4 className="project-name">{project.name}</h4>
          <p className="project-desc">{project.description}</p>
          <div className="project-tech">
            {project.technologies.split('•').map((tech, i) => (
              <span key={i} className="tech-badge">{tech.trim()}</span>
            ))}
          </div>
          <div className="project-actions">
            <div className="btn-primary small">
              <Zap size={14} /> VISIT PROTOTYPE
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

