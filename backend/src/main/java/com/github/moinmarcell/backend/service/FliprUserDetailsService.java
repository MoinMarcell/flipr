package com.github.moinmarcell.backend.service;

import com.github.moinmarcell.backend.repo.FliprUserRepo;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FliprUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    private final FliprUserRepo fliprUserRepo;

    public FliprUserDetailsService(FliprUserRepo fliprUserRepo) {
        this.fliprUserRepo = fliprUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return fliprUserRepo.findByUsername(username)
                .map(foundUser -> new User(foundUser.username(), foundUser.password(), List.of()))
                .orElseThrow(() -> new UsernameNotFoundException(username + " not found!"));
    }
}
