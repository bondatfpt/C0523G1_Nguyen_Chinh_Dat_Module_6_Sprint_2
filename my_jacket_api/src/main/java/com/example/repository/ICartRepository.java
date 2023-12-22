package com.example.repository;

import com.example.dto.ICartDto;
import com.example.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface ICartRepository extends JpaRepository<Cart,Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into cart (user_id,date_create)\n" +
            "values(:userId,NOW())",nativeQuery = true)
    void createCart(@Param("userId") Integer userId);

    @Query(value = "SELECT cart.id as cart_id FROM my_jacket.cart\n" +
            "join user on user.id = cart.user_id  and user.id = :id",nativeQuery = true)
    ICartDto getCartByUserId (@Param("id") Integer id);
}
