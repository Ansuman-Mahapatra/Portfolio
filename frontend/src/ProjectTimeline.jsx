import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import './ProjectTimeline.css';

export default function ProjectTimeline({ projects }) {
  const dotRefs = useRef([]);
  const [pathD, setPathD] = useState('');
  const wrapperRef = useRef(null);

  // Build the smooth snake SVG path by measuring dot positions
  const buildPath = () => {
    if (!wrapperRef.current || dotRefs.current.length === 0) return;
    const wrapRect = wrapperRef.current.getBoundingClientRect();

    const points = dotRefs.current.map(dot => {
      if (!dot) return null;
      const r = dot.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - wrapRect.left,
        y: r.top + r.height / 2 - wrapRect.top,
      };
    }).filter(Boolean);

    if (points.length < 2) return;

    // Build smooth cubic bezier segments between each dot
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midY = (p0.y + p1.y) / 2;
      // Control points: go straight down to midpoint, then curve across
      d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
    }
    setPathD(d);
  };

  useEffect(() => {
    // Give DOM time to settle then measure
    const timer = setTimeout(buildPath, 300);
    window.addEventListener('resize', buildPath);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', buildPath);
    };
  }, [projects]);

  // Variants for cards
  const slashInLeft = {
    hidden: { opacity: 0, x: -120, skewX: 15 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { type: 'spring', stiffness: 100, damping: 14 } }
  };
  const slashInRight = {
    hidden: { opacity: 0, x: 120, skewX: -15 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { type: 'spring', stiffness: 100, damping: 14 } }
  };

  return (
    <div className="pt-wrapper" ref={wrapperRef}>
      {/* Snake SVG overlay */}
      <svg className="pt-svg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {pathD && (
          <>
            {/* Glowing background stroke */}
            <path d={pathD} fill="none" stroke="rgba(255,69,0,0.25)" strokeWidth="12" />
            {/* Bright inner stroke */}
            <path
              d={pathD}
              fill="none"
              stroke="#ff4500"
              strokeWidth="2.5"
              strokeDasharray="12 6"
              filter="url(#glow)"
              className="pt-animated-dash"
            />
          </>
        )}
      </svg>

      {/* Project cards */}
      <div className="pt-list">
        {projects.map((project, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <motion.div
              key={project.id}
              className={`pt-row ${isLeft ? 'pt-left' : 'pt-right'}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={isLeft ? slashInLeft : slashInRight}
            >
              {/* Card */}
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="pt-card glass-card"
              >
                <span className="pt-type">{project.type}</span>
                <h4 className="pt-name">{project.name}</h4>
                <p className="pt-desc">{project.description}</p>
                <div className="pt-tags">
                  {project.technologies.split('•').map((t, i) => (
                    <span key={i} className="tech-badge">{t.trim()}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <div className="btn-primary small"><Zap size={14} /> VISIT</div>
                </div>
              </a>

              {/* Central dot with date label */}
              <div
                className="pt-dot"
                ref={el => { dotRefs.current[idx] = el; }}
              >
                <span className="pt-date">{project.date}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
