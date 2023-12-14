package com.example.controller;

import com.example.dto.IAmountDto;
import com.example.dto.IImageDto;
import com.example.dto.IProductDto;
import com.example.model.Product;
import com.example.model.ProductDetail;
import com.example.service.IImageService;
import com.example.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<Page<IProductDto>> findAll( @RequestParam(name = "page", defaultValue = "0", required = false) Integer page) {
        Pageable pageable = PageRequest.of(page,6);
        Page<IProductDto> products = iProductService.findAllProduct(pageable);
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

    @GetMapping("product-detail/detail/{id}")
    public ResponseEntity<List<ProductDetail>> getProductDetailByProductId(@PathVariable Integer id) {
        List<ProductDetail> productDetails = iProductService.findProductDetailByProductId(id);
        if (productDetails.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(productDetails, HttpStatus.OK);
        }
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<Product> getProductBytId(@PathVariable Integer id) {
        Product product = iProductService.getProductById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
    }
    @GetMapping("product-detail/amount/{id}")
    public ResponseEntity<IAmountDto> getSumAmountOfProduct(@PathVariable Integer id) {
        IAmountDto iAmountDto = iProductService.getSumAmountOfProduct(id);
        if (iAmountDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iAmountDto, HttpStatus.OK);
        }
    }

}
