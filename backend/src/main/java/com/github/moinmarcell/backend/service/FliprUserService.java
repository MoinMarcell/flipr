package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.exception.FliprUserAlreadyExistException;
import com.github.moinmarcell.backend.exception.FliprUserNotFroundException;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.model.FliprUserResponse;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FliprUserService {

    private final FliprUserRepo fliprUserRepo;
    private final IdService idService;
    private final Argon2Service argon2Service;

    public FliprUserResponse saveFliprUser(FliprUserDTO userToSave) {
        if (fliprUserRepo.existsByUsername(userToSave.username())) {
            throw new FliprUserAlreadyExistException();
        }

        FliprUser fliprUser = new FliprUser(
                idService.generateId(),
                userToSave.username(),
                argon2Service.encode(userToSave.password()),
                new ArrayList<>(),
                new ArrayList<>()
        );

        fliprUserRepo.save(fliprUser);

        return new FliprUserResponse(
                fliprUser.id(),
                fliprUser.username(),
                fliprUser.fliprs(),
                fliprUser.likedFliprs()
        );
    }

    public FliprUserResponse getFliprUserByUsername(String username) {
        FliprUser fliprUser = fliprUserRepo.findByUsername(username).orElseThrow(FliprUserNotFroundException::new);
        return new FliprUserResponse(
                fliprUser.id(),
                fliprUser.username(),
                fliprUser.fliprs(),
                fliprUser.likedFliprs()
        );
    }

    public List<FliprUserResponse> getAllFliprUsers(){
        List<FliprUser> allFliprUsers = fliprUserRepo.findAll();
        return allFliprUsers.stream().map(user -> new FliprUserResponse(user.id(), user.username(), user.fliprs(), user.likedFliprs())).toList();
    }

}
