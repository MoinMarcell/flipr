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

    @Test
    void saveFliprUser() {
        FliprUserDTO fliprUserToSave = new FliprUserDTO(
                "1",
                "username",
                "123",
                Collections.emptyList()
        );
        FliprUser expected = new FliprUser(
                "1",
                "username",
                "***",
                Collections.emptyList()
        );

        when(fliprUserRepo.save(expected)).thenReturn(expected);
        when(idService.generateId()).thenReturn("1");
        when(argon2Service.encode("123")).thenReturn("***");

        FliprUser actual = fliprUserService.saveFliprUser(fliprUserToSave);

        assertEquals(expected, actual);
        verify(fliprUserRepo).save(expected);
    }

    @Test
    void updateFliprUser() {
        FliprUserDTO fliprUserToSave = new FliprUserDTO(
                "1",
                "username",
                "123",
                Collections.emptyList()
        );
        FliprUser expected = new FliprUser(
                "1",
                "username",
                "***",
                Collections.emptyList()
        );

        when(fliprUserRepo.save(expected)).thenReturn(expected);
        when(argon2Service.encode(fliprUserToSave.password())).thenReturn("***");

        FliprUser actual = fliprUserService.updateFliprUser(fliprUserToSave);

        assertEquals(expected, actual);
        verify(fliprUserRepo).save(new FliprUser(
                "1",
                "username",
                "123",
                Collections.emptyList()
        ));
    }

    @Test
    void deleteFliprUserById() {
        FliprUser fliprUserToDelete = new FliprUser(
                "1",
                "username",
                "123",
                Collections.emptyList()
        );
        fliprUserService.deleteFliprUserById(fliprUserToDelete.id());
        verify(fliprUserRepo).deleteById(fliprUserToDelete.id());
    }
}