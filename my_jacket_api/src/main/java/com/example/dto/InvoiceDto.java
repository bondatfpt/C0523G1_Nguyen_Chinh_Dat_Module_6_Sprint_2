package com.example.dto;

public class InvoiceDto {
    private String note;
    private String otherLocation;
    private Double totalPrice;
    private Integer totalQuantity;
    private Integer paymentId;
    private Integer userId;

    public InvoiceDto() {
    }

    public InvoiceDto(String note, String otherLocation, Double totalPrice, Integer totalQuantity, Integer paymentId, Integer userId) {
        this.note = note;
        this.otherLocation = otherLocation;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.paymentId = paymentId;
        this.userId = userId;
    }

    public String getNote() {
        return note;
    }

    public String getOtherLocation() {
        return otherLocation;
    }

    public void setOtherLocation(String otherLocation) {
        this.otherLocation = otherLocation;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Integer getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Integer paymentId) {
        this.paymentId = paymentId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
