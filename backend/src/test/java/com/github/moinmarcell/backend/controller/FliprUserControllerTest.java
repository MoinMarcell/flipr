package com.github.moinmarcell.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class FliprUserControllerTest {

    private final String BASE_URL = "/api/users";

    @Autowired
    FliprUserRepo fliprUserRepo;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    @WithMockUser("Flipr")
    void helloMe_whenLoggedIn_thenReturnUsername() throws Exception {
        mockMvc.perform(get(BASE_URL + "/me").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("Flipr"));
    }

    @Test
    @DirtiesContext
    void helloMe_whenNotLoggedIn_thenReturnAnonymousUser() throws Exception {
        mockMvc.perform(get(BASE_URL + "/me").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }

    @Test
    @DirtiesContext
    @WithMockUser("Flipr")
    void login_whenLogin_thenReturnUsername() throws Exception {
        mockMvc.perform(post(BASE_URL + "/login").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("Flipr"));
    }

    @Test
    @DirtiesContext
    @WithMockUser("Flipr")
    void logout_whenLogout_thenReturnAnonymousUser() throws Exception {
        mockMvc.perform(post(BASE_URL + "/logout").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }

    @Test
    @DirtiesContext
    void saveFliprUser() throws Exception {
        mockMvc.perform(post(BASE_URL + "/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "username",
                                    "password": "password"
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void getFliprUserByUsername() throws Exception {
        FliprUser fliprUser = new FliprUser("1", "username", "123", Collections.emptyList());
        fliprUserRepo.save(fliprUser);
        mockMvc.perform(get(BASE_URL + "/username").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "username": "username",
                            "fliprs": []
                        }
                        """));
    }
}