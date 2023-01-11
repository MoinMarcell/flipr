package com.github.moinmarcell.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.repo.FliprRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class FliprControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    FliprRepository fliprRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void getAllFliprs() throws Exception {
        mockMvc.perform(get("/api/fliprs").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getFliprById() throws Exception {
        Flipr flipr = new Flipr("1", "Content", "author");
        fliprRepository.save(flipr);

        mockMvc.perform(get("/api/fliprs/" + flipr.id()).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "1",
                        "content": "Content",
                        "author": "author"
                        }
                        """));
    }

    @Test
    void saveFlipr() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/fliprs")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "content": "content",
                            "author": "author"
                        }
                        """)
                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();
        String content = result.getResponse().getContentAsString();
        Flipr flipr = objectMapper.readValue(content, Flipr.class);
        assertNotNull(flipr.id());
    }

    @Test
    @DirtiesContext
    void deleteFliprById() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author");
        mockMvc.perform(delete("/api/fliprs/" + flipr.id()).with(csrf()))
                .andExpect(status().isOk());
    }
}