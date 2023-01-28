package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.repo.FliprRepository;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FliprService {

    private final FliprRepository fliprRepository;
    private final IdService idService;
    private final LocalDateService localDateService;
    private final FliprUserRepo fliprUserRepo;
    
    public List<Flipr> getAllFliprs(){
        return fliprRepository
                .findAll();
    }

    public Flipr getFliprById(String id){
        return fliprRepository
                .findById(id)
                .orElseThrow();
    }

    public Flipr getFliprByAuthor(String author){
        return fliprRepository
                .findFliprByAuthor(author)
                .orElseThrow();
    }

    public Flipr saveFlipr(FliprDTO flipr){
        Flipr fliprToSave = new Flipr(
                idService.generateId(),
                flipr.content(),
                flipr.author(),
                localDateService.getDate(),
                new ArrayList<>()
        );
        fliprRepository.save(fliprToSave);

        FliprUser fliprUser = fliprUserRepo
                .findByUsername(fliprToSave.author())
                .orElseThrow();
        fliprUser.fliprs().add(fliprToSave);
        fliprUserRepo.save(fliprUser);

        return fliprToSave;
    }

}
