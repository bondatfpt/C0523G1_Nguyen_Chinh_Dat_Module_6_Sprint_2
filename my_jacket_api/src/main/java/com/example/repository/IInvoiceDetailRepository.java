package com.example.repository;

import com.example.dto.ProductDetailDto;
import com.example.model.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface IInvoiceDetailRepository extends JpaRepository<InvoiceDetail, Integer> {
    @Transactional
    @Modifying
    @Query(value = "insert into invoice_detail (quantity,total_price,invoice_id,product_detail_id)\n" +
            "value(:quantity,:totalPrice,:invoiceId,:productDetailId)", nativeQuery = true)
    void createInvoiceDetail(@Param("quantity") Integer quantity, @Param("totalPrice") Double totalPrice,
                             @Param("invoiceId") Integer invoiceId, @Param("productDetailId") Integer productDetailId);
    List<InvoiceDetail> findInvoiceDetailByInvoice_Id(Integer invoiceId);
}
