package com.github.moinmarcell.backend.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class IdServiceTest {

    IdService idService = new IdService();

    @Test
    void when_id_is_generated_string_not_null() {
        String actual = idService.generateId();
        assertNotNull(actual);
    }
}