package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.FliprUser;
import com.github.moinmarcell.backend.model.FliprUserDTO;
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
    public FliprUser saveFliprUser(@RequestBody FliprUserDTO fliprUserDTO){
        return fliprUserService.saveFliprUser(fliprUserDTO);
    }

    @GetMapping
    public List<FliprUser> getAllFliprUsers(){
        return fliprUserService.getAllFliprUsers();
    }

    @GetMapping("/user")
    public FliprUser getFliprUser(@RequestParam(required = false) String username, @RequestParam(required = false) String id) throws ChangeSetPersister.NotFoundException {
        if(!username.equals("")){
            return fliprUserService.getFliprUserByUsername(username);
        }
        return fliprUserService.getFliprUserById(id);
    }

    @PutMapping("/{id}")
    public FliprUser updateFliprUser(@PathVariable String id, @RequestBody FliprUserDTO fliprUserDTO){
        return fliprUserService.updateFliprUser(id, fliprUserDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteFliprUserById(@PathVariable String id) throws ChangeSetPersister.NotFoundException {
        return fliprUserService.deleteFliprUserById(id);
    }

}
