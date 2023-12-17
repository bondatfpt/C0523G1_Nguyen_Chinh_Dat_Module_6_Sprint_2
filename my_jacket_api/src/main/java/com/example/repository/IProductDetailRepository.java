package com.example.repository;

import com.example.dto.IAmountDto;
import com.example.dto.ICartDetailDto;
import com.example.dto.IProductDto;
import com.example.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductDetailRepository extends JpaRepository<ProductDetail,Integer> {
    @Query(value = "SELECT product_detail.*FROM my_jacket.product_detail\n" +
            "            join product on product.id = product_detail.product_id \n" +
            "            where product.id = :id and product.is_deleted = 0 and product_detail.is_deleted = 0", nativeQuery = true)
    List<ProductDetail> findProductDetailByProductId(@Param("id")Integer id);

    @Query(value = "SELECT product_detail.product_id, sum(product_detail.quantity) as amount FROM my_jacket.product_detail\n" +
            "            join product on product.id = product_detail.product_id and product.id = :id and product_detail.is_deleted = 0\n" +
            "            ",nativeQuery = true)
    IAmountDto getSumAmountOfProduct (@Param("id") Integer id);

    @Query(value = "SELECT my_jacket.product_detail.quantity, product.id  FROM my_jacket.product_detail\n" +
            "join product on product.id = product_detail.product_id and product.is_deleted = 0 and product.id = :productId\n" +
            "where color_id = :colorId and size_id = :sizeId and product_detail.is_deleted = 0",nativeQuery = true)
    IAmountDto getAmountOfProductOfColorOfSize (@Param("productId") Integer productId,@Param("colorId") Integer colorId, @Param("sizeId") Integer sizeId);

    @Query(value = "SELECT product_detail.id FROM my_jacket.product_detail\n" +
            "join product on product.id = product_detail.product_id and product.is_deleted = 0 and product.id = :productId\n" +
            "where color_id = :colorId and size_id = :sizeId and product_detail.is_deleted = 0",nativeQuery = true)
    IProductDto getIdProductDetail (@Param("productId")Integer productId, @Param("colorId")Integer colorId, @Param("sizeId")Integer sizeId);
    @Query (value = "SELECT\n" +
            "  product_detail.product_detail_code AS productCode,\n" +
            "  product.price,\n" +
            "  product.name,\n" +
            "  color.name AS color,\n" +
            "  size.name AS size,\n" +
            "  product.id AS productId,\n" +
            "  MAX(image.path) as path,\n" +
            "  totalQuantity\n" +
            "FROM\n" +
            "  my_jacket.product_detail\n" +
            "  JOIN image ON product_detail.id = image.product_detail_id \n" +
            "JOIN\n" +
            "  color ON color.id = product_detail.color_id\n" +
            "JOIN\n" +
            "  size ON size.id = product_detail.size_id\n" +
            "JOIN\n" +
            "  product ON product_detail.product_id = product.id AND product.is_deleted = 0\n" +
            "JOIN\n" +
            "  (\n" +
            "    SELECT\n" +
            "      product_detail_id,\n" +
            "      SUM(quantity) AS totalQuantity\n" +
            "    FROM\n" +
            "      cart_detail\n" +
            "    JOIN\n" +
            "      cart ON cart.id = cart_detail.cart_id AND cart_detail.is_deleted = 0 and cart.id = :cartId\n" +
            "    JOIN\n" +
            "      account ON account.id = cart.user_id AND account.is_deleted = 0 and account.id = :accountId\n" +
            "    GROUP BY\n" +
            "      product_detail_id\n" +
            "  ) AS total ON product_detail.id = total.product_detail_id\n" +
            "GROUP BY\n" +
            "  product_detail.product_detail_code,\n" +
            "  product.price,\n" +
            "  product.id,\n" +
            "  product.name,\n" +
            "  color.name,\n" +
            "  size.name,\n" +
            "  total.totalQuantity\n",nativeQuery = true)
    List<ICartDetailDto> getAllCartDetailByCartIdAndAccountId (@Param("accountId") Integer accountId, @Param("cartId")Integer cartId);
}

