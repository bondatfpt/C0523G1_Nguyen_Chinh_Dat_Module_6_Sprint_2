package com.example.service;

import com.example.dto.ICartDetailDto;
import com.example.dto.ICartDto;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartService {
    void createCart(Integer userId);
    void createCartDetail ( Integer quantity,  Integer cartId, Integer productDetailId);
    ICartDto getCartByUserId (@Param("id") Integer id);


}
