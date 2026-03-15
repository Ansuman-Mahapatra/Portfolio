import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import './ProjectTimeline.css';

export default function ProjectTimeline({ projects }) {
  const dotRefs = useRef([]);
  const wrapperRef = useRef(null);
  const [pathD, setPathD] = useState('');
  const [dotPoints, setDotPoints] = useState([]);

  const measure = () => {
    if (!wrapperRef.current) return;
    const wrapRect = wrapperRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const pts = dotRefs.current
      .map(el => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          // Position relative to wrapper, accounting for page scroll
          x: r.left + r.width / 2 - wrapRect.left + scrollX - (wrapRect.left + scrollX - wrapRect.left),
          y: r.top + r.height / 2 - wrapRect.top + scrollY - scrollY,
        };
      })
      .filter(Boolean);

    // Simpler: just use offsetTop + offsetLeft relative to wrapper
    const pts2 = dotRefs.current.map(el => {
      if (!el) return null;
      let ox = 0, oy = 0;
      let node = el;
      while (node && node !== wrapperRef.current) {
        ox += node.offsetLeft;
        oy += node.offsetTop;
        node = node.offsetParent;
      }
      return { x: ox + el.offsetWidth / 2, y: oy + el.offsetHeight / 2 };
    }).filter(Boolean);

    if (pts2.length < 2) return;

    setDotPoints(pts2);

    // Snake path: curve from each dot to the next
    let d = `M ${pts2[0].x} ${pts2[0].y}`;
    for (let i = 0; i < pts2.length - 1; i++) {
      const a = pts2[i];
      const b = pts2[i + 1];
      const midY = (a.y + b.y) / 2;
      d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
    }
    setPathD(d);
  };

  useEffect(() => {
    // Measure after DOM settles — use a longer delay so layout is stable
    const t1 = setTimeout(measure, 400);
    const t2 = setTimeout(measure, 900); // second pass for safety
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measure);
    };
  }, [projects]);

  const slashInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } }
  };
  const slashInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } }
  };

  return (
    <div className="pt-wrapper" ref={wrapperRef}>

      {/* SVG snake overlay — absolutely positioned over the wrapper */}
      <svg
        className="pt-svg"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
      >
        <defs>
          <filter id="ptglow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="cg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff7a00" />
            <stop offset="100%" stopColor="#cc1a00" />
          </radialGradient>
        </defs>

        {/* Glow halo path */}
        {pathD && <path d={pathD} fill="none" stroke="rgba(255,80,0,0.18)" strokeWidth="14" />}
        {/* Dashed bright path */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#ff4500"
            strokeWidth="2.5"
            strokeDasharray="12 6"
            filter="url(#ptglow)"
            className="pt-animated-dash"
          />
        )}

        {/* Circles exactly on the path nodes */}
        {dotPoints.map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r="14" fill="none" stroke="rgba(255,90,0,0.3)" strokeWidth="1.5" className="pt-ring-pulse" />
            <circle cx={pt.x} cy={pt.y} r="8" fill="url(#cg)" stroke="#0a0a0a" strokeWidth="2.5" filter="url(#ptglow)" />
            <circle cx={pt.x} cy={pt.y} r="2.5" fill="#ffffff" />
          </g>
        ))}
      </svg>

      {/* Timeline rows */}
      <div className="pt-list">
        {projects.map((project, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={project.id} className={`pt-row ${isLeft ? 'pt-left' : 'pt-right'}`}>

              {/* Animated card */}
              <motion.a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="pt-card glass-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={isLeft ? slashInLeft : slashInRight}
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
              </motion.a>

              {/*
                The measurement anchor — NOT animated, always in true position.
                The SVG circles are drawn ON TOP of these via dotPoints state.
              */}
              <div
                className="pt-dot"
                ref={el => { dotRefs.current[idx] = el; }}
              >
                <span className={`pt-date ${isLeft ? 'pt-date-right' : 'pt-date-left'}`}>
                  {project.date}
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
