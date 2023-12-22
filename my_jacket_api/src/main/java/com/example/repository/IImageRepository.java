package com.example.repository;

import com.example.dto.IImageDto;
import com.example.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IImageRepository extends JpaRepository<Image,Integer> {

    @Query(value = "SELECT latest_products.id, latest_products.name, latest_products.price,\n" +
            "    MAX(image.path) as `path`\n" +
            "FROM my_jacket.image\n" +
            "JOIN product_detail ON product_detail.id = image.product_detail_id\n" +
            "JOIN (\n" +
            "    SELECT id, name,price\n" +
            "    FROM my_jacket.product\n" +
            "    WHERE category_id = 1 AND is_deleted = 0\n" +
            "    ORDER BY date_added DESC\n" +
            "    " +
            ") latest_products ON latest_products.id = product_detail.product_id\n" +
            "GROUP BY latest_products.id, latest_products.name,latest_products.price",nativeQuery = true)
    List<IImageDto> getProductLatestOfKid();

    @Query(value = "SELECT latest_products.id, latest_products.name, latest_products.price,\n" +
            "    MAX(image.path) as `path`\n" +
            "FROM my_jacket.image\n" +
            "JOIN product_detail ON product_detail.id = image.product_detail_id\n" +
            "JOIN (\n" +
            "    SELECT id, name,price\n" +
            "    FROM my_jacket.product\n" +
            "    WHERE category_id = 2 AND is_deleted = 0\n" +
            "    ORDER BY date_added DESC\n" +
            "    " +
            ") latest_products ON latest_products.id = product_detail.product_id\n" +
            "GROUP BY latest_products.id, latest_products.name,latest_products.price",nativeQuery = true)
    List<IImageDto> getProductLatestOfWomen();

    @Query(value = "SELECT latest_products.id, latest_products.name, latest_products.price,\n" +
            "    MAX(image.path) as `path`\n" +
            "FROM my_jacket.image\n" +
            "JOIN product_detail ON product_detail.id = image.product_detail_id\n" +
            "JOIN (\n" +
            "    SELECT id, name,price\n" +
            "    FROM my_jacket.product\n" +
            "    WHERE category_id = 3 AND is_deleted = 0\n" +
            "    ORDER BY date_added DESC\n" +
            "    " +
            ") latest_products ON latest_products.id = product_detail.product_id\n" +
            "GROUP BY latest_products.id, latest_products.name,latest_products.price",nativeQuery = true)
    List<IImageDto> getProductLatestOfMen();

    @Query(value = "SELECT MAX(image.path) as `path`,product_detail.color_id, color.name,product_detail.product_detail_code FROM my_jacket.image\n" +
            "                       join product_detail on product_detail.id = image.product_detail_id \n" +
            "                       join product on product.id = product_detail.product_id and product.id = :id  \n" +
            "                        join color on color.id = product_detail.color_id \n" +
            "                        group by product_detail.color_id, product_detail.product_detail_code",nativeQuery = true)
    List<IImageDto> getColorOfProduct(@Param("id") Integer id);

    @Query(value = "SELECT image.path,product.price, product_detail.color_id FROM my_jacket.image\n" +
            "join product_detail on product_detail.id = image.product_detail_id and color_id = :colorId \n" +
            "join product on product.id = product_detail.product_id and product.id = :productId \n" +
            "limit 4",nativeQuery = true)
    List<IImageDto> getImagesOfColor (@Param("colorId") Integer colorId, @Param("productId") Integer productId);
}
