package com.example.controller;

import com.example.dto.IImageDto;
import com.example.dto.ISizeDto;
import com.example.service.ISizeService;
import com.example.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/size")
public class RestSizeController {
    @Autowired
    private ISizeService iSizeService;

    @GetMapping("/color/product/{colorId}/{productId}")
    public ResponseEntity<List<ISizeDto>> getSizeByColorIdOfProduct(@PathVariable Integer colorId,@PathVariable Integer productId) {
        List<ISizeDto> sizeDtos  = iSizeService.getSizeByColorIdOfProduct(colorId, productId);
        if (sizeDtos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(sizeDtos, HttpStatus.OK);
        }
    }
}
