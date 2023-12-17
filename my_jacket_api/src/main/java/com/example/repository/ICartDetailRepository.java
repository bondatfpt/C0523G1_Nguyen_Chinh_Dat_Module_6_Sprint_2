package com.example.repository;

import com.example.dto.ICartDetailDto;
import com.example.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ICartDetailRepository extends JpaRepository<CartDetail,Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into cart_detail(quantity,cart_id,product_detail_id)\n" +
            "value(:quantity,:cartId,:productDetailId)",nativeQuery = true)
    void createCartDetail (@Param("quantity") Integer quantity, @Param("cartId") Integer cartId, @Param("productDetailId")Integer productDetailId);


}
