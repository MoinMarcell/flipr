package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.repo.FliprRepository;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FliprServiceTest {

    IdService idService = mock(IdService.class);
    FliprRepository fliprRepository = mock(FliprRepository.class);
    LocalDateService localDateService = mock(LocalDateService.class);
    FliprUserRepo fliprUserRepo = mock(FliprUserRepo.class);
    FliprService fliprService = new FliprService(fliprRepository, idService, localDateService, fliprUserRepo);

}