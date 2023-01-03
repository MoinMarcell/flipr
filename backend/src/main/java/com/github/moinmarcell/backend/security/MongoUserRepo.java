package com.github.moinmarcell.backend.security;

import com.github.moinmarcell.backend.model.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MongoUserRepo extends MongoRepository<MongoUser, String> {
    Optional<MongoUser> findByUsername(String username);
}
