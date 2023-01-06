package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.security.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FliprUserServiceTest {

    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    FliprUserService fliprUserService = new FliprUserService(mongoUserRepo);

    @Test
    void getAllFliprUsers() {
        List<FliprUser> list = Collections.emptyList();
        List<FliprUserDTO> expected = Collections.emptyList();

        when(mongoUserRepo.findAll()).thenReturn(list);
        List<FliprUserDTO> actual = fliprUserService.getAllFliprUsers();

        assertEquals(actual, expected);
        verify(mongoUserRepo).findAll();
    }

    @Test
    void getFliprUserByUsername() throws ChangeSetPersister.NotFoundException {
        FliprUser fliprUser = new FliprUser("1", "username", "123", "mail@mail.com", Collections.emptyList());
        FliprUserDTO expected = new FliprUserDTO(fliprUser.fliprID(), fliprUser.username(), fliprUser.email(), fliprUser.fliprList());

        when(mongoUserRepo.findByUsername("username")).thenReturn(Optional.of(fliprUser));
        FliprUserDTO actual = fliprUserService.getFliprUserByUsername("username");

        assertEquals(actual, expected);
        verify(mongoUserRepo).findByUsername("username");
    }

    @Test
    void getFliprUserByFliprID() throws ChangeSetPersister.NotFoundException {
        FliprUser fliprUser = new FliprUser("1", "username", "123", "mail@mail.com", Collections.emptyList());
        FliprUserDTO expected = new FliprUserDTO(fliprUser.fliprID(), fliprUser.username(), fliprUser.email(), fliprUser.fliprList());

        when(mongoUserRepo.findFliprUserByFliprID("1")).thenReturn(Optional.of(fliprUser));
        FliprUserDTO actual = fliprUserService.getFliprUserByFliprID("1");

        assertEquals(actual, expected);
        verify(mongoUserRepo).findFliprUserByFliprID("1");
    }
}