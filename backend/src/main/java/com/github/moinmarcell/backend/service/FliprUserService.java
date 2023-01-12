package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.repo.FliprRepository;
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
    private final FliprRepository fliprRepository;

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
                fliprUserToSave.likedFliprs()
        );
    }

    public FliprUser updateFliprUser(FliprUserDTO fliprUserDTO){
        FliprUser fliprUserToUpdate = new FliprUser(
                fliprUserDTO.id(),
                fliprUserDTO.username(),
                fliprUserDTO.password(),
                fliprUserDTO.likedFliprs()
        );
        fliprUserRepo.save(fliprUserToUpdate);

        return new FliprUser(
                fliprUserToUpdate.id(),
                fliprUserToUpdate.username(),
                "***",
                fliprUserToUpdate.likedFliprs()
        );
    }

    public void deleteFliprUserById(String id) {
        fliprUserRepo.deleteById(id);
    }

    public FliprUser saveLikedFliprToUser(String fliprId, String username){
        FliprUser user = fliprUserRepo.findByUsername(username).orElseThrow();
        for(int i = 0; i < user.likedFliprs().size(); i++){
            if(user.likedFliprs().get(i).id().equals(fliprId)){
                return user;
            }
        }
        Flipr fliprToSave = fliprRepository.findById(fliprId).orElseThrow();
        user.likedFliprs().add(fliprToSave);
        fliprUserRepo.save(user);
        return fliprUserRepo.findByUsername(username).orElseThrow();
    }

}
