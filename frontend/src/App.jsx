import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Zap, Terminal, Code2, Flame, Sword } from 'lucide-react';
import FireParticles from './FireParticles';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [aiIntegrations, setAiIntegrations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Error fetching profile", err));

    fetch(`${import.meta.env.VITE_API_URL}/skills`)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error("Error fetching skills", err));

    fetch(`${import.meta.env.VITE_API_URL}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects", err));

    fetch(`${import.meta.env.VITE_API_URL}/ai-integrations`)
      .then(res => res.json())
      .then(data => setAiIntegrations(data))
      .catch(err => console.error("Error fetching AI integrations", err));

    fetch(`${import.meta.env.VITE_API_URL}/experiences`)
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(err => console.error("Error fetching experiences", err));
  }, []);

  if (!profile) {
    return (
      <div className="loader-container">
        <div className="loader-cube" />
        <p className="loader-text">IGNITING CORE...</p>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 100, scale: 0.9, rotateX: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 1.5
      } 
    }
  };

  const slashInLeft = {
    hidden: { opacity: 0, x: -150, skewX: 20 },
    visible: {
      opacity: 1, 
      x: 0, 
      skewX: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 }
    }
  };

  const slashInRight = {
    hidden: { opacity: 0, x: 150, skewX: -20 },
    visible: {
      opacity: 1, 
      x: 0, 
      skewX: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="app-container">
      {/* Real Animated Fire Background */}
      <FireParticles />
      
      {/* Navigation */}
      <nav className="glass-nav">
        <div className="nav-content">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="logo"
          >
            Ansuman.dev
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="nav-links"
          >
            <a href="#about">Origins</a>
            <a href="#experience">History</a>
            <a href="#skills">Arsenal</a>
            <a href="#projects">Conquests</a>
            <a href="#ai">AI Core</a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp} className="hero-title">
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>
          <motion.h2 variants={fadeInUp} className="hero-subtitle">
            {profile.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="hero-tagline">
            {profile.tagline}
          </motion.p>
          
          <motion.div variants={fadeInUp} className="hero-actions">
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="btn-social">
              <Github size={20} /> GitHub
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="btn-social">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="#contact" className="btn-primary">
              <Flame size={20} /> Ignite Contact
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h3 className="section-title">Origins<span className="dot">.</span></h3>
          <div className="about-card glass-card">
            <p className="about-text">{profile.about}</p>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <h3 className="section-title">Battle History<span className="dot">.</span></h3>
          <div className="experience-timeline">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id} 
                variants={index % 2 === 0 ? slashInLeft : slashInRight}
                className="experience-item glass-card"
              >
                <div className="exp-dot"></div>
                <div className="exp-content">
                  <span className="exp-duration">{exp.duration}</span>
                  <h4>{exp.role} @ <span className="text-highlight">{exp.company}</span></h4>
                  <p>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <h3 className="section-title">Technical Arsenal<span className="dot">.</span></h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.id} 
                variants={index % 2 === 0 ? slashInLeft : slashInRight} 
                className="skill-card glass-card"
              >
                <div className="skill-icon-wrapper">
                  {index % 4 === 0 && <Code2 size={28} className="accent-icon" />}
                  {index % 4 === 1 && <Sword size={28} className="accent-icon" />}
                  {index % 4 === 2 && <Terminal size={28} className="accent-icon" />}
                  {index % 4 === 3 && <Zap size={28} className="accent-icon" />}
                </div>
                <h4>{skill.category}</h4>
                <p>{skill.skills}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="section-title">Conquests & Creations<span className="dot">.</span></h3>
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <motion.a 
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                key={project.id} 
                className="project-card glass-card clickable"
                variants={idx % 2 === 0 ? slashInLeft : slashInRight}
              >
                <div className="project-type">{project.type}</div>
                <h4 className="project-name">{project.name}</h4>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.split('•').map((tech, i) => (
                    <span key={i} className="tech-badge">{tech.trim()}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Integrations */}
      <section id="ai" className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <h3 className="section-title">Dark AI Core<span className="dot">.</span></h3>
          <div className="ai-grid">
            {aiIntegrations.map((ai, index) => (
              <motion.div 
                key={ai.id} 
                variants={index % 2 === 0 ? slashInLeft : slashInRight} 
                className="ai-card glass-card"
              >
                <div className="ai-glow"></div>
                <h4>{ai.name}</h4>
                <p>{ai.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="footer">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="contact-cta"
        >
          <h2>Forge an Alliance</h2>
          <p>Ready to build hellishly powerful backend architectures?</p>
          <a href={`mailto:ansumanmahapatre@gmail.com`} className="btn-primary large">
            <Flame size={20} style={{ marginRight: '8px' }} /> Initiate Transmission
          </a>
        </motion.div>
        
        <div className="footer-bottom">
          <p>FORGED IN FLAME & CODE © {new Date().getFullYear()} ANSUMAN MAHAPATRA.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
