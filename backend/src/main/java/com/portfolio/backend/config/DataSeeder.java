package com.portfolio.backend.config;

import com.portfolio.backend.model.AiIntegration;
import com.portfolio.backend.model.Profile;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.model.Skill;
import com.portfolio.backend.repository.AiIntegrationRepository;
import com.portfolio.backend.repository.ProfileRepository;
import com.portfolio.backend.repository.ProjectRepository;
import com.portfolio.backend.repository.SkillRepository;
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
                                   AiIntegrationRepository aiRepo) {
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
                        "https://www.linkedin.com/in/ansuman-mahapatra-30661a2b2/"
                );
                profileRepo.save(profile);
            }

            // Seed Skills
            if (skillRepo.count() == 0) {
                skillRepo.saveAll(List.of(
                        new Skill(null, "Programming Languages", "C, C++, HTML5, CSS3, JavaScript (ES6+), Java, Python"),
                        new Skill(null, "Frameworks", "Spring Boot, React.js, Node.js, Express.js, Next.js"),
                        new Skill(null, "Databases", "MongoDB, MySQL, PostgreSQL"),
                        new Skill(null, "Tools & Technologies", "Docker, Apache Tomcat, Git, GitHub, Postman, IntelliJ IDEA, VS Code, Eclipse, Maven"),
                        new Skill(null, "Cloud Platforms", "AWS (S3, Lambda, DynamoDB), Firebase, Render"),
                        new Skill(null, "DevOps", "CI/CD Pipelines, GitHub Actions, Containerization (Docker), API Development & Testing"),
                        new Skill(null, "Operating Systems", "Windows, Linux (Ubuntu, Kali)"),
                        new Skill(null, "Soft Skills", "Problem-Solving, Team Collaboration, Adaptability, Time Management, Communication")
                ));
            }

            // Seed Projects
            if (projectRepo.count() == 0) {
                projectRepo.saveAll(List.of(
                        new Project(null, "Java Desktop Applications", "Hotel Management System", "A complete hotel operations platform with room booking, customer check-in/out, employee & driver management, billing system, and real-time room status tracking.", "Java Swing • MySQL • JDBC • rs2xml • JCalendar"),
                        new Project(null, "Java Desktop Applications", "Hospital Management System", "Full-featured hospital system managing patients, doctors, rooms, departments, appointments, and role-based access (Admin/Doctor/Reception).", "Java Swing • MySQL • JDBC • Multi-user Login"),
                        new Project(null, "Java Desktop Applications", "University Management System", "Comprehensive university portal with student/faculty management, fee structure, marks entry, examination system, and leave applications.", "Java Swing • MySQL • JDBC • Modular Design"),
                        new Project(null, "Java Desktop Applications", "Employee Management System", "Enterprise-level employee management with CRUD operations, salary tracking, dynamic user authentication, and permanent data storage.", "Java Swing • MySQL • JDateChooser • rs2xml"),
                        new Project(null, "Java Backend Projects", "Farmer-to-Farmer Direct Transfer System", "Spring Boot REST API enabling direct produce trading between farmers with AI-powered price prediction, JWT authentication, and real-time transaction logging.", "Spring Boot • Spring Security • MongoDB • REST API • AI Integration"),
                        new Project(null, "Full-Stack & Intelligent Systems", "AI Voice Assistant", "Intelligent desktop assistant capable of weather updates, news, Wikipedia search, translations, and natural conversations using OpenAI API.", "Python • OpenAI • SpeechRecognition • pyttsx3 • Tkinter"),
                        new Project(null, "Full-Stack & Intelligent Systems", "Real-Time Language Translator", "Voice & text translator with 100+ language support, speech recognition, text-to-speech, admin panel, and startup animation.", "Python • Tkinter • Googletrans • MySQL • Speech API"),
                        new Project(null, "Full-Stack & Intelligent Systems", "Home Inventory Management System (Team)", "Smart inventory tracker with category management, low-stock alerts, search/filter, and responsive dashboard.", "React.js • Node.js • MongoDB • Tailwind • SpringBoot • RestAPI")
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
        };
    }
}
