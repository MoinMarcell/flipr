package com.github.moinmarcell.backend.model;

import java.util.List;

public record FliprDTO(
        String content,
        FliprUserDTO author,
        List<Comment> comments,
        int likes
) {
}
