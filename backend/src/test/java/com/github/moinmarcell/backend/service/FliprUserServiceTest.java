package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FliprUserServiceTest {

    IdService idService = mock(IdService.class);
    Argon2Service argon2Service = mock(Argon2Service.class);
    FliprUserRepo fliprUserRepo = mock(FliprUserRepo.class);
    FliprUserService fliprUserService = new FliprUserService(fliprUserRepo, idService, argon2Service);

}