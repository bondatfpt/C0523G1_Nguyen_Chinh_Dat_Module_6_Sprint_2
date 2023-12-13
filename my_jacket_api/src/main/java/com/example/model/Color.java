package com.example.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted;
    @JsonBackReference
    @OneToMany(mappedBy = "color")
    private Set<ProductDetail> productDetails;

    public Color() {
    }

    public Color(Integer id, String name, boolean isDeleted, Set<ProductDetail> productDetails) {
        this.id = id;
        this.name = name;
        this.isDeleted = isDeleted;
        this.productDetails = productDetails;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Set<ProductDetail> getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(Set<ProductDetail> productDetails) {
        this.productDetails = productDetails;
    }
}
