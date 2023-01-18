package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.Comment;
import com.github.moinmarcell.backend.model.CommentDTO;
import com.github.moinmarcell.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
   private final CommentService commentService;

   @PostMapping
    public Comment saveComment(@RequestBody CommentDTO commentDTO){
       return commentService.saveComment(commentDTO);
   }
}
