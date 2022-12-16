package com.github.moinmarcell.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("hashtags")
public record Hashtag(
        @Id
        String id,
        String name
){
}
