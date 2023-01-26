package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.exception.FliprNotFoundException;
import com.github.moinmarcell.backend.exception.FliprUserNotFroundException;
import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.repo.FliprRepository;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
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


    @Test
    void getAllFliprs_whenFliprListExist_thenReturnEmptyList() {
        List<Flipr> expected = Collections.emptyList();
        when(fliprRepository.findAll()).thenReturn(expected);
        List<Flipr> actual = fliprService.getAllFliprs();

        assertEquals(actual, expected);
        verify(fliprRepository).findAll();
    }

    @Test
    void getFliprById_whenFliprExist_thenReturnFliprById() {
        Flipr expected = new Flipr("1", "content", "author", localDateService.getDate(), Collections.emptyList(), 0L);
        when(fliprRepository.findById(expected.id())).thenReturn(Optional.of(expected));
        Flipr actual = fliprService.getFliprById("1");

        assertEquals(actual, expected);
        verify(fliprRepository).findById("1");
    }

    @Test
    void getFliprById_whenFliprNotExist_thenThrowException() {
        when(fliprRepository.findById("1")).thenThrow(new FliprNotFoundException());
        assertThrows(FliprNotFoundException.class, () -> fliprRepository.findById("1"));
    }

    @Test
    void getFliprByAuthor_whenFliprExist_thenReturnFliprByAuthor() {
        Flipr expected = new Flipr("1", "content", "author", localDateService.getDate(), Collections.emptyList(), 0L);
        when(fliprRepository.findFliprByAuthor(expected.author())).thenReturn(Optional.of(expected));
        Flipr actual = fliprService.getFliprByAuthor("author");

        assertEquals(actual, expected);
        verify(fliprRepository).findFliprByAuthor("author");
    }

    @Test
    void getFliprByAuthor_whenFliprNotExist_thenThrowException() {
        when(fliprRepository.findFliprByAuthor("marcell")).thenThrow(new FliprNotFoundException());
        assertThrows(FliprNotFoundException.class, () -> fliprRepository.findFliprByAuthor("marcell"));
    }

    @Test
    void saveFlipr_whenUserIsLoggedIn_thenSaveFliprToDatabase() {
        Flipr expected = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1), Collections.emptyList(), 0L);
        FliprUser fliprUser = new FliprUser("1", "author", "123", new ArrayList<>(), new ArrayList<>());
        fliprUser.fliprs().add(expected);
        FliprDTO fliprDTO = new FliprDTO("content", "author");

        when(fliprRepository.save(expected)).thenReturn(expected);
        when(idService.generateId()).thenReturn("1");
        when(localDateService.getDate()).thenReturn(LocalDateTime.of(1, 1, 1, 1, 1));
        when(fliprUserRepo.findByUsername(fliprDTO.author())).thenReturn(Optional.of(fliprUser));

        Flipr actual = fliprService.saveFlipr(fliprDTO);

        assertEquals(actual, expected);
        verify(fliprRepository).save(expected);
    }

    @Test
    void saveFlipr_whenUserIsNotLoggedIn_thenThrowUserNotFoundException() {
        when(fliprUserRepo.findByUsername("marcell")).thenThrow(new FliprUserNotFroundException());
        assertThrows(FliprUserNotFroundException.class, () -> fliprUserRepo.findByUsername("marcell"));
    }

    @Test
    void deleteFliprById_whenFliprExist_thenDeleteFlipr() {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1), Collections.emptyList(), 0L);
        fliprRepository.save(flipr);

        when(fliprRepository.existsById(any())).thenReturn(true);


        verify(fliprRepository, times(0)).deleteById("1");
    }

    @Test
    void deleteFliprById_whenFliprNotExist_thenThrowFliprNotFoundException() {
        when(fliprRepository.existsById(any())).thenReturn(false);

        assertThrows(FliprNotFoundException.class, () -> fliprService.deleteFliprById("1"));
        verify(fliprRepository, times(0)).deleteById("1");
    }
}