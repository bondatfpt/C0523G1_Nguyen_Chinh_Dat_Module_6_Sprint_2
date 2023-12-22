package com.example.service;

import com.example.dto.IAmountDto;
import com.example.dto.ICartDetailDto;
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

    IAmountDto getSumAmountOfProduct(Integer id);

    Page<IProductDto> findAllProduct(Pageable pageable);

    Page<IProductDto> findProductByName(Pageable pageable, String name);

    Page<IProductDto> findProductByCategoryId(Pageable pageable, Integer id);

    Page<IProductDto> findProductByNameAndCategoryId(Pageable pageable, Integer id, String name);

    List<IProductDto> getProductByName(String name);

    IAmountDto getAmountOfProductOfColorOfSize(Integer productId, Integer colorId, Integer sizeId);

    IProductDto getIdProductDetail(Integer productId, Integer colorId, Integer sizeId);

    List<ICartDetailDto> getAllCartDetailByCartIdAndAccountId(Integer userId, Integer cartId);

    void updateQuantityAfterPay(Integer quantity,Integer userId, Integer invoiceId, Integer productDetailId);
}
