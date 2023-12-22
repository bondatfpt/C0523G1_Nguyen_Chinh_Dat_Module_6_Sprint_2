package com.example.repository;

import com.example.dto.ISizeDto;
import com.example.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ISizeRepository extends JpaRepository<Size,Integer> {
    @Query(value = "SELECT size.id, size.name FROM my_jacket.size\n" +
            "join product_detail on product_detail.size_id = size.id  and product_detail.color_id = :colorId\n" +
            "join product on product.id = product_detail.product_id and product.id = :productId",nativeQuery = true)
    List<ISizeDto> getSizeByColorIdOfProduct(@Param("colorId") Integer colorId,@Param("productId")Integer productId);
}
