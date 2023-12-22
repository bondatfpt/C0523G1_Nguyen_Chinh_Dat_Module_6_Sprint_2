package com.example.dto;

public class InvoiceDetailDto {
    private Integer quantity;
    private Double totalPrice;
    private Integer invoiceId;
    private Integer productDetailId;

    public InvoiceDetailDto() {
    }

    public InvoiceDetailDto(Integer quantity, Double totalPrice, Integer invoiceId, Integer productDetailId) {
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.invoiceId = invoiceId;
        this.productDetailId = productDetailId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
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
