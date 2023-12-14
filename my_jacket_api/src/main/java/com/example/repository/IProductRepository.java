package com.example.repository;

import com.example.dto.IProductDto;
import com.example.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product,Integer>{
    @Query(value = "SELECT product.*FROM my_jacket.product \n" +
            "where id = :id and is_deleted = 0\n",nativeQuery = true)
    Product getProductById(@Param("id") Integer id);

    @Query(value = "SELECT products.id, products.name, products.price,\n" +
            "     MIN(image.path) as `path`\n" +
            "FROM my_jacket.image\n" +
            "JOIN product_detail ON product_detail.id = image.product_detail_id AND image.is_deleted = 0\n" +
            "RIGHT JOIN (\n" +
            "     SELECT id, name, price, category_id, date_added\n" +
            "     FROM product\n" +
            "     WHERE is_deleted = 0\n" +
            ") products ON products.id = product_detail.product_id AND product_detail.is_deleted = 0\n" +
            "GROUP BY products.id, products.name, products.price, products.category_id\n" +
            "ORDER BY products.date_added DESC",nativeQuery = true)
    Page<IProductDto> findAllProduct(Pageable pageable);
}
