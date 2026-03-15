package com.portfolio.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "feedbacks")
public class Feedback {
    @Id
    private String id;
    private String rating; // E.g., "worthy", "needs_fire"
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();
}
