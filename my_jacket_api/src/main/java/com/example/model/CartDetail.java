package com.example.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer quantity;
    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted;
    @ManyToOne
    @JoinColumn(columnDefinition = "cart_id",referencedColumnName = "id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(columnDefinition = "product_detail_id",referencedColumnName = "id")
    private ProductDetail productDetail;

    public CartDetail() {
    }

    public CartDetail(Integer id, Integer quantity, boolean isDeleted, Cart cart, ProductDetail productDetail) {
        this.id = id;
        this.quantity = quantity;
        this.isDeleted = isDeleted;
        this.cart = cart;
        this.productDetail = productDetail;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public ProductDetail getProductDetail() {
        return productDetail;
    }

    public void setProductDetail(ProductDetail productDetail) {
        this.productDetail = productDetail;
    }
}
