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

    public Flipr saveFlipr(FliprDTO fliprDTO) {
        Flipr fliprToSave = new Flipr(
                idService.generateId(),
                fliprDTO.content(),
                fliprDTO.author(),
                localDateService.getDate()
        );

        fliprRepository.save(fliprToSave);

        return fliprToSave;
    }

    public List<Flipr> getAllFliprs() {
        return fliprRepository.findAll();
    }

    public Flipr getFliprById(String id) {
        return fliprRepository
                .findById(id)
                .orElseThrow();
    }

    public void deleteFliprById(String id) {
        Flipr fliprToDelete = fliprRepository.findById(id).orElseThrow();
        FliprUser user = fliprUserRepo.findByUsername(fliprToDelete.author()).orElseThrow();

        user.likedFliprs().remove(fliprToDelete);
        fliprUserRepo.save(user);

        fliprRepository.delete(fliprToDelete);
    }

}
