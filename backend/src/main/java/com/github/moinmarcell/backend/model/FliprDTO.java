package com.github.moinmarcell.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("fliprs")
public record FliprDTO(
        String content,
        Author author
){
}
