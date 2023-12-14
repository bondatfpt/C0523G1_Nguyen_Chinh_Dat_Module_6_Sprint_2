package com.example.service;

import com.example.dto.IAmountDto;
import com.example.dto.IProductDto;
import com.example.model.Product;
import com.example.model.ProductDetail;
import com.example.repository.IProductDetailRepository;
import com.example.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Product getProductById(Integer id) {
        return iProductRepository.getProductById(id);
    }

    @Override
    public List<ProductDetail> findProductDetailByProductId(Integer id) {
        return iProductDetailRepository.findProductDetailByProductId(id);
    }

    @Override
    public IAmountDto getSumAmountOfProduct(Integer id) {
        return iProductDetailRepository.getSumAmountOfProduct(id);
    }

    @Override
    public Page<IProductDto> findAllProduct(Pageable pageable) {
        return iProductRepository.findAllProduct(pageable);
    }
}
