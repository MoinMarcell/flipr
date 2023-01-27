package com.github.moinmarcell.backend.controller;

import com.github.moinmarcell.backend.model.Flipr;
import com.github.moinmarcell.backend.model.FliprDTO;
import com.github.moinmarcell.backend.model.FliprUserResponse;
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
    public List<Flipr> allFliprs(){
        return fliprService.getAllFliprs();
    }

    @GetMapping("/flipr")
    public Flipr getFliprByIdOrAuthor(@RequestParam(required = false) String id, @RequestParam(required = false) String author){
        if(author == null){
            return fliprService.getFliprById(id);
        }
        return fliprService.getFliprByAuthor(author);
    }

    @PostMapping
    public Flipr saveFlipr(@RequestBody FliprDTO flipr){
        return fliprService.saveFlipr(flipr);
    }

    @DeleteMapping("/{id}")
    public void deleteFliprById(@PathVariable String id){
        fliprService.deleteFliprById(id);
    }

    @PutMapping("/add-flipr-to-favorites/{username}/{fliprId}")
    public FliprUserResponse addFliprToFavorites(@PathVariable String username, @PathVariable String fliprId){
        return fliprService.addFliprToFavorites(fliprId, username);
    }

    @GetMapping("/check-is-liked-flipr/{username}/{fliprId}")
    public boolean isLikedFlipr(@PathVariable String username, @PathVariable String fliprId){
        return fliprService.isLikedFlipr(fliprId, username);
    }

}
