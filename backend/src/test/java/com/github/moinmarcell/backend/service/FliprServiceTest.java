package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Author;
import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.repo.FliprRepository;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FliprServiceTest {

    FliprRepository fliprRepository = mock(FliprRepository.class);
    IdService idService = mock(IdService.class);
    FliprService fliprService = new FliprService(fliprRepository, idService);

    @Test
    void getAllFliprs() {
        List<Flipr> expected = Collections.emptyList();

        when(fliprRepository.findAll()).thenReturn(expected);
        List<Flipr> actual = fliprService.getAllFliprs();

        assertEquals(expected, actual);
        verify(fliprRepository).findAll();
    }

    @Test
    void saveFlipr() {
        FliprDTO fliprDTO = new FliprDTO("content", new Author("username"));
        Flipr expected = new Flipr("1", "content", new Author("username"));

        when(fliprRepository.save(any())).thenReturn(expected);
        when(idService.generateId()).thenReturn("1");

        Flipr actual = fliprService.saveFlipr(fliprDTO);

        assertEquals(actual, expected);
        verify(fliprRepository).save(expected);
    }
}