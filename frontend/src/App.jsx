import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Zap, Terminal, Code2, Flame, Sword } from 'lucide-react';
import FireVineTrail from './FireVineTrail';
import { RadialOrbitalTimeline } from './RadialOrbitalTimeline';
import SkillsConstellation from './SkillsConstellation';
import FeedbackSection from './FeedbackSection';
import IntroSplash from './IntroSplash';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [aiIntegrations, setAiIntegrations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [sections, setSections] = useState({});
  const [showIntro, setShowIntro] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    // Prevent browser from jumping down to an anchor link on reload/refresh
    if (window.location.hash) {
      window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

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
      .then(data => {
        console.log("Database conquest records synchronized:", data);
        setProjects(data);
      })
      .catch(err => console.error("Error fetching projects", err));

    fetch(`${import.meta.env.VITE_API_URL}/ai-integrations`)
      .then(res => res.json())
      .then(data => setAiIntegrations(data))
      .catch(err => console.error("Error fetching AI integrations", err));

    fetch(`${import.meta.env.VITE_API_URL}/experiences`)
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(err => console.error("Error fetching experiences", err));

    fetch(`${import.meta.env.VITE_API_URL}/sections`)
      .then(res => res.json())
      .then(data => {
        const sectionsMap = data.reduce((acc, curr) => {
          acc[curr.sectionKey] = curr;
          return acc;
        }, {});
        setSections(sectionsMap);
      })
      .catch(err => console.error("Error fetching sections", err));
  }, []);

  // Lock scrolling while splash is active (3 seconds)
  useEffect(() => {
    if (showIntro) {
      document.documentElement.style.overflow = 'hidden';
      const timer = setTimeout(() => setShowIntro(false), 3000); 
      return () => {
        clearTimeout(timer);
        document.documentElement.style.overflow = '';
      };
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [showIntro]);

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
    hidden: { opacity: 0, x: -80, skewX: 5 },
    visible: {
      opacity: 1, 
      x: 0, 
      skewX: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  const slashInRight = {
    hidden: { opacity: 0, x: 80, skewX: -5 },
    visible: {
      opacity: 1, 
      x: 0, 
      skewX: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
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
    <>
      <AnimatePresence>
        {showIntro && <IntroSplash />}
      </AnimatePresence>
      <div 
        className="app-container"
        style={{ 
          height: showIntro ? '100vh' : 'auto', 
          overflow: showIntro ? 'hidden' : 'visible'
        }}
      >
        {/* Organic Vine/Fire pointer tracking background */}
        <FireVineTrail />
      
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
            <a href="#feedback">Rate</a>
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
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
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
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
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
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          variants={staggerContainer}
        >
          <h3 className="section-title">Technical Arsenal<span className="dot">.</span></h3>
          <SkillsConstellation skills={skills} />
        </motion.div>
      </section>

      {/* Projects Timeline Section */}
      <section id="projects" className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="section-title">Conquests & Creations<span className="dot">.</span></h3>
          <RadialOrbitalTimeline items={projects.map(p => ({ ...p, title: p.name, subtitle: p.type }))} />
        </motion.div>
      </section>

      {/* AI Integrations */}
      <section id="ai" className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
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

      {/* Visit Section */}
      <section id="visit" className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
          className="visit-portal glass-card"
        >
          <div className="portal-content">
            <h3 className="section-title">{sections.visit?.title || "Deployment Portal"}<span className="dot">.</span></h3>
            <p className="visit-description">
              {sections.visit?.description || "The architecture is live. Step through the gate to experience the full deployment of this demonic engine."}
            </p>
            <div className="portal-actions">
              <a 
                href="https://ansuman-mahapatra.github.io/Portfolio/" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary large"
              >
                <Zap size={24} /> ENTER PROTOTYPE
              </a>
            </div>
          </div>
          <div className="portal-glow"></div>
        </motion.div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="section-container" style={{ minHeight: '100vh', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <FeedbackSection />
        </motion.div>
      </section>


      {/* Footer / Contact */}
      <footer id="contact" className="footer">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="contact-cta"
        >
          <h2>{sections.contact?.title || "Forge an Alliance"}</h2>
          <p>{sections.contact?.description || "Ready to build hellishly powerful backend architectures?"}</p>
          <a href={`mailto:ansumanmahapatre@gmail.com`} className="btn-primary large">
            <Flame size={20} style={{ marginRight: '8px' }} /> Initiate Transmission
          </a>
        </motion.div>
        
        <div className="footer-bottom">
          <p>FORGED IN FLAME & CODE © {new Date().getFullYear()} ANSUMAN MAHAPATRA.</p>
        </div>
      </footer>
      </div>
    </>
  );
}

export default App;


