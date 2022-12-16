package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.repo.FliprRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FliprService {

    FliprRepository fliprRepository;

    public FliprService(FliprRepository fliprRepository) {
        this.fliprRepository = fliprRepository;
    }

    public List<Flipr> getAllFliprs(){
        return fliprRepository.findAll();
    }
}
