package com.example.repository;

import com.example.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product,Integer>{
    @Query(value = "SELECT product.*FROM my_jacket.product \n" +
            "where category_id = 1 and is_deleted = 0\n" +
            "order by product.date_added desc\n" +
            "limit 3",nativeQuery = true)
    List <Product> getProductLatestOfKid();
}
