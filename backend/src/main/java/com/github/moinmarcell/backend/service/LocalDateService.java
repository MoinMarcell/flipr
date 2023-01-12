package com.github.moinmarcell.backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LocalDateService {
    public LocalDateTime getDate(){
        return LocalDateTime.now();
    }
}
