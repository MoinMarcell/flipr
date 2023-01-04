package com.github.moinmarcell.backend.security;

import com.github.moinmarcell.backend.model.MongoUser;
import com.github.moinmarcell.backend.service.IdService;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MongoUserService {

    MongoUserRepo mongoUserRepo;
    IdService idService;
    Argon2PasswordEncoder argon2PasswordEncoder = new Argon2PasswordEncoder();

    public MongoUserService(MongoUserRepo mongoUserRepo, IdService idService) {
        this.mongoUserRepo = mongoUserRepo;
        this.idService = idService;
    }

    public MongoUser saveMongoUser(MongoUser user){
        MongoUser userToSave = new MongoUser(idService.generateId(), user.username(), argon2PasswordEncoder.encode(user.password()), user.email(), user.fliprList());
        mongoUserRepo.save(userToSave);
        return userToSave;
    }
}
