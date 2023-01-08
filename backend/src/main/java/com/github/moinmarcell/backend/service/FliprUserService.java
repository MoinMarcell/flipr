package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.model.FliprUserRegistrationDTO;
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

    public FliprUserDTO saveFliprUser(FliprUserRegistrationDTO fliprUserRegistrationDTO){
        FliprUser fliprUserToSave = new FliprUser(
                idService.generateId(),
                fliprUserRegistrationDTO.username(),
                argon2Service.encode(fliprUserRegistrationDTO.password()),
                "",
                new ArrayList<>(),
                new ArrayList<>());

        FliprUserDTO user = new FliprUserDTO(
                fliprUserToSave.id(),
                fliprUserToSave.username(),
                fliprUserToSave.avatar(),
                fliprUserToSave.fliprs(),
                fliprUserToSave.favFliprs());

        fliprUserRepo.save(fliprUserToSave);

        return user;
    }

    public List<FliprUserDTO> getAllFliprUsers(){
        List<FliprUser> allFliprUsers = fliprUserRepo.findAll();
        return allFliprUsers.stream().map(fliprUser ->
            new FliprUserDTO(fliprUser.id(), fliprUser.username(), fliprUser.avatar(), fliprUser.fliprs(), fliprUser.favFliprs()))
                .toList();
    }

    public FliprUserDTO getFliprUserByUsername(String username) throws ChangeSetPersister.NotFoundException {
        Optional<FliprUser> fliprUserByUsername = fliprUserRepo.findByUsername(username);
        if(fliprUserByUsername.isEmpty()){
            throw new ChangeSetPersister.NotFoundException();
        }
        return new FliprUserDTO(fliprUserByUsername.get().id(), fliprUserByUsername.get().username(), fliprUserByUsername.get().avatar(), fliprUserByUsername.get().fliprs(), fliprUserByUsername.get().favFliprs());
    }
}
