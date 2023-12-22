package com.example.controller;

import com.example.model.Payment;
import com.example.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class RestPaymentRepository {
    @Autowired
    private IPaymentService iPaymentService;

    @GetMapping()
    public ResponseEntity<List<Payment>> getAll() {
        List<Payment> payments  = iPaymentService.findAll();
        if (payments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(payments, HttpStatus.OK);
        }
    }
}
