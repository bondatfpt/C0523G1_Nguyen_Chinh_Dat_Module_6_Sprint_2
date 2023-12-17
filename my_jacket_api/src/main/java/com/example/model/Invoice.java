package com.example.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String invoiceCode;
    @Column(columnDefinition = "datetime")
    private LocalDateTime dateOrder;
    private String location;
    private String phone;
    private String buyerName;
    private Double totalPrice;
    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted;

    @OneToOne
    @JoinColumn(name = "cart_detail_id", referencedColumnName = "id")
    private CartDetail cartDetail;

    public Invoice() {
    }

    public Invoice(Integer id, String invoiceCode, LocalDateTime dateOrder, String location, String phone, String buyerName, Double totalPrice, boolean isDeleted, CartDetail cartDetail) {
        this.id = id;
        this.invoiceCode = invoiceCode;
        this.dateOrder = dateOrder;
        this.location = location;
        this.phone = phone;
        this.buyerName = buyerName;
        this.totalPrice = totalPrice;
        this.isDeleted = isDeleted;
        this.cartDetail = cartDetail;
    }

    public String getInvoiceCode() {
        return invoiceCode;
    }

    public void setInvoiceCode(String invoiceCode) {
        this.invoiceCode = invoiceCode;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(LocalDateTime dateOrder) {
        this.dateOrder = dateOrder;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public CartDetail getCartDetail() {
        return cartDetail;
    }

    public void setCartDetail(CartDetail cartDetail) {
        this.cartDetail = cartDetail;
    }
}
