package com.github.moinmarcell.backend.model;

import java.util.List;

public record FliprUserDTO(
        String id,
        String username,
        String avatar,
        List<Flipr> fliprs,
        List<Flipr> favFliprs
) {
}
