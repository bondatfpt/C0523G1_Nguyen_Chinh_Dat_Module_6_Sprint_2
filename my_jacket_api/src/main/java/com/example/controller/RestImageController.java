package com.example.controller;

import com.example.dto.IImageDto;
import com.example.model.ProductDetail;
import com.example.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/image")
public class RestImageController {
    @Autowired
    private IImageService iImageService;
    @GetMapping("/product/{id}")
    public ResponseEntity<List<IImageDto>> getColorOfProduct(@PathVariable Integer id) {
        List<IImageDto> iImageDtos = iImageService.getColorOfProduct(id);
        if (iImageDtos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iImageDtos, HttpStatus.OK);
        }
    }

    @GetMapping("/product/{colorId}/{productId}")
    public ResponseEntity<List<IImageDto>> getImageOfColor(@PathVariable Integer colorId, @PathVariable Integer productId) {
        List<IImageDto> iImageDtos = iImageService.getImagesOfColor(colorId, productId);
        if (iImageDtos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iImageDtos, HttpStatus.OK);
        }
    }
}
