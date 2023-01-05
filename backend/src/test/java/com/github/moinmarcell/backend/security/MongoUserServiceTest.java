package com.github.moinmarcell.backend.security;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.service.Argon2Service;
import com.github.moinmarcell.backend.service.IdService;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MongoUserServiceTest {

    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    IdService idService = mock(IdService.class);
    Argon2Service argon2Service = mock(Argon2Service.class);

    MongoUserService mongoUserService = new MongoUserService(mongoUserRepo, idService, argon2Service);

    @Test
    void saveMongoUser() {
        FliprUser expected = new FliprUser("1", "username", "123", "hello@flipr.com", Collections.emptyList());

        when(mongoUserRepo.save(any())).thenReturn(expected);
        when(idService.generateId()).thenReturn("1");
        when(argon2Service.encode("123")).thenReturn("123");

        FliprUser actual = mongoUserService.saveMongoUser(expected);

        assertEquals(actual, expected);
        verify(mongoUserRepo).save(expected);
    }
}