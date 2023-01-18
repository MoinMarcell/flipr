package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.model.FliprUserResponse;
import com.github.moinmarcell.backend.service.FliprUserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class FliprUserController {

    FliprUserService fliprUserService;

    public FliprUserController(FliprUserService fliprUserService) {
        this.fliprUserService = fliprUserService;
    }

    @GetMapping("/me")
    public String helloMe(Principal principal) {
        if (principal != null) {
            return principal.getName();
        }
        return "anonymousUser";
    }

    @PostMapping("/login")
    public Object login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/logout")
    public String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "anonymousUser";
    }

    @PostMapping("/register")
    public FliprUserResponse saveFliprUser(@RequestBody FliprUserDTO fliprUserDTO) {
        return fliprUserService.saveFliprUser(fliprUserDTO);
    }

    @GetMapping("/{username}")
    public FliprUserResponse getFliprUserByUsername(@PathVariable String username) {
        return fliprUserService.getFliprUserByUsername(username);
    }

}
