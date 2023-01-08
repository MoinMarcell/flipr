package com.github.moinmarcell.backend.model;

import java.util.List;

public record FliprUserDTO(
        String id,
        String username,
        String avatar,
        List<String> fliprs, //Ids of fliprs
        List<String> favFliprs //Ids of fliprs
) {
}
