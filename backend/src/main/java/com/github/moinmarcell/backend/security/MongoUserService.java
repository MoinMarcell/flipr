package com.github.moinmarcell.backend.security;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.service.Argon2Service;
import com.github.moinmarcell.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MongoUserService {

    private final MongoUserRepo mongoUserRepo;
    private final IdService idService;
    private final Argon2Service argon2Service;

    public FliprUser saveMongoUser(FliprUser user){
        FliprUser userToSave = new FliprUser(idService.generateId(), user.username(), argon2Service.encode(user.password()), user.email(), user.fliprList());
        mongoUserRepo.save(userToSave);
        return userToSave;
    }
}
