package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.Mockito.*;

class FliprUserDetailsServiceTest {

    FliprUserRepo fliprUserRepo = mock(FliprUserRepo.class);
    FliprUserDetailsService fliprUserDetailsService = new FliprUserDetailsService(fliprUserRepo);

    @Test
    void loadUserByUsername() {
        String username = "user";
        FliprUser expected = new FliprUser(
                "1",
                "user",
                "123",
                Collections.emptyList()
        );

        fliprUserRepo.save(expected);

        when(fliprUserRepo.findByUsername(username)).thenReturn(Optional.of(expected));

        fliprUserDetailsService.loadUserByUsername(username);

        verify(fliprUserRepo).findByUsername(username);
    }
}