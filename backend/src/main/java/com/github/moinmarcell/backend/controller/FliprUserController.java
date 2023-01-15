package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.model.FliprUserResponse;
import com.github.moinmarcell.backend.service.FliprUserService;
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

    @GetMapping
    public List<FliprUserResponse> allFliprUsers(){
        return fliprUserService.allFliprUsers();
    }

    @GetMapping("/{username}")
    public FliprUserResponse getFliprUser(@PathVariable String username){
        return fliprUserService.getFliprUser(username);
    }

    @PostMapping
    public FliprUserResponse saveFliprUser(@RequestBody FliprUserDTO fliprUserDTO){
        return fliprUserService.saveFliprUser(fliprUserDTO);
    }

    @PutMapping("/{username}")
    public FliprUserResponse updateFliprUser(@PathVariable String username, @RequestBody FliprUserDTO fliprUserDTO){
        return fliprUserService.updateFliprUser(username, fliprUserDTO);
    }

    @DeleteMapping("/{username}")
    public String deleteFliprUser(@PathVariable String username){
        return fliprUserService.deleteFliprUser(username);
    }

}
