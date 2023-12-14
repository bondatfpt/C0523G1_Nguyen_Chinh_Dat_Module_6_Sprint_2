package com.example.service;

import com.example.dto.IAmountDto;
import com.example.dto.IProductDto;
import com.example.model.Product;
import com.example.model.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductService {
List<ProductDetail> findAll();

    List<ProductDetail> findProductDetailByProductId(Integer id);
    Product getProductById(Integer id);
    IAmountDto getSumAmountOfProduct ( Integer id);

    Page<IProductDto> findAllProduct(Pageable pageable);

}
