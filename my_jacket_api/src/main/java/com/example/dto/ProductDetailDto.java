package com.example.dto;

public class ProductDetailDto {
    private Integer quantity;
    private Integer userId;

    private Integer invoiceId;
    private Integer productDetailId;

    public ProductDetailDto() {
    }

    public ProductDetailDto(Integer quantity, Integer userId, Integer invoiceId, Integer productDetailId) {
        this.quantity = quantity;
        this.userId = userId;
        this.invoiceId = invoiceId;
        this.productDetailId = productDetailId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Integer invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Integer getProductDetailId() {
        return productDetailId;
    }

    public void setProductDetailId(Integer productDetailId) {
        this.productDetailId = productDetailId;
    }
}
