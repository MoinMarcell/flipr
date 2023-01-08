package com.github.moinmarcell.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("FliprUser")
public record FliprUser(
        @Id
        String id,
        @Indexed(unique = true)
        String username,
        String password,
        String avatar,
        List<String> fliprs, //Id of fliprs
        List<String> favFliprs //Id of fliprs
) {
}
