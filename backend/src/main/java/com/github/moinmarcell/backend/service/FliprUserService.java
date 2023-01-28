package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.model.FliprUserResponse;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class FliprUserService {

    private final FliprUserRepo fliprUserRepo;
    private final IdService idService;
    private final Argon2Service argon2Service;

    public FliprUserResponse saveFliprUser(FliprUserDTO userToSave){
        FliprUser fliprUser = new FliprUser(
                idService.generateId(),
                userToSave.username(),
                argon2Service.encode(userToSave.password()),
                new ArrayList<>()
        );
        fliprUserRepo.save(fliprUser);

        return new FliprUserResponse(
                fliprUser.id(),
                fliprUser.username(),
                fliprUser.fliprs()
        );
    }

    public FliprUserResponse getFliprUserByUsername(String username){
        FliprUser fliprUser = fliprUserRepo.findByUsername(username).orElseThrow();
        return new FliprUserResponse(
                fliprUser.id(),
                fliprUser.username(),
                fliprUser.fliprs()
        );
    }

}
