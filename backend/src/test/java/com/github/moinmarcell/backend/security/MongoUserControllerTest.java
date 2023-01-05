package com.github.moinmarcell.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moinmarcell.backend.model.FliprUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MongoUserRepo mongoUserRepo;

    @Test
    @DirtiesContext
    void helloMe_expectAnonymousUser() throws Exception {
        mockMvc.perform(get("/api/users/me").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "flipr")
    void helloMe_myUser() throws Exception {
        mockMvc.perform(get("/api/users/me").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("flipr"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "test")
    void login() throws Exception {
        mockMvc.perform(post("/api/users/login").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("test"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "test")
    void logout() throws Exception {
        mockMvc.perform(post("/api/users/logout").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }

    @Test
    @DirtiesContext
    void register() throws Exception {
        MvcResult response = mockMvc.perform(post("/api/users/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "test",
                                    "password": "123",
                                    "email": "hello@flipr.com"
                                }
                                """))
                .andExpect(status().isOk())
                .andReturn();

        String content = response.getResponse().getContentAsString();
        FliprUser result = objectMapper.readValue(content, FliprUser.class);
        FliprUser expected = new FliprUser(result.fliprID(), result.username(), result.password(), result.email(), result.fliprList());

        assertEquals(result, expected);
    }
}