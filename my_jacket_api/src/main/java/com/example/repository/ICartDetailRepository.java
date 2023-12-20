package com.example.repository;

import com.example.dto.ICartDetailDto;
import com.example.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ICartDetailRepository extends JpaRepository<CartDetail,Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into cart_detail(quantity,cart_id,product_detail_id)\n" +
            "value(:quantity,:cartId,:productDetailId)",nativeQuery = true)
    void createCartDetail (@Param("quantity") Integer quantity, @Param("cartId") Integer cartId, @Param("productDetailId")Integer productDetailId);

    @Procedure(name = "InsertOrUpdateCartDetail")
    void insertOrUpdateCartDetail(
            @Param("cartId") Integer cartId,
            @Param("productDetailId") Integer productDetailId,
            @Param("quantity") Integer quantity,
            @Param("accountId") Integer accountId
    );

    @Procedure(name = "UpdateAmountCartDetail")
    void updateAmountCartDetail(@Param("cartId") Integer cartId,
                                @Param("productDetailId") Integer productDetailId,
                                @Param("quantity") Integer quantity,
                                @Param("accountId") Integer accountId);
    @Transactional
    @Modifying
    @Query(value = "delete cart_detail\n" +
            "from cart_detail\n" +
            "join product_detail on product_detail.id = cart_detail.product_detail_id and product_detail.id = :productDetailId\n" +
            "join product on product.id = product_detail.product_id and product.id = :productId\n" +
            "join cart on cart.id = cart_detail.cart_id  and cart.id = :cartId\n" +
            "join account on account.id = cart.user_id and account.id = :accountId",nativeQuery = true)
    void delete (@Param("accountId")Integer accountId, @Param("cartId")Integer cartId,
    @Param("productId")Integer productId,@Param("productDetailId") Integer productDetailId);
}
