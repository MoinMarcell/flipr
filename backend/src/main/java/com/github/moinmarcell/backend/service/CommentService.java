package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.exception.FliprNotFoundException;
import com.github.moinmarcell.backend.model.Comment;
import com.github.moinmarcell.backend.model.CommentDTO;
import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.repo.CommentRepo;
import com.github.moinmarcell.backend.repo.FliprRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepo commentRepo;
    private final IdService idService;
    private final LocalDateService localDateService;
    private final FliprRepository fliprRepository;

    public Comment saveComment(CommentDTO commentDTO){
        Comment commentToSave = new Comment(
                idService.generateId(),
                commentDTO.content(),
                commentDTO.author(),
                localDateService.getDate()
        );
        commentRepo.save(commentToSave);

        Flipr flipr = fliprRepository.findById(commentDTO.fliprId()).orElseThrow(FliprNotFoundException::new);
        flipr.comments().add(commentToSave);
        fliprRepository.save(flipr);

        return commentToSave;
    }

}
