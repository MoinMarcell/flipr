package com.github.moinmarcell.backend.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LocalDateServiceTest {

    LocalDateService localDateService = new LocalDateService();

    @Test
    void getDate() {
        assertNotNull(localDateService.getDate());
    }
}