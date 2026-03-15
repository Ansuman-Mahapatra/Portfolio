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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow frontend to fetch data
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
}
