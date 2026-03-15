package com.portfolio.backend.controller;

import com.portfolio.backend.model.AiIntegration;
import com.portfolio.backend.model.Profile;
import com.portfolio.backend.model.Skill;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.model.Experience;
import com.portfolio.backend.model.SectionText;
import com.portfolio.backend.repository.AiIntegrationRepository;
import com.portfolio.backend.repository.ProfileRepository;
import com.portfolio.backend.repository.ProjectRepository;
import com.portfolio.backend.repository.SkillRepository;
import com.portfolio.backend.repository.ExperienceRepository;
import com.portfolio.backend.repository.SectionTextRepository;
import com.portfolio.backend.model.Feedback;
import com.portfolio.backend.model.Certificate;
import com.portfolio.backend.model.Achievement;
import com.portfolio.backend.repository.CertificateRepository;
import com.portfolio.backend.repository.AchievementRepository;
import com.portfolio.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}) // Allow both frontends
public class PortfolioController {

    @Autowired
    private ProfileRepository profileRepo;
    
    @Autowired
    private SkillRepository skillRepo;
    
    @Autowired
    private ProjectRepository projectRepo;
    
    @Autowired
    private AiIntegrationRepository aiRepo;

    @Autowired
    private ExperienceRepository experienceRepo;

    @Autowired
    private SectionTextRepository sectionTextRepo;

    @Autowired
    private FeedbackRepository feedbackRepo;

    @Autowired
    private CertificateRepository certificateRepo;

    @Autowired
    private AchievementRepository achievementRepo;

    @GetMapping("/profile")
    public Profile getProfile() {
        return profileRepo.findAll().stream().findFirst().orElse(null);
    }

    @GetMapping("/skills")
    public List<Skill> getSkills() {
        return skillRepo.findAll();
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return projectRepo.findAll();
    }

    @GetMapping("/ai-integrations")
    public List<AiIntegration> getAiIntegrations() {
        return aiRepo.findAll();
    }

    @GetMapping("/experiences")
    public List<Experience> getExperiences() {
        return experienceRepo.findAll();
    }

    @GetMapping("/sections")
    public List<SectionText> getSections() {
        return sectionTextRepo.findAll();
    }

    @GetMapping("/certificates")
    public List<Certificate> getCertificates() {
        return certificateRepo.findAll();
    }

    @GetMapping("/achievements")
    public List<Achievement> getAchievements() {
        return achievementRepo.findAll();
    }

    @PostMapping("/feedback")
    public Feedback submitFeedback(@RequestBody Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    @GetMapping("/feedback")
    public List<Feedback> getFeedback() {
        return feedbackRepo.findAll();
    }

    @DeleteMapping("/feedback/{id}")
    public void deleteFeedback(@PathVariable String id) {
        feedbackRepo.deleteById(id);
    }

    // ADMIN ENDPOINTS

    // Profile Management
    @PostMapping("/admin/profile")
    public Profile saveProfile(@RequestBody Profile profile) {
        // If profile has no ID, find the existing one and update it
        if (profile.getId() == null) {
            Profile existing = profileRepo.findAll().stream().findFirst().orElse(null);
            if (existing != null) {
                profile.setId(existing.getId());
            }
        }
        return profileRepo.save(profile);
    }

    // Project Management
    @PostMapping("/admin/projects")
    public Project addProject(@RequestBody Project project) {
        return projectRepo.save(project);
    }

    @PutMapping("/admin/projects/{id}")
    public Project updateProject(@PathVariable String id, @RequestBody Project project) {
        project.setId(id);
        return projectRepo.save(project);
    }

    @DeleteMapping("/admin/projects/{id}")
    public void deleteProject(@PathVariable String id) {
        projectRepo.deleteById(id);
    }

    @DeleteMapping("/admin/projects/truncate")
    public void truncateProjects() {
        projectRepo.deleteAll();
    }

    // Skill Management
    @PostMapping("/admin/skills")
    public Skill addSkill(@RequestBody Skill skill) {
        return skillRepo.save(skill);
    }

    @PutMapping("/admin/skills/{id}")
    public Skill updateSkill(@PathVariable String id, @RequestBody Skill skill) {
        skill.setId(id);
        return skillRepo.save(skill);
    }

    @DeleteMapping("/admin/skills/{id}")
    public void deleteSkill(@PathVariable String id) {
        skillRepo.deleteById(id);
    }

    @DeleteMapping("/admin/skills/truncate")
    public void truncateSkills() {
        skillRepo.deleteAll();
    }

    // Experience Management
    @PostMapping("/admin/experiences")
    public Experience addExperience(@RequestBody Experience experience) {
        return experienceRepo.save(experience);
    }

    @PutMapping("/admin/experiences/{id}")
    public Experience updateExperience(@PathVariable String id, @RequestBody Experience experience) {
        experience.setId(id);
        return experienceRepo.save(experience);
    }

    @DeleteMapping("/admin/experiences/{id}")
    public void deleteExperience(@PathVariable String id) {
        experienceRepo.deleteById(id);
    }

    // AI Integration Management
    @PostMapping("/admin/ai-integrations")
    public AiIntegration addAi(@RequestBody AiIntegration ai) {
        return aiRepo.save(ai);
    }

    @PutMapping("/admin/ai-integrations/{id}")
    public AiIntegration updateAi(@PathVariable String id, @RequestBody AiIntegration ai) {
        ai.setId(id);
        return aiRepo.save(ai);
    }

    @DeleteMapping("/admin/ai-integrations/{id}")
    public void deleteAi(@PathVariable String id) {
        aiRepo.deleteById(id);
    }

    // Certificate Management
    @PostMapping("/admin/certificates")
    public Certificate addCertificate(@RequestBody Certificate cert) {
        return certificateRepo.save(cert);
    }

    @PutMapping("/admin/certificates/{id}")
    public Certificate updateCertificate(@PathVariable String id, @RequestBody Certificate cert) {
        cert.setId(id);
        return certificateRepo.save(cert);
    }

    @DeleteMapping("/admin/certificates/{id}")
    public void deleteCertificate(@PathVariable String id) {
        certificateRepo.deleteById(id);
    }

    // Achievement Management
    @PostMapping("/admin/achievements")
    public Achievement addAchievement(@RequestBody Achievement achievement) {
        return achievementRepo.save(achievement);
    }

    @PutMapping("/admin/achievements/{id}")
    public Achievement updateAchievement(@PathVariable String id, @RequestBody Achievement achievement) {
        achievement.setId(id);
        return achievementRepo.save(achievement);
    }

    @DeleteMapping("/admin/achievements/{id}")
    public void deleteAchievement(@PathVariable String id) {
        achievementRepo.deleteById(id);
    }

    // Section Management
    @PostMapping("/admin/sections")
    public SectionText saveSection(@RequestBody SectionText section) {
        return sectionTextRepo.save(section);
    }
}
