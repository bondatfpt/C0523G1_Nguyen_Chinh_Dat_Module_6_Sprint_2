package com.example.dto;

public interface ICartDetailDto {
    String getProductCode ();
    Double getPrice();
    String getPath();
    Integer getProductId();
    String getName();
    String getColor();
    String getSize();

    Integer getTotalQuantity();
}
