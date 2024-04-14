package com.github.moinmarcell.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
        assertNotNull(SpringApplication.run(BackendApplication.class));
    }

}
