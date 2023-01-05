package com.github.moinmarcell.backend.model;

import java.util.List;
public record FliprUserDTO(
        String fliprID,
        String username,
        String email,
        List<Flipr> fliprList
){
}
