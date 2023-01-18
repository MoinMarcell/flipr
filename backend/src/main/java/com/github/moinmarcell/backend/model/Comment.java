package com.github.moinmarcell.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("Comment")
public record Comment(
        @Id
        String id,
        String content,
        String author,
        LocalDateTime dateTime
) {
}
