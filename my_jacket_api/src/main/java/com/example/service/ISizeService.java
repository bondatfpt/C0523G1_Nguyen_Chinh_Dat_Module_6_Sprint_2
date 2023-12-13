package com.example.service;

import com.example.dto.ISizeDto;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ISizeService {
    List<ISizeDto> getSizeByColorIdOfProduct( Integer colorId, Integer productId);

}
