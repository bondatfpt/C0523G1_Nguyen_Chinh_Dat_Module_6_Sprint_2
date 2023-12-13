package com.example.service;

import com.example.model.Product;
import com.example.model.ProductDetail;

import java.util.List;

public interface IProductService {
List<ProductDetail> findAll();

    List <Product> getProductLatestOfKid();

}
