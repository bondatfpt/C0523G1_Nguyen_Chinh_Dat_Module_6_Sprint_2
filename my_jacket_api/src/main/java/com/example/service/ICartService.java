package com.example.service;

import com.example.dto.ICartDetailDto;
import com.example.dto.ICartDto;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartService {
    void createCart(Integer userId);

    void createCartDetail(Integer quantity, Integer cartId, Integer productDetailId);

    ICartDto getCartByUserId(Integer id);

    void insertOrUpdateCartDetail(
            Integer cartId,
            Integer productDetailId,
            Integer quantity,
            Integer accountId
    );

    void updateAmountCartDetail(Integer cartId,
                                Integer productDetailId,
                                Integer quantity,
                                Integer accountId);

    void delete (Integer accountId, Integer cartId,
                 Integer productId, Integer productDetailId);

}
