package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
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

    public FliprUser saveFliprUser(FliprUserDTO fliprUserDTO) {
        FliprUser fliprUserToSave = new FliprUser(
                idService.generateId(),
                fliprUserDTO.username(),
                argon2Service.encode(fliprUserDTO.password()),
                new ArrayList<>()
        );

        fliprUserRepo.save(fliprUserToSave);

        return new FliprUser(
                fliprUserToSave.id(),
                fliprUserToSave.username(),
                "***",
                fliprUserToSave.fliprs()
        );
    }

    public FliprUser updateFliprUser(FliprUserDTO fliprUserDTO){
        FliprUser fliprUserToUpdate = new FliprUser(
                fliprUserDTO.id(),
                fliprUserDTO.username(),
                fliprUserDTO.password(),
                fliprUserDTO.fliprs()
        );
        fliprUserRepo.save(fliprUserToUpdate);

        return new FliprUser(
                fliprUserToUpdate.id(),
                fliprUserToUpdate.username(),
                "***",
                fliprUserToUpdate.fliprs()
        );
    }

    public void deleteFliprUserById(String id) {
        fliprUserRepo.deleteById(id);
    }

}
