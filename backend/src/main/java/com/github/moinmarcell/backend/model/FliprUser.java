package com.github.moinmarcell.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("users")
public record FliprUser(
        String fliprID,
        String username,
        String password,
        @Id
        String email,
        List<Flipr> fliprList
){
}
