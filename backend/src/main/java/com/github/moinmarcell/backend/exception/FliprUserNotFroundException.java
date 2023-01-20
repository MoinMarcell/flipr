package com.github.moinmarcell.backend.exception;

public class FliprUserNotFroundException extends RuntimeException{
    public FliprUserNotFroundException() {
        super("User not found!");
    }
}
