package com.github.moinmarcell.backend.exception;

public class FliprAlreadyAddedToFavoritesException extends RuntimeException{
    public FliprAlreadyAddedToFavoritesException() {
        super("The Flipr is already in your Favorites!");
    }
}
