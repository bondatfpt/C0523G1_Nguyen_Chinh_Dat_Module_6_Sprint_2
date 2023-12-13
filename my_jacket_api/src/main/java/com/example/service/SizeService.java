package com.example.service;

import com.example.dto.ISizeDto;
import com.example.repository.ISizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService implements ISizeService{
    @Autowired
    private ISizeRepository iSizeRepository;

    @Override
    public List<ISizeDto> getSizeByColorIdOfProduct(Integer colorId, Integer productId) {
        return iSizeRepository.getSizeByColorIdOfProduct(colorId,productId);
    }
}
