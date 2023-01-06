package com.github.moinmarcell.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("fliprs")
public record Flipr(
        @Id
        String id,
        String content,
        String author
){
}
