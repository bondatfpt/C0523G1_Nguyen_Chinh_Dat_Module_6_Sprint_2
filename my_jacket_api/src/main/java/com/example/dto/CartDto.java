package com.example.dto;

public class CartDto {
    private Integer quantity;

    private Integer accountId;

    private Integer cartId;

    private Integer productDetailId;

    public CartDto() {
    }

    public CartDto(Integer quantity, Integer accountId, Integer cartId, Integer productDetailId) {
        this.quantity = quantity;
        this.accountId = accountId;
        this.cartId = cartId;
        this.productDetailId = productDetailId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
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
