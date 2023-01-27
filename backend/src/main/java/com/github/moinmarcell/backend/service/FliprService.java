package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.exception.FliprAlreadyAddedToFavoritesException;
import com.github.moinmarcell.backend.exception.FliprNotFoundException;
import com.github.moinmarcell.backend.exception.FliprUserNotFroundException;
import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserResponse;
import com.github.moinmarcell.backend.repo.FliprRepository;
import com.github.moinmarcell.backend.repo.FliprUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FliprService {

    private final FliprRepository fliprRepository;
    private final IdService idService;
    private final LocalDateService localDateService;
    private final FliprUserRepo fliprUserRepo;

    public List<Flipr> getAllFliprs() {
        return fliprRepository
                .findAll();
    }

    public Flipr getFliprById(String id) {
        return fliprRepository
                .findById(id)
                .orElseThrow(FliprNotFoundException::new);
    }

    public Flipr getFliprByAuthor(String author) {
        return fliprRepository
                .findFliprByAuthor(author)
                .orElseThrow(FliprNotFoundException::new);
    }

    public Flipr saveFlipr(FliprDTO flipr) {
        Flipr fliprToSave = new Flipr(
                idService.generateId(),
                flipr.content(),
                flipr.author(),
                localDateService.getDate(),
                new ArrayList<>(),
                0L
        );
        fliprRepository.save(fliprToSave);

        FliprUser fliprUser = fliprUserRepo
                .findByUsername(fliprToSave.author())
                .orElseThrow(FliprUserNotFroundException::new);
        fliprUser.fliprs().add(fliprToSave);
        fliprUserRepo.save(fliprUser);

        return fliprToSave;
    }

    public void deleteFliprById(String id) {
        if (fliprRepository.existsById(id)) {
            fliprRepository.deleteById(id);
        } else {
            throw new FliprNotFoundException();
        }
    }

    public FliprUserResponse addFliprToFavorites(String fliprId, String username) {
        Flipr likedFlipr = fliprRepository.findById(fliprId).orElseThrow(FliprNotFoundException::new);
        FliprUser userWhoLiked = fliprUserRepo.findByUsername(username).orElseThrow(FliprUserNotFroundException::new);

        if (userWhoLiked.likedFliprs().isEmpty()) {
            return getFliprUserResponse(likedFlipr, userWhoLiked);
        } else {
            boolean isAlreadyLikedFlipr = isAlreadyLikedFlipr(likedFlipr, userWhoLiked);
            if(isAlreadyLikedFlipr){
                throw new FliprAlreadyAddedToFavoritesException();
            } else {
                return getFliprUserResponse(likedFlipr, userWhoLiked);
            }
        }
    }

    private static boolean isAlreadyLikedFlipr(Flipr likedFlipr, FliprUser userWhoLiked) {
        boolean isAlreadyLikedFlipr = false;
        for(Flipr likedFliprByUser : userWhoLiked.likedFliprs()){
            if(likedFliprByUser.id().equals(likedFlipr.id())){
                isAlreadyLikedFlipr = true;
                break;
            }
        }
        return isAlreadyLikedFlipr;
    }

    private FliprUserResponse getFliprUserResponse(Flipr likedFlipr, FliprUser userWhoLiked) {
        userWhoLiked.likedFliprs().add(likedFlipr);
        Flipr fliprToSaveWithNewLikeCount = new Flipr(
                likedFlipr.id(),
                likedFlipr.content(),
                likedFlipr.author(),
                likedFlipr.dateTime(),
                likedFlipr.comments(),
                likedFlipr.likes()+1
        );
        fliprRepository.save(fliprToSaveWithNewLikeCount);
        fliprUserRepo.save(userWhoLiked);
        return new FliprUserResponse(
                userWhoLiked.id(),
                userWhoLiked.username(),
                userWhoLiked.fliprs(),
                userWhoLiked.likedFliprs()
        );
    }

    public boolean isLikedFlipr(String fliprId, String username){
        FliprUser fliprUser = fliprUserRepo.findByUsername(username).orElseThrow(FliprUserNotFroundException::new);
        for(Flipr flipr : fliprUser.likedFliprs()){
            if(flipr.id().equals(fliprId)){
                return true;
            }
        }
        throw new FliprAlreadyAddedToFavoritesException();
    }

}
