package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.repo.FliprRepository;

import java.util.List;

public class FliprService {

    FliprRepository fliprRepository;

    public FliprService(FliprRepository fliprRepository) {
        this.fliprRepository = fliprRepository;
    }

    public List<Flipr> getAllFliprs(){
        return fliprRepository.findAll();
    }
}
