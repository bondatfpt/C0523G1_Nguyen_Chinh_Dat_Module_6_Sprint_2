package com.example.controller;

import com.example.dto.CartDto;
import com.example.dto.ICartDetailDto;
import com.example.dto.ICartDto;
import com.example.service.ICartService;
import com.example.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/cart")
public class RestCartController {
    @Autowired
    private ICartService iCartService;

    @Autowired
    private IProductService iProductService;

    @PostMapping("/new")
    public ResponseEntity<String> create(@RequestBody CartDto cartDto) {
        if (cartDto.getUserId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed !!");
        }
        iCartService.createCart(cartDto.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Success Created");
    }

    @PostMapping("/detail/new")
    public ResponseEntity<String> createCartDetail(@RequestBody CartDto cartDto) {
        if (cartDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed !!");
        }
        iCartService.createCartDetail(cartDto.getQuantity(),cartDto.getCartId(),cartDto.getProductDetailId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Success Created");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ICartDto> getCartByUserId(@PathVariable Integer userId) {
        ICartDto iCartDto = iCartService.getCartByUserId(userId);
        if (iCartDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iCartDto, HttpStatus.OK);
        }
    }
    @GetMapping("cart-detail/{accountId}/{cartId}")
    public ResponseEntity<List<ICartDetailDto>> getCartDetail(@PathVariable Integer accountId,@PathVariable Integer cartId) {
        List<ICartDetailDto> iCartDetailDtoList = iProductService.getAllCartDetailByCartIdAndAccountId(accountId, cartId);
        if ( iCartDetailDtoList== null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iCartDetailDtoList, HttpStatus.OK);
        }
    }
}
