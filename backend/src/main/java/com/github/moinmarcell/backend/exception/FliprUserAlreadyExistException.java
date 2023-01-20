package com.github.moinmarcell.backend.exception;

import org.springframework.dao.DuplicateKeyException;

public class FliprUserAlreadyExistException extends DuplicateKeyException {
    public FliprUserAlreadyExistException() {
        super("User already taken!");
    }
}
