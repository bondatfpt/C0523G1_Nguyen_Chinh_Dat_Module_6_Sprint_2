package com.example.service;

import com.example.dto.IImageDto;
import com.example.model.Image;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IImageService {
    List<Image> findAll();
    List<IImageDto> getProductLatestOfKid();
    List<IImageDto> getProductLatestOfWomen();
    List<IImageDto> getProductLatestOfMen();
    List<IImageDto> getColorOfProduct( Integer id);
    List<IImageDto> getImagesOfColor ( Integer colorId,Integer productId);

    Image getImageByProductId( Integer id);

}
