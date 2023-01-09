package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public FliprUser updateFliprUser(String id, FliprUserDTO fliprUserDTO){
        FliprUser fliprUserToUpdate = new FliprUser(
                id,
                fliprUserDTO.username(),
                argon2Service.encode(fliprUserDTO.password()),
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

    public List<FliprUser> getAllFliprUsers() {
        return fliprUserRepo.findAll().stream().map(user -> new FliprUser(user.id(), user.username(), "***", user.fliprs()))
                .toList();
    }

    public FliprUser getFliprUserByUsername(String username) throws ChangeSetPersister.NotFoundException {
        Optional<FliprUser> fliprUser = fliprUserRepo.findByUsername(username);
        if (fliprUser.isEmpty()) {
            throw new ChangeSetPersister.NotFoundException();
        }
        return new FliprUser(
                fliprUser.get().id(),
                fliprUser.get().username(),
                "***",
                fliprUser.get().fliprs()
        );
    }

    public FliprUser getFliprUserById(String id) throws ChangeSetPersister.NotFoundException {
        Optional<FliprUser> fliprUser = fliprUserRepo.findById(id);
        if (fliprUser.isEmpty()) {
            throw new ChangeSetPersister.NotFoundException();
        }
        return new FliprUser(
                fliprUser.get().id(),
                fliprUser.get().username(),
                "***",
                fliprUser.get().fliprs()
        );
    }

    public String deleteFliprUserById(String id) throws ChangeSetPersister.NotFoundException {
        Optional<FliprUser> fliprUserToDelete = fliprUserRepo.findById(id);
        if(fliprUserToDelete.isEmpty()){
            throw new ChangeSetPersister.NotFoundException();
        }
        fliprUserRepo.deleteById(id);
        return fliprUserToDelete.get().username() + " deleted!";
    }

}
