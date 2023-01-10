package com.github.moinmarcell.backend.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class Argon2ServiceTest {

    Argon2Service argon2Service = new Argon2Service();

    @Test
    void encode_WhenPasswordEncodedExpectNotNull() {
        String password =  "123";
        assertNotNull(argon2Service.encode(password));
    }
}