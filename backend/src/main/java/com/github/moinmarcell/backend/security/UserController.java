package com.github.moinmarcell.backend.security;

import com.github.moinmarcell.backend.model.MongoUser;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    MongoUserService mongoUserService;

    public UserController(MongoUserService mongoUserService) {
        this.mongoUserService = mongoUserService;
    }

    @GetMapping("/me")
    public String helloMe(Principal principal){
        if(principal != null){
            return principal.getName();
        }
        return "anonymousUser";
    }

    @PostMapping("/login")
    public String login(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/logout")
    public String logout(HttpSession httpSession){
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "anonymousUser";
    }

    @PostMapping("/register")
    public MongoUser saveUser(@RequestBody MongoUser mongoUser){
        return mongoUserService.saveMongoUser(mongoUser);
    }
}
