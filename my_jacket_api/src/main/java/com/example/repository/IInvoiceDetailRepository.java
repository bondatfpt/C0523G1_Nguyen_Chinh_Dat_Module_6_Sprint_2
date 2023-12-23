package com.example.repository;

import com.example.dto.IInvoiceDetailDto;
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

    @Query(value = "SELECT \n" +
            "    invoice_detail.*,\n" +
            "    invoice.id AS invoiceId,\n" +
            "    color.name AS colorName,\n" +
            "    size.name AS sizeName,\n" +
            "    product.name AS name,\n" +
            "    product.price AS price,\n" +
            "    MAX(image.path) AS path\n" +
            "FROM \n" +
            "    invoice_detail\n" +
            "JOIN \n" +
            "    invoice ON invoice.id = invoice_detail.invoice_id AND invoice.id = :invoiceId\n" +
            "JOIN \n" +
            "    product_detail ON product_detail.id = invoice_detail.product_detail_id\n" +
            "JOIN \n" +
            "    product ON product_detail.product_id = product.id\n" +
            "JOIN \n" +
            "    color ON color.id = product_detail.color_id\n" +
            "JOIN \n" +
            "    size ON size.id = product_detail.size_id \n" +
            "JOIN \n" +
            "    image ON image.product_detail_id = product_detail.id\n" +
            "GROUP BY \n" +
            "    invoice_detail.id, invoice.id, color.name, size.name, product.name, product.price\n",nativeQuery = true)
    List<IInvoiceDetailDto> getInvoicesByInvoiceId(@Param("invoiceId")Integer invoiceId);

}
