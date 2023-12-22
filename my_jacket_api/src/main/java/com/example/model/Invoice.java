package com.example.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "datetime")
    private LocalDateTime dateOrder;
    private Double totalPrice;
    private Integer totalQuantity;
    private  String otherLocation;
    @Column(columnDefinition = "text")
    private String note;
    @Column(columnDefinition = "boolean default false")
    private boolean isDeleted;
   @ManyToOne
   @JoinColumn(columnDefinition = "payment_id", referencedColumnName = "id")
   private Payment payment;

    @JsonBackReference
    @OneToMany(mappedBy = "invoice")
    private Set<InvoiceDetail> invoiceDetails;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Invoice() {
    }

    public Invoice(Integer id, LocalDateTime dateOrder, Double totalPrice, Integer totalQuantity, String otherLocation, String note, boolean isDeleted, Payment payment, Set<InvoiceDetail> invoiceDetails, User user) {
        this.id = id;
        this.dateOrder = dateOrder;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.otherLocation = otherLocation;
        this.note = note;
        this.isDeleted = isDeleted;
        this.payment = payment;
        this.invoiceDetails = invoiceDetails;
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getOtherLocation() {
        return otherLocation;
    }

    public void setOtherLocation(String otherLocation) {
        this.otherLocation = otherLocation;
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Set<InvoiceDetail> getInvoiceDetails() {
        return invoiceDetails;
    }

    public void setInvoiceDetails(Set<InvoiceDetail> invoiceDetails) {
        this.invoiceDetails = invoiceDetails;
    }
}
