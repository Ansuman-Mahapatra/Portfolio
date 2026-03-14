import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [aiIntegrations, setAiIntegrations] = useState([]);

  useEffect(() => {
    // Fetch profile
    fetch(`${import.meta.env.VITE_API_URL}/profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Error fetching profile", err));

    // Fetch skills
    fetch(`${import.meta.env.VITE_API_URL}/skills`)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error("Error fetching skills", err));

    // Fetch projects
    fetch(`${import.meta.env.VITE_API_URL}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects", err));

    // Fetch AI integrations
    fetch(`${import.meta.env.VITE_API_URL}/ai-integrations`)
      .then(res => res.json())
      .then(data => setAiIntegrations(data))
      .catch(err => console.error("Error fetching AI integrations", err));
  }, []);

  if (!profile) return <div className="loading">Loading data from backend... Make sure MongoDB and Spring Boot are running!</div>;

  return (
    <div className="portfolio-container">
      <header>
        <h1>{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p><em>{profile.tagline}</em></p>
      </header>

      <section>
        <h3>About Me</h3>
        <p>{profile.about}</p>
      </section>

      <section>
        <h3>Skills</h3>
        <ul>
          {skills.map(skill => (
            <li key={skill.id}>
              <strong>{skill.category}:</strong> {skill.skills}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Projects</h3>
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h4>{project.name}</h4>
            <p><strong>Type:</strong> {project.type}</p>
            <p>{project.description}</p>
            <p><em>Technologies: {project.technologies}</em></p>
          </div>
        ))}
      </section>

      <section>
        <h3>AI Integrations</h3>
        {aiIntegrations.map(ai => (
          <div key={ai.id} className="ai-card">
            <h4>{ai.name}</h4>
            <p>{ai.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
