package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.security.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class FliprUserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    MongoUserRepo mongoUserRepo;

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllFliprUsers() throws Exception {
        mockMvc.perform(get("/api/fliprusers").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser("test")
    void getFliprUserByUsername() throws Exception {
        FliprUser fliprUser = new FliprUser("1", "test", "123", "hello@flipr.com", Collections.emptyList());
        mongoUserRepo.save(fliprUser);
        mockMvc.perform(get("/api/fliprusers/user?username=" + fliprUser.username()).with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser("test")
    void getFliprUserById() throws Exception {
        FliprUser fliprUser = new FliprUser("1", "test", "123", "hello@flipr.com", Collections.emptyList());
        mongoUserRepo.save(fliprUser);
        mockMvc.perform(get("/api/fliprusers/user?fliprID=" + fliprUser.fliprID()).with(csrf()))
                .andExpect(status().isOk());
    }
}