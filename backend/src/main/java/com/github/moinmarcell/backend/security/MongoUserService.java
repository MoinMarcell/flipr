package com.github.moinmarcell.backend.security;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MongoUserService {

    private final MongoUserRepo mongoUserRepo;
    private final IdService idService;
    private final Argon2PasswordEncoder argon2PasswordEncoder = new Argon2PasswordEncoder();

    public FliprUser saveMongoUser(FliprUser user){
        FliprUser userToSave = new FliprUser(idService.generateId(), user.username(), argon2PasswordEncoder.encode(user.password()), user.email(), user.fliprList());
        mongoUserRepo.save(userToSave);
        return userToSave;
    }

    public FliprUser updateMongoUser(FliprUser user){
        mongoUserRepo.save(user);
        return user;
    }
}
