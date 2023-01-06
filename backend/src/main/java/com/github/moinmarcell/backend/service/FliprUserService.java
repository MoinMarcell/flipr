package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.security.MongoUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FliprUserService {

    private final MongoUserRepo mongoUserRepo;

    public List<FliprUserDTO> getAllFliprUsers(){
        List<FliprUser> allFliprUsers = mongoUserRepo.findAll();
        return allFliprUsers.stream().map(fliprUser -> new FliprUserDTO(fliprUser.fliprID(), fliprUser.username(), fliprUser.email(), fliprUser.fliprList())).toList();
    }

    public FliprUserDTO getFliprUserByUsername(String username) throws ChangeSetPersister.NotFoundException {
        Optional<FliprUser> user = mongoUserRepo.findByUsername(username);
        if (user.isEmpty()) {
            throw new ChangeSetPersister.NotFoundException();
        }
        return new FliprUserDTO(user.get().fliprID(), user.get().username(), user.get().email(), user.get().fliprList());
    }

    public FliprUserDTO getFliprUserByFliprID(String fliprID) throws ChangeSetPersister.NotFoundException {
        Optional<FliprUser> user = mongoUserRepo.findFliprUserByFliprID(fliprID);
        if (user.isEmpty()) {
            throw new ChangeSetPersister.NotFoundException();
        }
        return new FliprUserDTO(user.get().fliprID(), user.get().username(), user.get().email(), user.get().fliprList());
    }
}
