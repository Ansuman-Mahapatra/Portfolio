package com.portfolio.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class Profile {
    @Id
    private String id;
    private String name;
    private String title;
    private String tagline;
    private String about;
    private String resumeUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String photoUrl;
}
