package com.github.moinmarcell.backend.repo;

import com.github.moinmarcell.backend.model.FliprUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FliprUserRepo extends MongoRepository<FliprUser, String> {
    Optional<FliprUser> findByUsername(String username);
}
