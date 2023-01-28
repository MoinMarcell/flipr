package com.github.moinmarcell.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.repo.FliprRepository;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import com.github.moinmarcell.backend.service.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;

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

    @Autowired
    IdService idService;

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
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1), Collections.emptyList(), 0L);
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
    void getFliprById_whenIdNotExist_thenExpectStatus404() throws Exception {
        mockMvc.perform(get(BASE_DIR + "/flipr?id=1").with(csrf()))
                .andExpect(status().isNotFound());
    }
    @Test
    @DirtiesContext
    void getFliprByAuthor_whenAuthorExist_thenReturnFlipr() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1), Collections.emptyList(), 0L);
        FliprUser author = new FliprUser("1", "author", "123", new ArrayList<>(), new ArrayList<>());
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
    void getFliprByAuthor_whenAuthorNotExist_thenExpectStatus404() throws Exception {
        mockMvc.perform(get(BASE_DIR + "/flipr?author=author").with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void saveFlipr_whenUserLoggedIn_thenExpectStatusOk() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1), Collections.emptyList(), 0L);
        FliprUser fliprUser = new FliprUser("1", "author", "123", new ArrayList<>(), new ArrayList<>());
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

    @Test
    @DirtiesContext
    void saveFlipr_whenUserNotLoggedIn_thenExpectStatus401() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1, 1, 1, 1, 1), Collections.emptyList(), 0L);
        FliprUser fliprUser = new FliprUser("1", "author", "123", new ArrayList<>(), new ArrayList<>());
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
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteFliprById_whenFliprExist_thenExpectStatusOk() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.now(), Collections.emptyList(), 0L);
        fliprRepository.save(flipr);
        System.out.println(flipr);
        mockMvc.perform(delete(BASE_DIR + "/1").with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void deleteFliprById_whenFliprNotExist_thenExpectStatusNotFound() throws Exception {
        mockMvc.perform(delete(BASE_DIR + "/1").with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void addFliprToFavorites_whenFliprIsNoFavorite_thenExpectStatusOkAndFliprUserResponse() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1,1,1,1,1), Collections.emptyList(), 0L);
        FliprUser fliprUser = new FliprUser("1", "author", "123", Collections.emptyList(), new ArrayList<>());
        fliprRepository.save(flipr);
        fliprUserRepo.save(fliprUser);

        mockMvc.perform(put(BASE_DIR + "/add-flipr-to-favorites/author/1").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "username": "author",
                            "fliprs": [],
                            "likedFliprs": [
                                {
                                    "id": "1",
                                    "content": "content",
                                    "author": "author",
                                    "dateTime": "0001-01-01T01:01:00",
                                    "comments": [],
                                    "likes": 0
                                }
                            ]
                        }
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void addFliprToFavorites_whenFliprIsFavorite_thenExpectStatusBadRequest() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1,1,1,1,1), Collections.emptyList(), 0L);
        FliprUser fliprUser = new FliprUser("1", "author", "123", Collections.emptyList(), new ArrayList<>());
        fliprUser.likedFliprs().add(flipr);
        fliprRepository.save(flipr);
        fliprUserRepo.save(fliprUser);

        mockMvc.perform(put(BASE_DIR + "/add-flipr-to-favorites/author/1").with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void isLikedFlipr_whenFliprIsAlreadyLiked_thenExpectStatusOkAndContentTrue() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1,1,1,1,1), Collections.emptyList(), 0L);
        FliprUser fliprUser = new FliprUser("1", "author", "123", Collections.emptyList(), new ArrayList<>());
        fliprUser.likedFliprs().add(flipr);
        fliprRepository.save(flipr);
        fliprUserRepo.save(fliprUser);

        mockMvc.perform(get(BASE_DIR + "/check-is-liked-flipr/author/1").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void isLikedFlipr_whenFliprIsAlreadyLiked_thenExpectStatusBadRequest() throws Exception {
        Flipr flipr = new Flipr("1", "content", "author", LocalDateTime.of(1,1,1,1,1), Collections.emptyList(), 0L);
        FliprUser fliprUser = new FliprUser("1", "author", "123", Collections.emptyList(), Collections.emptyList());
        fliprRepository.save(flipr);
        fliprUserRepo.save(fliprUser);

        mockMvc.perform(get(BASE_DIR + "/check-is-liked-flipr/author/1").with(csrf()))
                .andExpect(status().isBadRequest());
    }
}