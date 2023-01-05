package com.github.moinmarcell.backend.model;

import java.util.List;

public record MongoUserDTO (
        String username,
        String password,
        String email,
        List<Flipr> fliprList
){
}
