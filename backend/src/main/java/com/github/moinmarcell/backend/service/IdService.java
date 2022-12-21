package com.github.moinmarcell.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
class IdService {
    String generateId(){
        return UUID.randomUUID().toString();
    }
}
