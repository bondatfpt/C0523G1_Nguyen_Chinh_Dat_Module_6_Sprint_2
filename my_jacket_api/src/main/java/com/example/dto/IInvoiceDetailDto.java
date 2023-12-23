package com.example.dto;

public interface IInvoiceDetailDto {
    Integer getId();
    Integer getQuantity();

    Integer getTotal_price();
    Integer getInvoice_id();
    Integer getProduct_detail_id();
    Integer getInvoiceId();
    String getColorName();
    String getSizeName();
    String getName();
    Double getPrice();
    String getPath();
}
