package com.example.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted;
    @Column(columnDefinition = "datetime")
    private LocalDateTime dateCreate;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonBackReference
    @OneToMany(mappedBy = "cart")
    private Set<CartDetail> cartDetails;

    public Cart() {
    }

    public Cart(Integer id, User user) {
        this.id = id;
        this.user = user;
    }

    public Cart(Integer id, boolean isDeleted, User user, Set<CartDetail> cartDetails) {
        this.id = id;
        this.isDeleted = isDeleted;
        this.user = user;
        this.cartDetails = cartDetails;
    }

    public Set<CartDetail> getCartDetails() {
        return cartDetails;
    }

    public void setCartDetails(Set<CartDetail> cartDetails) {
        this.cartDetails = cartDetails;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
