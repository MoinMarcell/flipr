package com.github.moinmarcell.backend.security;

import com.github.moinmarcell.backend.repo.FliprUserRepo;
import com.github.moinmarcell.backend.service.Argon2Service;
import com.github.moinmarcell.backend.service.FliprUserService;
import com.github.moinmarcell.backend.service.IdService;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class FliprUserServiceTest {

    FliprUserRepo fliprUserRepo = mock(FliprUserRepo.class);
    IdService idService = mock(IdService.class);
    Argon2Service argon2Service = mock(Argon2Service.class);

    FliprUserService fliprUserService = new FliprUserService(fliprUserRepo, idService, argon2Service);

    @Test
    void saveMongoUser() {
        MongoUserDTO toSave = new MongoUserDTO("username", "123", "hello@flipr.com", Collections.emptyList());
        FliprUser expected = new FliprUser("1", toSave.username(), toSave.password(), toSave.email(), toSave.fliprList());
        when(fliprUserRepo.save(any())).thenReturn(expected);
        when(idService.generateId()).thenReturn("1");
        when(argon2Service.encode("123")).thenReturn("123");

        FliprUser actual = fliprUserService.saveMongoUser(toSave);

        assertEquals(actual, expected);
        verify(fliprUserRepo).save(expected);
    }
}