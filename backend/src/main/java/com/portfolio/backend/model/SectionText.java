package com.portfolio.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sections")
public class SectionText {
    @Id
    private String id;
    private String sectionKey; // e.g., "visit", "contact"
    private String title;
    private String description;
}
