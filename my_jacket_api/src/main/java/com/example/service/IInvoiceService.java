package com.example.service;

import com.example.dto.IInvoiceDetailDto;
import com.example.dto.ProductDetailDto;
import com.example.model.Invoice;
import com.example.model.InvoiceDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IInvoiceService {
    void createInvoice(String note,String otherLocation, Double totalPrice, Integer totalQuantity, Integer paymentId, Integer userId);

    void createInvoiceDetail(Integer quantity, Double totalPrice,
                             Integer invoiceId, Integer productDetailId);
    Invoice getInvoiceByUserAndId(Integer userId);
    Invoice saveInvoice (Invoice invoice);
     Optional<Invoice> getInvoiceById(Integer id);
    List<InvoiceDetail> findInvoiceDetailByInvoice_Id(Integer invoiceId);
    Page<Invoice> getInvoicesByUserId(Pageable pageable, Integer userId );
    Page<Invoice> getInvoicesByDate( Pageable pageable,String date);
    List<IInvoiceDetailDto> getInvoicesByInvoiceId(Integer invoiceId);

}
