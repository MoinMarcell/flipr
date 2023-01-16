package com.github.moinmarcell.backend.repo;

import com.github.moinmarcell.backend.model.Flipr;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FliprRepository extends MongoRepository<Flipr, String> {
    Optional<Flipr> findFliprByAuthor(String author);
}
