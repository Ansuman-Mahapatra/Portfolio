package com.portfolio.backend.repository;

import com.portfolio.backend.model.AiIntegration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiIntegrationRepository extends MongoRepository<AiIntegration, String> {
}
