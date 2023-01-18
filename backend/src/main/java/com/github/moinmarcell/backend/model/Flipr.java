package com.github.moinmarcell.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document("Flipr")
public record Flipr(
        @Id
        String id,
        String content,
        String author,
        LocalDateTime dateTime,
        List<Comment> comments
) {
}
