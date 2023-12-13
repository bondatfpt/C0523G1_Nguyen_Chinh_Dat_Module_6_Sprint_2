package com.example.repository;

import com.example.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product,Integer>{
    @Query(value = "SELECT product.*FROM my_jacket.product \n" +
            "where id = :id and is_deleted = 0\n",nativeQuery = true)
    Product getProductById(@Param("id") Integer id);
}
