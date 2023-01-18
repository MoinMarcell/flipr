package com.github.moinmarcell.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.repo.FliprRepository;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;

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

    @Autowired
    FliprUserRepo fliprUserRepo;

    private final String BASE_DIR = "/api/fliprs";

    @Test
    @DirtiesContext
    void allFliprs_whenListIsEmpty_thenReturnEmptyList() throws Exception {
        mockMvc.perform(get(BASE_DIR).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getFliprById_whenIdExist_thenReturnFlipr() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1));
        fliprRepository.save(flipr);
        mockMvc.perform(get(BASE_DIR + "/flipr?id=" + flipr.id()).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                    "id": "1",
                                    "content": "content",
                                    "author": "author",
                                    "dateTime": "0001-01-01T01:01:00"
                                }
                                """));
    }

    @Test
    @DirtiesContext
    void getFliprByAuthor_whenAuthorExist_thenReturnFlipr() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1));
        FliprUser author = new FliprUser("1", "author", "123", new ArrayList<>());
        author.fliprs().add(flipr);
        fliprRepository.save(flipr);
        fliprUserRepo.save(author);
        mockMvc.perform(get(BASE_DIR + "/flipr?author=" + flipr.author()).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                    "id": "1",
                                    "content": "content",
                                    "author": "author",
                                    "dateTime": "0001-01-01T01:01:00"
                                }
                                """));
    }

    @Test
    @DirtiesContext
    void saveFlipr() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1));
        FliprUser fliprUser = new FliprUser("1", "author", "123", new ArrayList<>());
        fliprUser.fliprs().add(flipr);
        fliprUserRepo.save(fliprUser);

        mockMvc.perform(post(BASE_DIR)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "content": "content",
                                    "author": "author"
                                }
                                """))
                .andExpect(status().isOk());
    }
}