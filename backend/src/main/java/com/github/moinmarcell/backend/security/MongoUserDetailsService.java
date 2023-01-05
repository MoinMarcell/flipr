package com.github.moinmarcell.backend.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MongoUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    private final MongoUserRepo mongoUserRepo;

    public MongoUserDetailsService(MongoUserRepo mongoUserRepo) {
        this.mongoUserRepo = mongoUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return mongoUserRepo.findByUsername(username)
                .map(foundUser -> new User(foundUser.username(), foundUser.password(), List.of()))
                .orElseThrow(() -> new UsernameNotFoundException(username + " not found!"));
    }
}
