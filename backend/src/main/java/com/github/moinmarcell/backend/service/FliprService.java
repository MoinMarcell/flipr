package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.repo.FliprRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FliprService {

    FliprRepository fliprRepository;
    IdService idService;

    public FliprService(FliprRepository fliprRepository, IdService idService) {
        this.fliprRepository = fliprRepository;
        this.idService = idService;
    }

    public List<Flipr> getAllFliprs() {
        return fliprRepository.findAll();
    }

    public Flipr saveFlipr(FliprDTO fliprDTO) {
        Flipr fliprToSave = new Flipr(
                idService.generateId(),
                fliprDTO.content(),
                fliprDTO.author()
        );
        fliprRepository.save(fliprToSave);
        return fliprToSave;
    }
}
