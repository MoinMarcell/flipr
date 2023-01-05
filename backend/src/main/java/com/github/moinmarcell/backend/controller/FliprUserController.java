package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.FliprUserDTO;
import com.github.moinmarcell.backend.service.FliprUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fliprusers")
public class FliprUserController {

    private final FliprUserService fliprUserService;

    public FliprUserController(FliprUserService fliprUserService) {
        this.fliprUserService = fliprUserService;
    }

    @GetMapping
    public List<FliprUserDTO> getAllFliprUsers(){
        return fliprUserService.getAllFliprUsers();
    }

    @GetMapping("/user")
    public Optional<FliprUserDTO> getFliprUserByUsername(@RequestParam(required = false) String username, @RequestParam(required = false) String fliprID){
        if(username != null){
            return fliprUserService.getFliprUserByUsername(username);
        }
        return fliprUserService.getFliprUserByFliprID(fliprID);
    }
}
