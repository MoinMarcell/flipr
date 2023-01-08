package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.model.FliprUserRegistrationDTO;
import com.github.moinmarcell.backend.service.FliprUserService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class FliprUserController {

    FliprUserService fliprUserService;

    public FliprUserController(FliprUserService fliprUserService) {
        this.fliprUserService = fliprUserService;
    }

    @GetMapping("/me")
    public String helloMe(Principal principal){
        if(principal != null){
            return principal.getName();
        }
        return "anonymousUser";
    }

    @PostMapping("/login")
    public Object login(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/logout")
    public String logout(HttpSession httpSession){
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "anonymousUser";
    }

    @PostMapping("/register")
    public FliprUserDTO saveUser(@RequestBody FliprUserRegistrationDTO fliprUser){
        return fliprUserService.saveFliprUser(fliprUser);
    }

    @GetMapping
    public List<FliprUserDTO> getAllFliprUsers(){
        return fliprUserService.getAllFliprUsers();
    }

    @GetMapping("/{username}")
    public FliprUserDTO getFliprUserById(@PathVariable String username) throws ChangeSetPersister.NotFoundException {
        return fliprUserService.getFliprUserByUsername(username);
    }
}
