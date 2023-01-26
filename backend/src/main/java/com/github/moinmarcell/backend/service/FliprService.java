package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.exception.FliprNotFoundException;
import com.github.moinmarcell.backend.exception.FliprUserNotFroundException;
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

    public List<Flipr> getAllFliprs() {
        return fliprRepository
                .findAll();
    }

    public Flipr getFliprById(String id) {
        return fliprRepository
                .findById(id)
                .orElseThrow(FliprNotFoundException::new);
    }

    public Flipr getFliprByAuthor(String author) {
        return fliprRepository
                .findFliprByAuthor(author)
                .orElseThrow(FliprNotFoundException::new);
    }

    public Flipr saveFlipr(FliprDTO flipr) {
        Flipr fliprToSave = new Flipr(
                idService.generateId(),
                flipr.content(),
                flipr.author(),
                localDateService.getDate(),
                new ArrayList<>(),
                0L
        );
        fliprRepository.save(fliprToSave);

        FliprUser fliprUser = fliprUserRepo
                .findByUsername(fliprToSave.author())
                .orElseThrow(FliprUserNotFroundException::new);
        fliprUser.fliprs().add(fliprToSave);
        fliprUserRepo.save(fliprUser);

        return fliprToSave;
    }

    public void deleteFliprById(String id) {
        if(fliprRepository.existsById(id)){
            fliprRepository.deleteById(id);
        }
        throw new FliprNotFoundException();
    }

}
