package com.github.moinmarcell.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Comment")
public record Comment(
        @Id
        String id,
        String content,
        FliprUser author
) {
}
