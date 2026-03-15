package com.portfolio.backend.config;

import com.portfolio.backend.model.AiIntegration;
import com.portfolio.backend.model.Profile;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.model.Skill;
import com.portfolio.backend.model.Experience;
import com.portfolio.backend.model.SectionText;
import com.portfolio.backend.repository.AiIntegrationRepository;
import com.portfolio.backend.repository.ProfileRepository;
import com.portfolio.backend.repository.ProjectRepository;
import com.portfolio.backend.repository.SkillRepository;
import com.portfolio.backend.repository.ExperienceRepository;
import com.portfolio.backend.repository.SectionTextRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ProfileRepository profileRepo,
                                   SkillRepository skillRepo,
                                   ProjectRepository projectRepo,
                                   AiIntegrationRepository aiRepo,
                                   ExperienceRepository experienceRepo,
                                   SectionTextRepository sectionTextRepo) {
        return args -> {
            // Seed Profile
            if (profileRepo.count() == 0) {
                Profile profile = new Profile(
                        null,
                        "Ansuman",
                        "Backend Developer & AI Integration Engineer",
                        "Building scalable backend systems with intelligent AI integration",
                        "As a Backend Developer & AI Integration Engineer, I specialize in creating robust, scalable systems that leverage the power of artificial intelligence. With expertise in Java, Spring Boot, Python, and databases like MySQL and MongoDB, I build solutions that drive innovation and efficiency.",
                        "Ansuman_Resume.pdf",
                        "https://github.com/Ansuman-Mahapatra",
                        "https://www.linkedin.com/in/ansuman-mahapatra-30661a2b2/",
                        "/ansuman.jpeg"
                );
                profileRepo.save(profile);
            }

            // Seed Skills
            if (skillRepo.count() == 0) {
                skillRepo.saveAll(List.of(
                        new Skill(null, "Programming Languages", "C, C++, HTML5, CSS3, JavaScript (ES6+), Java, Python", "https://developer.mozilla.org/en-US/docs/Web"),
                        new Skill(null, "Frameworks", "Spring Boot, React.js, Node.js, Express.js, Next.js", "https://spring.io/projects/spring-boot"),
                        new Skill(null, "Databases", "MongoDB, MySQL, PostgreSQL", "https://www.mongodb.com/"),
                        new Skill(null, "Tools & Technologies", "Docker, Apache Tomcat, Git, GitHub, Postman, IntelliJ IDEA, VS Code, Eclipse, Maven", "https://www.docker.com/"),
                        new Skill(null, "Cloud Platforms", "AWS (S3, Lambda, DynamoDB), Firebase, Render", "https://aws.amazon.com/"),
                        new Skill(null, "DevOps", "CI/CD Pipelines, GitHub Actions, Containerization (Docker), API Development & Testing", "https://github.com/features/actions"),
                        new Skill(null, "Operating Systems", "Windows, Linux (Ubuntu, Kali)", "https://ubuntu.com/"),
                        new Skill(null, "Soft Skills", "Problem-Solving, Team Collaboration, Adaptability, Time Management, Communication", null)
                ));
            }

            // Seed Projects
            if (projectRepo.count() == 0) {
                projectRepo.saveAll(List.of(
                        new Project(null, "Java Desktop Applications", "Hotel Management System", "A complete hotel operations platform with room booking, customer check-in/out, employee & driver management, billing system, and real-time room status tracking.", "Java Swing • MySQL • JDBC • rs2xml • JCalendar", "https://github.com/Ansuman-Mahapatra", "Jan 2023"),
                        new Project(null, "Java Desktop Applications", "Hospital Management System", "Full-featured hospital system managing patients, doctors, rooms, departments, appointments, and role-based access (Admin/Doctor/Reception).", "Java Swing • MySQL • JDBC • Multi-user Login", "https://github.com/Ansuman-Mahapatra", "March 2023"),
                        new Project(null, "Java Desktop Applications", "University Management System", "Comprehensive university portal with student/faculty management, fee structure, marks entry, examination system, and leave applications.", "Java Swing • MySQL • JDBC • Modular Design", "https://github.com/Ansuman-Mahapatra", "June 2023"),
                        new Project(null, "Java Desktop Applications", "Employee Management System", "Enterprise-level employee management with CRUD operations, salary tracking, dynamic user authentication, and permanent data storage.", "Java Swing • MySQL • JDateChooser • rs2xml", "https://github.com/Ansuman-Mahapatra", "Aug 2023"),
                        new Project(null, "Java Backend Projects", "Farmer-to-Farmer Direct Transfer System", "Spring Boot REST API enabling direct produce trading between farmers with AI-powered price prediction, JWT authentication, and real-time transaction logging.", "Spring Boot • Spring Security • MongoDB • REST API • AI Integration", "https://github.com/Ansuman-Mahapatra", "Oct 2023"),
                        new Project(null, "Full-Stack & Intelligent Systems", "AI Voice Assistant", "Intelligent desktop assistant capable of weather updates, news, Wikipedia search, translations, and natural conversations using OpenAI API.", "Python • OpenAI • SpeechRecognition • pyttsx3 • Tkinter", "https://github.com/Ansuman-Mahapatra", "Dec 2023"),
                        new Project(null, "Full-Stack & Intelligent Systems", "Real-Time Language Translator", "Voice & text translator with 100+ language support, speech recognition, text-to-speech, admin panel, and startup animation.", "Python • Tkinter • Googletrans • MySQL • Speech API", "https://github.com/Ansuman-Mahapatra", "Feb 2024"),
                        new Project(null, "Full-Stack & Intelligent Systems", "Home Inventory Management System (Team)", "Smart inventory tracker with category management, low-stock alerts, search/filter, and responsive dashboard.", "React.js • Node.js • MongoDB • Tailwind • SpringBoot • RestAPI", "https://github.com/Ansuman-Mahapatra", "May 2024")
                ));
            }

            // Seed AI Integrations
            if (aiRepo.count() == 0) {
                aiRepo.saveAll(List.of(
                        new AiIntegration(null, "Machine Learning Model Deployment", "Seamlessly integrating pre-trained ML models into backend systems for predictive analytics and automation."),
                        new AiIntegration(null, "Natural Language Processing", "Implementing NLP capabilities for chatbots, sentiment analysis, and intelligent data extraction."),
                        new AiIntegration(null, "Computer Vision APIs", "Building APIs that leverage computer vision models for image recognition and processing tasks.")
                ));
            }

            // Seed Experience
            if (experienceRepo.count() == 0) {
                experienceRepo.saveAll(List.of(
                        new Experience(null, "Backend Developer", "Freelance", "2023 - Present", "Designing and implementing scalable REST APIs using Spring Boot and MongoDB."),
                        new Experience(null, "AI Integration Engineer", "Tech Innovators", "2022 - 2023", "Integrated OpenAI and other LLMs into enterprise workflows to automate content generation.")
                ));
            }

            // Seed Section Texts
            if (sectionTextRepo.count() == 0) {
                sectionTextRepo.saveAll(List.of(
                    new SectionText(null, "visit", "Explore Live Prototypes", "Step through the portal to experience the full deployment of my engineering architectures."),
                    new SectionText(null, "contact", "Forge an Alliance", "Ready to build powerful backend architectures? Let's connect and push the boundaries of technology.")
                ));
            }
        };
    }
}
