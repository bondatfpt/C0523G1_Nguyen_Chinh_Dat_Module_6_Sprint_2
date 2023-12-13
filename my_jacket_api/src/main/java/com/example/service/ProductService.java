package com.example.service;

import com.example.model.Product;
import com.example.model.ProductDetail;
import com.example.repository.IProductDetailRepository;
import com.example.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService{
    @Autowired
    private IProductDetailRepository iProductDetailRepository;
    @Autowired
    private  IProductRepository iProductRepository;

    @Override
    public List<ProductDetail> findAll() {
        return iProductDetailRepository.findAll();
    }

    @Override
    public List<Product> getProductLatestOfKid() {
        return iProductRepository.getProductLatestOfKid();
    }
}
