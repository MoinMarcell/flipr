package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.model.FliprUserResponse;
import com.github.moinmarcell.backend.repo.FliprRepository;
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
    private final FliprRepository fliprRepository;

    public List<FliprUserResponse> allFliprUsers(){
        return fliprUserRepo
                .findAll()
                .stream()
                .map(user -> new FliprUserResponse(
                        user.id(),
                        user.username(),
                        user.fliprIds()))
                .toList();
    }

    public FliprUserResponse getFliprUser(String username){
        FliprUser fliprUser = fliprUserRepo
                .findByUsername(username)
                .orElseThrow();

        return new FliprUserResponse(
                fliprUser.id(),
                fliprUser.username(),
                fliprUser.fliprIds()
        );
    }

    public FliprUserResponse saveFliprUser(FliprUserDTO fliprUserDTO){
        FliprUser fliprUser = new FliprUser(
                idService.generateId(),
                fliprUserDTO.username(),
                argon2Service.encode(fliprUserDTO.password()),
                new ArrayList<>()
        );

        fliprUserRepo
                .save(fliprUser);

        return new FliprUserResponse(
                fliprUser.id(),
                fliprUser.username(),
                fliprUser.fliprIds()
        );
    }

    public FliprUserResponse updateFliprUser(String username, FliprUserDTO fliprUserDTO){
        FliprUser fliprUser = fliprUserRepo
                .findByUsername(username)
                .orElseThrow();

        List<Flipr> allFliprs = fliprRepository.findAll();
        List<String> allUserFliprs = fliprUser.fliprIds();

        for(int i = 0; i< allFliprs.size(); i++){
            if(allFliprs.get(i).id().equals(allUserFliprs.get(i))){
                Flipr flipr = fliprRepository.findById(allUserFliprs.get(i)).orElseThrow();
                Flipr fliprToUpdate = new Flipr(
                        flipr.id(),
                        flipr.content(),
                        fliprUserDTO.username(),
                        flipr.dateTime()
                );
                fliprRepository.save(fliprToUpdate);
            }
        }

        FliprUser fliprUserToUpdate = new FliprUser(
                fliprUser.id(),
                fliprUserDTO.username(),
                argon2Service.encode(fliprUserDTO.password()),
                fliprUser.fliprIds()
        );

        fliprUserRepo.save(fliprUserToUpdate);

        return new FliprUserResponse(
                fliprUserToUpdate.id(),
                fliprUserToUpdate.username(),
                fliprUserToUpdate.fliprIds()
        );
    }

    public String deleteFliprUser(String username){
        FliprUser fliprUser = fliprUserRepo
                .findByUsername(username)
                .orElseThrow();

        List<Flipr> allFliprs = fliprRepository
                .findAll();

        List<String> allUserFliprs = fliprUser
                .fliprIds();

        for(int i = 0; i < allFliprs.size(); i++){
            if(allFliprs.get(i).id().equals(allUserFliprs.get(i))){
                Flipr fliprtoDelete = fliprRepository
                        .findById(allUserFliprs.get(i))
                        .orElseThrow();
                fliprRepository.delete(fliprtoDelete);
            }
        }

        fliprUserRepo
                .delete(fliprUser);

        return "User deleted!";
    }

}
