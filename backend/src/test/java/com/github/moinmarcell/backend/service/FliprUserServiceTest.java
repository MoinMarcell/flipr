package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.exception.FliprUserAlreadyExistException;
import com.github.moinmarcell.backend.exception.FliprUserNotFroundException;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.model.FliprUserResponse;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FliprUserServiceTest {

    IdService idService = mock(IdService.class);
    Argon2Service argon2Service = mock(Argon2Service.class);
    FliprUserRepo fliprUserRepo = mock(FliprUserRepo.class);
    FliprUserService fliprUserService = new FliprUserService(fliprUserRepo, idService, argon2Service);

    @Test
    void saveFliprUser_whenUserNotExist_thenSaveUserAndReturn() {
        FliprUser fliprUser = new FliprUser("1", "username", "123", Collections.emptyList(), Collections.emptyList());
        FliprUserDTO fliprUserDTO = new FliprUserDTO("username", "123");
        FliprUserResponse expected = new FliprUserResponse("1", "username", Collections.emptyList(), Collections.emptyList());

        when(fliprUserRepo.save(fliprUser)).thenReturn(fliprUser);
        when(idService.generateId()).thenReturn("1");
        when(argon2Service.encode(fliprUser.password())).thenReturn("123");

        FliprUserResponse actual = fliprUserService.saveFliprUser(fliprUserDTO);

        assertEquals(actual, expected);
        verify(fliprUserRepo).save(fliprUser);
    }

    @Test
    void saveFliprUser_whenUserExist_thenThrowFliprUserAlreadyExistException() {
        FliprUser fliprUser = new FliprUser("1", "username", "123", Collections.emptyList(), Collections.emptyList());
        fliprUserRepo.save(fliprUser);

        when(fliprUserRepo.save(fliprUser)).thenThrow(new FliprUserAlreadyExistException());

        assertThrows(FliprUserAlreadyExistException.class, () -> fliprUserRepo.save(fliprUser));

    }

    @Test
    void getFliprUserByUsername_whenUserExist_thenReturnUser() {
        FliprUser fliprUser = new FliprUser("1", "username", "123", Collections.emptyList(), Collections.emptyList());
        fliprUserRepo.save(fliprUser);
        FliprUserResponse expected = new FliprUserResponse(fliprUser.id(), fliprUser.username(), fliprUser.fliprs(), fliprUser.likedFliprs());

        when(fliprUserRepo.findByUsername(fliprUser.username())).thenReturn(Optional.of(fliprUser));

        FliprUserResponse actual = fliprUserService.getFliprUserByUsername(fliprUser.username());

        assertEquals(actual, expected);
        verify(fliprUserRepo).findByUsername(fliprUser.username());
    }

    @Test
    void getFliprUserByUsername_whenUserNotExist_thenThrowFliprUserNotFoundException(){
        when(fliprUserRepo.findByUsername("marcell")).thenThrow(new FliprUserNotFroundException());
        assertThrows(FliprUserNotFroundException.class, () -> fliprUserRepo.findByUsername("marcell"));
    }
}