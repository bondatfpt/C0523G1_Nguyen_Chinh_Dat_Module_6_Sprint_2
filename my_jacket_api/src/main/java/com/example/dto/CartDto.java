package com.example.dto;

public class CartDto {
    private Integer userId;
    private Integer quantity;

    private Integer cartId;

    private Integer productDetailId;

    public CartDto() {
    }

    public CartDto(Integer userId, Integer quantity, Integer cartId, Integer productDetailId) {
        this.userId = userId;
        this.quantity = quantity;
        this.cartId = cartId;
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

    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public Integer getProductDetailId() {
        return productDetailId;
    }

    public void setProductDetailId(Integer productDetailId) {
        this.productDetailId = productDetailId;
    }
}
