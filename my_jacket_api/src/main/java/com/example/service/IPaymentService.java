package com.example.service;

import com.example.model.Payment;

import java.util.List;

public interface IPaymentService {
    List<Payment> findAll();
}
