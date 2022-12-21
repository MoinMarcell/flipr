package com.github.moinmarcell.backend.service;

import java.util.UUID;

public class IdService {
    public String generateId(){
        return UUID.randomUUID().toString();
    }
}
