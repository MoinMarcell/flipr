package com.github.moinmarcell.backend.model;


import java.util.List;

public record FliprUserResponse(
        String id,
        String username,
        List<Flipr> fliprs,
        List<Flipr> likedFliprs
) {
}
