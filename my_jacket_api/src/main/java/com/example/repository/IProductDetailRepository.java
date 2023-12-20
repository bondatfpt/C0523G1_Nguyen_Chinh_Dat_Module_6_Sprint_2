package com.example.repository;

import com.example.dto.IAmountDto;
import com.example.dto.ICartDetailDto;
import com.example.dto.IProductDto;
import com.example.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface IProductDetailRepository extends JpaRepository<ProductDetail, Integer> {
    @Query(value = "SELECT product_detail.*FROM my_jacket.product_detail\n" +
            "            join product on product.id = product_detail.product_id \n" +
            "            where product.id = :id and product.is_deleted = 0 and product_detail.is_deleted = 0", nativeQuery = true)
    List<ProductDetail> findProductDetailByProductId(@Param("id") Integer id);

    @Query(value = "SELECT product_detail.product_id, sum(product_detail.quantity) as amount FROM my_jacket.product_detail\n" +
            "            join product on product.id = product_detail.product_id and product.id = :id and product_detail.is_deleted = 0\n" +
            "            ", nativeQuery = true)
    IAmountDto getSumAmountOfProduct(@Param("id") Integer id);

    @Query(value = "SELECT my_jacket.product_detail.quantity, product.id  FROM my_jacket.product_detail\n" +
            "join product on product.id = product_detail.product_id and product.is_deleted = 0 and product.id = :productId\n" +
            "where color_id = :colorId and size_id = :sizeId and product_detail.is_deleted = 0", nativeQuery = true)
    IAmountDto getAmountOfProductOfColorOfSize(@Param("productId") Integer productId, @Param("colorId") Integer colorId, @Param("sizeId") Integer sizeId);

    @Query(value = "SELECT product_detail.id FROM my_jacket.product_detail\n" +
            "join product on product.id = product_detail.product_id and product.is_deleted = 0 and product.id = :productId\n" +
            "where color_id = :colorId and size_id = :sizeId and product_detail.is_deleted = 0", nativeQuery = true)
    IProductDto getIdProductDetail(@Param("productId") Integer productId, @Param("colorId") Integer colorId, @Param("sizeId") Integer sizeId);

    @Query(value = "SELECT\n" +
            "                product.name AS product_name,\n" +
            "                color.id as color_id,\n" +
            "                size.id as size_id,\n" +
            "                size.name AS size_name,\n" +
            "                MAX(image.path) AS path,\n" +
            "                product_detail.id AS productDetailId,\n" +
            "                color.name AS color_name,\n" +
            "                product.price,\n" +
            "                product_detail.product_detail_code AS productDetailCode,\n" +
            "                product.id AS product_id,\n" +
            "                cart_detail.quantity\n" +
            "            FROM\n" +
            "                my_jacket.cart_detail\n" +
            "            JOIN cart ON cart.id = cart_detail.cart_id AND cart.id = :cartId\n" +
            "            JOIN account ON account.id = cart.user_id AND account.is_deleted = 0 AND account.id = :accountId\n" +
            "            JOIN product_detail ON product_detail.id = cart_detail.product_detail_id AND product_detail.is_deleted = 0\n" +
            "            JOIN product ON product.id = product_detail.product_id AND product.is_deleted = 0\n" +
            "            JOIN color ON color.id = product_detail.color_id \n" +
            "            JOIN size ON size.id = product_detail.size_id\n" +
            "            JOIN image ON image.product_detail_id = product_detail.id AND image.is_deleted = 0\n" +
            "            GROUP BY\n" +
            "                product_name,\n" +
            "                size_name,\n" +
            "                productDetailId,\n" +
            "                color_name,\n" +
            "\t\t    product.price,\n" +
            "                product_detail.product_detail_code,\n" +
            "                product_id,\n" +
            "                cart_detail.quantity", nativeQuery = true)
    List<ICartDetailDto> getAllCartDetailByCartIdAndAccountId(@Param("accountId") Integer accountId, @Param("cartId") Integer cartId);


}

