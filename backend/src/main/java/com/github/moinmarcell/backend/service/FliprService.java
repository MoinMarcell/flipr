package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.repo.FliprRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FliprService {

    private final FliprRepository fliprRepository;
    private final IdService idService;

    public Flipr saveFlipr(FliprDTO fliprDTO){
        Flipr fliprToSave = new Flipr(
                idService.generateId(),
                fliprDTO.content(),
                fliprDTO.author(),
                new ArrayList<>(),
                0
                );
        fliprRepository.save(fliprToSave);
        return fliprToSave;
    }

    public List<Flipr> getAllFliprs(){
        return fliprRepository.findAll();
    }

    public Flipr getFliprById(String id) throws ChangeSetPersister.NotFoundException {
        Optional<Flipr> flipr = fliprRepository.findById(id);
        if(flipr.isEmpty()){
            throw new ChangeSetPersister.NotFoundException();
        }
        return new Flipr(flipr.get().id(), flipr.get().content(), flipr.get().author(), flipr.get().comments(), flipr.get().likes());
    }

}
