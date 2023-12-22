package com.example.service;

import com.example.model.Payment;
import com.example.repository.IPaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService implements IPaymentService {
    @Autowired
    private IPaymentRepository iPaymentRepository;

    @Override
    public List<Payment> findAll() {
        return iPaymentRepository.findAll();
    }
}
