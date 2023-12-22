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
    public ResponseEntity<List<ICartDetailDto>> getCartDetail(@PathVariable Integer accountId, @PathVariable Integer cartId) {
        List<ICartDetailDto> iCartDetailDtoList = iProductService.getAllCartDetailByCartIdAndAccountId(accountId, cartId);
        if (iCartDetailDtoList == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iCartDetailDtoList, HttpStatus.OK);
        }
    }

    @PostMapping("/cart-detail/new")
    public ResponseEntity<String> insertOrUpdateCartDetail(@RequestBody CartDto cartDto) {
        if (cartDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed !!");
        }
        iCartService.insertOrUpdateCartDetail(cartDto.getCartId(),cartDto.getProductDetailId(), cartDto.getQuantity(), cartDto.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Success Updated");
    }

    @PostMapping("/cart-detail/update-amount")
    public ResponseEntity<String> updateAmountCartDetail(@RequestBody CartDto cartDto) {
        if (cartDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed !!");
        }
        iCartService.updateAmountCartDetail(cartDto.getCartId(),cartDto.getProductDetailId(), cartDto.getQuantity(), cartDto.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Success Updated");
    }

    @DeleteMapping("/cart-detail/{userId}/{cartId}/{productId}/{productDetailId}")
    public ResponseEntity<String> delete(@PathVariable Integer userId,@PathVariable Integer cartId,
                                         @PathVariable Integer productId, @PathVariable Integer productDetailId) {
        iCartService.delete(userId, cartId, productId, productDetailId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Success deleted");
    }

    @DeleteMapping("/cart-detail/{userId}/{cartId}")
    public ResponseEntity<String> deleteCartDetailFlowInvoice(@PathVariable Integer userId,@PathVariable Integer cartId) {
        iCartService.deleteCartDetailFlowInvoice(userId, cartId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Success deleted");
    }
}
