package com.github.moinmarcell.backend.security;

import com.github.moinmarcell.backend.model.FliprUser;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MongoUserDetailsService implements UserDetailsService {
    private final MongoUserRepo mongoUserRepo;

    public MongoUserDetailsService(MongoUserRepo mongoUserRepo) {
        this.mongoUserRepo = mongoUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        FliprUser fliprUser = mongoUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + " not found!"));
        return new User(fliprUser.username(), fliprUser.password(), List.of());
    }
}
