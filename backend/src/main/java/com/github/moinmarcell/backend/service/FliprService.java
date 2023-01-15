package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.repo.FliprRepository;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FliprService {

    private final FliprRepository fliprRepository;
    private final IdService idService;
    private final LocalDateService localDateService;
    private final FliprUserRepo fliprUserRepo;

    public List<Flipr> getAllFliprs() {
        return fliprRepository
                .findAll();
    }

    public Flipr getFliprById(String id) {
        return fliprRepository
                .findById(id)
                .orElseThrow();
    }

    public Flipr saveFlipr(FliprDTO fliprDTO) {
        Flipr fliprToSave = new Flipr(
                idService.generateId(),
                fliprDTO.content(),
                fliprDTO.author(),
                localDateService.getDate()
        );

        fliprRepository
                .save(fliprToSave);

        FliprUser fliprUser = fliprUserRepo
                .findByUsername(fliprToSave.author())
                .orElseThrow();

        fliprUser
                .fliprIds()
                .add(fliprToSave.id());

        fliprUserRepo
                .save(fliprUser);

        return fliprRepository
                .findById(fliprToSave.id())
                .orElseThrow();
    }

    public String deleteFliprById(String id){
        Flipr fliprToDelete = fliprRepository
                .findById(id)
                .orElseThrow();

        FliprUser fliprUser = fliprUserRepo
                .findByUsername(fliprToDelete.author())
                .orElseThrow();

        fliprUser.fliprIds()
                .remove(fliprToDelete.id());

        fliprUserRepo
                .save(fliprUser);

        fliprRepository
                .delete(fliprToDelete);

        return "Flipr deleted!";
    }

}
