package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.security.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FliprUserService {

    private final UserRepo userRepo;

    public List<FliprUserDTO> getAllFliprUsers(){
        List<FliprUser> allFliprUsers = userRepo.findAll();
        return allFliprUsers.stream().map(fliprUser -> new FliprUserDTO(fliprUser.fliprID(), fliprUser.username(), fliprUser.email(), fliprUser.fliprList())).toList();
    }

    public Optional<FliprUserDTO> getFliprUserByUsername(String username){
        Optional<FliprUser> user = userRepo.findByUsername(username);
        return user.map(fliprUser -> new FliprUserDTO(fliprUser.fliprID(), fliprUser.username(), fliprUser.email(), fliprUser.fliprList()));
    }

    public Optional<FliprUserDTO> getFliprUserByFliprID(String fliprID){
        Optional<FliprUser> user = userRepo.findFliprUserByFliprID(fliprID);
        return user.map(fliprUser -> new FliprUserDTO(fliprUser.fliprID(), fliprUser.username(), fliprUser.email(), fliprUser.fliprList()));
    }
}
