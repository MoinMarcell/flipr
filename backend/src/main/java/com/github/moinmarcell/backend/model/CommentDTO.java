package com.github.moinmarcell.backend.model;

public record CommentDTO(
        String content,
        String author,
        String fliprId
) {
}
