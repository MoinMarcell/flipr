package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.model.Comment;
import com.github.moinmarcell.backend.model.CommentDTO;
import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.repo.CommentRepo;
import com.github.moinmarcell.backend.repo.FliprRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CommentServiceTest {

    CommentRepo commentRepo = mock(CommentRepo.class);
    IdService idService = mock(IdService.class);
    LocalDateService localDateService = mock(LocalDateService.class);
    FliprRepository fliprRepository = mock(FliprRepository.class);

    CommentService commentService = new CommentService(commentRepo, idService, localDateService, fliprRepository);

    @Test
    void saveComment_whenCommentSaved_thenReturnComment() {
        Comment expected = new Comment("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1));
        CommentDTO commentToSave = new CommentDTO("content", "author", "1");
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1), new ArrayList<>(), 0L);
        flipr.comments().add(expected);

        when(commentRepo.save(expected)).thenReturn(expected);
        when(idService.generateId()).thenReturn("1");
        when(localDateService.getDate()).thenReturn(LocalDateTime.of(1, 1, 1, 1, 1));
        when(fliprRepository.findById("1")).thenReturn(Optional.of(flipr));

        Comment actual = commentService.saveComment(commentToSave);

        assertEquals(actual, expected);
        verify(commentRepo).save(expected);
    }
}