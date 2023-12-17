package com.example.service;

import com.example.dto.ICartDetailDto;
import com.example.dto.ICartDto;
import com.example.repository.ICartDetailRepository;
import com.example.repository.ICartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ICartService {
    @Autowired
    private ICartRepository iCartRepository;
    @Autowired
    private ICartDetailRepository iCartDetailRepository;

    @Override
    public void createCart(Integer userId) {
        if (userId != null) {
            iCartRepository.createCart(userId);
        }else {
            iCartRepository.createCart(null);
        }
    }

    @Override
    public void createCartDetail(Integer quantity, Integer cartId, Integer productDetailId) {
        iCartDetailRepository.createCartDetail(quantity, cartId, productDetailId);
    }

    @Override
    public ICartDto getCartByUserId(Integer id) {
        return iCartRepository.getCartByUserId(id);
    }


}
