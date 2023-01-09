package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.service.FliprService;
import org.springframework.data.crossstore.ChangeSetPersister;
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

    @GetMapping("/{id}")
    public Flipr getFliprById(@PathVariable String id) throws ChangeSetPersister.NotFoundException {
        return fliprService.getFliprById(id);
    }

    @PostMapping
    public Flipr saveFlipr(@RequestBody FliprDTO fliprDTO){
        return fliprService.saveFlipr(fliprDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteFliprById(@PathVariable String id) throws ChangeSetPersister.NotFoundException {
        return fliprService.deleteFliprById(id);
    }

}
