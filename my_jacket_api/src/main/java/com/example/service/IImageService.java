package com.example.service;

import com.example.dto.IImageDto;
import com.example.model.Image;

import java.util.List;

public interface IImageService {
    List<Image> findAll();
    List<IImageDto> getProductLatestOfKid();
    List<IImageDto> getProductLatestOfWomen();
    List<IImageDto> getProductLatestOfMen();

}
