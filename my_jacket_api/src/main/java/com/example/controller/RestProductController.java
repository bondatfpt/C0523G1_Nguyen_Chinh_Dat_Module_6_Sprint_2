package com.example.controller;

import com.example.dto.*;
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
    public ResponseEntity<Page<IProductDto>> findAll(@RequestParam(name = "page", defaultValue = "0", required = false) Integer page,
                                                     @RequestParam(name = "name", required = false) String name,
                                                     @RequestParam(name = "categoryId", required = false) Integer categoryId) {
        Pageable pageable = PageRequest.of(page, 8);
        if (categoryId == null && name != null) {
            Page<IProductDto> productDtos = iProductService.findProductByName(pageable, name);
            return new ResponseEntity<>(productDtos, HttpStatus.OK);
        }else if (categoryId != null && name == null){
            Page<IProductDto> productDtos = iProductService.findProductByCategoryId(pageable, categoryId);
            return new ResponseEntity<>(productDtos, HttpStatus.OK);
        } else if (categoryId != null && name != null) {
            Page<IProductDto> productDtos = iProductService.findProductByNameAndCategoryId(pageable,categoryId,name);
            return new ResponseEntity<>(productDtos, HttpStatus.OK);
        }
        Page<IProductDto> productDtos = iProductService.findAllProduct(pageable);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<IProductDto>> getAllProductByName(@PathVariable String name) {
        List<IProductDto> productDtos = iProductService.getProductByName(name);
        if (productDtos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(productDtos, HttpStatus.OK);
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
    @GetMapping("product-detail/amount/{productId}/{colorId}/{sizeId}")
    public ResponseEntity<IAmountDto> getSumAmountOfProductOfColorOfSize(@PathVariable Integer productId,@PathVariable Integer colorId,@PathVariable Integer sizeId) {
        IAmountDto iAmountDto = iProductService.getAmountOfProductOfColorOfSize(productId, colorId, sizeId);
        if (iAmountDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iAmountDto, HttpStatus.OK);
        }
    }

    @GetMapping("product-detail/{productId}/{colorId}/{sizeId}")
    public ResponseEntity<IProductDto> getIdOfProductOfColorOfSize(@PathVariable Integer productId,@PathVariable Integer colorId,@PathVariable Integer sizeId) {
        IProductDto iProductDto = iProductService.getIdProductDetail(productId, colorId, sizeId);
        if (iProductDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iProductDto, HttpStatus.OK);
        }
    }
    @PatchMapping ("/product-detail/update-amount")
    public ResponseEntity<String> updateAmountAfterPay(@RequestBody List<ProductDetailDto> productDetailDtos) {
        if (productDetailDtos == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed !!");
        }
        for (ProductDetailDto invoiceDetailItems : productDetailDtos) {
            iProductService.updateQuantityAfterPay(invoiceDetailItems.getQuantity(),invoiceDetailItems.getUserId(),
                    invoiceDetailItems.getInvoiceId(), invoiceDetailItems.getProductDetailId());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Success Updated");
    }


}
