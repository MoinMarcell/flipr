package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.service.FliprService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fliprs")
public class FliprController {

    FliprService fliprService;

    public FliprController(FliprService fliprService) {
        this.fliprService = fliprService;
    }

    @GetMapping
    public List<Flipr> getAllFliprs(){
        return fliprService.getAllFliprs();
    }

    @PostMapping
    public Flipr saveFlipr(@RequestBody Flipr flipr){
        return fliprService.saveFlipr(flipr);
    }
}
