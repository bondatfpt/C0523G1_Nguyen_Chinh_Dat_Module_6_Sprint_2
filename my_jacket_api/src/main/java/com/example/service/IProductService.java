package com.example.service;

import com.example.model.Product;
import com.example.model.ProductDetail;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductService {
List<ProductDetail> findAll();

    List<ProductDetail> findProductDetailByProductId(Integer id);
    Product getProductById(Integer id);

}
