package com.example.service;

import com.example.dto.IImageDto;
import com.example.model.Image;
import com.example.repository.IImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService implements IImageService{
    @Autowired
    private IImageRepository iImageRepository;
    @Override
    public List<Image> findAll() {
        return iImageRepository.findAll();
    }

    @Override
    public List<IImageDto> getProductLatestOfKid() {
        return iImageRepository.getProductLatestOfKid();
    }

    @Override
    public List<IImageDto> getProductLatestOfWomen() {
        return iImageRepository.getProductLatestOfWomen();
    }

    @Override
    public List<IImageDto> getProductLatestOfMen() {
        return iImageRepository.getProductLatestOfMen();
    }
}
