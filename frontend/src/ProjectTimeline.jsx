import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const TECH_URLS = {
  'java': 'https://www.oracle.com/java/',
  'swing': 'https://docs.oracle.com/javase/tutorial/uiswing/',
  'mysql': 'https://www.mysql.com/',
  'jdbc': 'https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/',
  'react': 'https://react.dev/',
  'spring boot': 'https://spring.io/projects/spring-boot',
  'hibernate': 'https://hibernate.org/',
  'jpa': 'https://spring.io/projects/spring-data-jpa',
  'maven': 'https://maven.apache.org/',
  'gradle': 'https://gradle.org/',
  'mongodb': 'https://www.mongodb.com/',
  'postman': 'https://www.postman.com/',
  'git': 'https://git-scm.com/',
  'github': 'https://github.com/',
  'tailwind': 'https://tailwindcss.com/',
  'framer motion': 'https://www.framer.com/motion/',
  'node.js': 'https://nodejs.org/',
  'express': 'https://expressjs.com/',
  'next.js': 'https://nextjs.org/',
  'typescript': 'https://www.typescriptlang.org/',
  'javascript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
};

const getTechUrl = (tech) => {
  const cleanTech = tech.toLowerCase().trim();
  return TECH_URLS[cleanTech] || `https://www.google.com/search?q=${encodeURIComponent(tech)}+official+website`;
};

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
        <motion.div
          key={project.id || idx}
          className="glass-card project-card clickable flex flex-col items-start gap-4"
          variants={idx % 2 === 0 ? slashInLeft : slashInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          <div className="project-type text-sm text-[#ff4500] font-bold uppercase tracking-widest">{project.type}</div>
          <h4 className="project-name text-2xl font-['Cinzel'] font-black text-white">{project.name}</h4>
          <p className="project-desc text-zinc-400 font-['Inter'] leading-relaxed flex-grow">{project.description}</p>
          
          <div className="project-tech flex flex-wrap gap-2 mt-4">
            {project.technologies.split(/[•,|]+/).map((tech, i) => {
              const t = tech.trim();
              if (!t) return null;
              return (
                <a 
                  key={i} 
                  href={getTechUrl(t)} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="tech-badge"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t}
                </a>
              );
            })}
          </div>

          <div className="project-actions mt-auto pt-6 w-full border-t border-white/5">
            <a 
              href={project.projectUrl && project.projectUrl !== '#' ? project.projectUrl : `https://github.com/Ansuman-Mahapatra?tab=repositories&q=${encodeURIComponent(project.name)}`} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary small w-full inline-flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ textDecoration: 'none', minHeight: '44px' }}
            >
              <Zap size={14} /> VISIT PROTOTYPE
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

