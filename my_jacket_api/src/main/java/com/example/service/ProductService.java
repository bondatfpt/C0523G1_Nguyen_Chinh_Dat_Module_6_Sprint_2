package com.example.service;

import com.example.dto.IAmountDto;
import com.example.dto.ICartDetailDto;
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
public class ProductService implements IProductService {
    @Autowired
    private IProductDetailRepository iProductDetailRepository;
    @Autowired
    private IProductRepository iProductRepository;

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

    @Override
    public Page<IProductDto> findProductByName(Pageable pageable, String name) {
        return iProductRepository.findProductByName(pageable, name);
    }

    @Override
    public Page<IProductDto> findProductByCategoryId(Pageable pageable, Integer id) {
        return iProductRepository.findProductByCategoryId(pageable, id);
    }

    @Override
    public Page<IProductDto> findProductByNameAndCategoryId(Pageable pageable, Integer id, String name) {
        return iProductRepository.findProductByNameAndCategoryId(pageable, id, name);
    }

    @Override
    public List<IProductDto> getProductByName(String name) {
        return iProductRepository.getProductByName(name);
    }

    @Override
    public IAmountDto getAmountOfProductOfColorOfSize(Integer productId, Integer colorId, Integer sizeId) {
        return iProductDetailRepository.getAmountOfProductOfColorOfSize(productId, colorId, sizeId);
    }

    @Override
    public IProductDto getIdProductDetail(Integer productId, Integer colorId, Integer sizeId) {
        return iProductDetailRepository.getIdProductDetail(productId, colorId, sizeId);
    }

    @Override
    public List<ICartDetailDto> getAllCartDetailByCartIdAndAccountId(Integer userId, Integer cartId) {
        return iProductDetailRepository.getAllCartDetailByCartIdAndAccountId(userId, cartId);
    }

    @Override
    public void updateQuantityAfterPay(Integer quantity,Integer userId, Integer invoiceId, Integer productDetailId) {
        iProductDetailRepository.updateQuantityAfterPay(quantity,userId, invoiceId, productDetailId);
    }
}
