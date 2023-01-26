package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.exception.FliprUserNotFroundException;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class FliprUserDetailsServiceTest {

    FliprUserRepo fliprUserRepo = mock(FliprUserRepo.class);
    FliprUserDetailsService fliprUserDetailsService = new FliprUserDetailsService(fliprUserRepo);

    @Test
    void loadUserByUsername_whenUserExist_thenReturnUsername() {
        String username = "user";
        FliprUser expected = new FliprUser(
                "1",
                "user",
                "123",
                Collections.emptyList(),
                Collections.emptyList()
        );

        fliprUserRepo.save(expected);

        when(fliprUserRepo.findByUsername(username)).thenReturn(Optional.of(expected));

        fliprUserDetailsService.loadUserByUsername(username);

        verify(fliprUserRepo).findByUsername(username);
    }

    @Test
    void loadUserByUsername_whenUserNotExist_thenReturnUserNotFoundException(){
        when(fliprUserRepo.findByUsername("marcell")).thenThrow(new FliprUserNotFroundException());
        assertThrows(FliprUserNotFroundException.class, () -> fliprUserRepo.findByUsername("marcell"));
    }
}