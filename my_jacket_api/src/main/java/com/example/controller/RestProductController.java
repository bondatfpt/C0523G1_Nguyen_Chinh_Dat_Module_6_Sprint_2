package com.example.controller;

import com.example.dto.IImageDto;
import com.example.model.Product;
import com.example.model.ProductDetail;
import com.example.service.IImageService;
import com.example.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/product")
public class RestProductController {
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IImageService iImageService;

    @GetMapping("")
    public ResponseEntity<List<ProductDetail>> findAll() {
        List<ProductDetail> products = iProductService.findAll();
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @GetMapping("/latest-kid")
    public ResponseEntity<List<IImageDto>> getProductLatestOfKid() {
        List<IImageDto> images = iImageService.getProductLatestOfKid();
        if (images.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(images, HttpStatus.OK);
        }
    }

    @GetMapping("/latest-women")
    public ResponseEntity<List<IImageDto>> getProductLatestOfWomen() {
        List<IImageDto> images = iImageService.getProductLatestOfWomen();
        if (images.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(images, HttpStatus.OK);
        }
    }

    @GetMapping("/latest-men")
    public ResponseEntity<List<IImageDto>> getProductLatestOfMen() {
        List<IImageDto> images = iImageService.getProductLatestOfMen();
        if (images.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(images, HttpStatus.OK);
        }
    }
}
