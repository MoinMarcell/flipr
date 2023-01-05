package com.github.moinmarcell.backend.security;

import com.github.moinmarcell.backend.model.FliprUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MongoUserRepo extends MongoRepository<FliprUser, String> {
    Optional<FliprUser> findByUsername(String username);
    Optional<FliprUser> findFliprUserByFliprID(String fliprID);
}
