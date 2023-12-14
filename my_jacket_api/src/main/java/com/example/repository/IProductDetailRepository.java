package com.example.repository;

import com.example.dto.IAmountDto;
import com.example.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductDetailRepository extends JpaRepository<ProductDetail,Integer> {
    @Query(value = "SELECT product_detail.*FROM my_jacket.product_detail\n" +
            "join product on product.id = product_detail.product_id \n" +
            "where product.id = :id and product.is_deleted = 0", nativeQuery = true)
    List<ProductDetail> findProductDetailByProductId(@Param("id")Integer id);

    @Query(value = "SELECT product_detail.product_id, sum(product_detail.quantity) as amount FROM my_jacket.product_detail\n" +
            "join product on product.id = product_detail.product_id and product.id = :id\n" +
            "group by  product_detail.product_id",nativeQuery = true)
    IAmountDto getSumAmountOfProduct (@Param("id") Integer id);
}
