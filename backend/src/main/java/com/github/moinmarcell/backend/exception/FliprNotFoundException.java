package com.github.moinmarcell.backend.exception;

public class FliprNotFoundException extends RuntimeException{
    public FliprNotFoundException() {
        super("Flipr not found!");
    }
}
