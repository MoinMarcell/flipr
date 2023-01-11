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
import org.springframework.test.web.servlet.MvcResult;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class FliprUserControllerTest {

    @Autowired
    FliprUserRepo fliprUserRepo;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    @WithMockUser("marcell")
    void helloMe_whenLoggedIn_ExpectUsername() throws Exception {
        mockMvc.perform(get("/api/users/me")
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("marcell"));
    }

    @Test
    @DirtiesContext
    void helloMe_whenLoggedOu_ExpectAnonymousUser() throws Exception {
        mockMvc.perform(get("/api/users/me")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }
    @Test
    @DirtiesContext
    @WithMockUser
    void login() throws Exception {
        mockMvc.perform(post("/api/users/login").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "user",
                                    "password": "123"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().string("user"));
    }

    @Test
    @DirtiesContext
    @WithMockUser("marcell")
    void logout() throws Exception {
        mockMvc.perform(post("/api/users/logout").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }

    @Test
    @DirtiesContext
    void saveFliprUser() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/users/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "username": "user",
                            "password": "123"
                        }
                        """))
                .andExpect(status().isOk())
                .andReturn();
        String content = result.getResponse().getContentAsString();
        FliprUser user = objectMapper.readValue(content, FliprUser.class);
        assertNotNull(user.id());
    }

    @Test
    @DirtiesContext
    void updateFliprUser() throws Exception {
        mockMvc.perform(
                put("/api/users/update")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "id": "1",
                                    "username": "user",
                                    "password": "123",
                                    "fliprs": []
                                }
                                """)
        )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "username": "user",
                            "password": "***",
                            "fliprs": []
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void deleteFliprUserById() throws Exception {
        FliprUser fliprUserToDelete = new FliprUser(
                "1",
                "user",
                "123",
                Collections.emptyList()
        );

        mockMvc.perform(delete("/api/users/" + fliprUserToDelete.id())
                .with(csrf()))
                .andExpect(status().isOk());
    }
}