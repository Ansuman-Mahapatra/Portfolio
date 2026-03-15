package com.portfolio.backend.repository;

import com.portfolio.backend.model.SectionText;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SectionTextRepository extends MongoRepository<SectionText, String> {
    Optional<SectionText> findBySectionKey(String sectionKey);
}
