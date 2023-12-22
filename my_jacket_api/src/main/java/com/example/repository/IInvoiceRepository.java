package com.example.repository;

import com.example.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface IInvoiceRepository extends JpaRepository<Invoice,Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into invoice (date_order,note,other_location,total_price,total_quantity,payment_id,user_id)\n" +
            "value(NOW(),:note,:otherLocation,:totalPrice,:totalQuantity,:paymentId,:userId)",nativeQuery = true)
    
    void createInvoice(@Param("note") String note,@Param("otherLocation")String otherLocation,@Param("totalPrice") Double totalPrice,
                       @Param("totalQuantity")Integer totalQuantity,
                       @Param("paymentId") Integer paymentId,@Param("userId") Integer userId);

    @Query(value = "SELECT * FROM my_jacket.invoice\n" +
            "where user_id = :id",nativeQuery = true)
    Invoice getInvoiceByUserId(@Param("id") Integer id);

    @Query(value = "SELECT * FROM my_jacket.invoice\n" +
            "where user_id = :userId",nativeQuery = true)
    List<Invoice> getInvoicesByUserId(@Param("userId") Integer userId);
}
