package com.example.controller;

import com.example.dto.InvoiceDetailDto;
import com.example.dto.InvoiceDto;
import com.example.dto.ProductDetailDto;
import com.example.model.*;
import com.example.service.IInvoiceService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/invoice")
public class RestInvoiceController {
    @Autowired
    private IInvoiceService iInvoiceService;

    @GetMapping("/user/{id}")
    public ResponseEntity<Invoice> getInvoiceByUserId(@PathVariable Integer id) {
        Invoice invoice = iInvoiceService.getInvoiceByUserAndId(id);
        if (invoice == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(invoice, HttpStatus.OK);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<Page<Invoice>> getInvoicesByUserId(@RequestParam(name = "page", defaultValue = "0", required = false) Integer page,
                                                             @RequestParam(name = "date", required = false) String date,
                                                             @RequestParam(name = "userId", required = false) Integer userId) {
        Pageable pageable = PageRequest.of(page, 6);
        if (date == null) {
            Page<Invoice> invoices = iInvoiceService.getInvoicesByUserId(pageable, userId);
            return new ResponseEntity<>(invoices, HttpStatus.OK);
        } else {
            Page<Invoice> invoices = iInvoiceService.getInvoicesByDate(pageable, date);
            return new ResponseEntity<>(invoices, HttpStatus.OK);
        }

    }

    @GetMapping("/invoice-detail/{id}")
    public ResponseEntity<List<InvoiceDetail>> getInvoiceDetailByInvoiceId(@PathVariable Integer id) {
        List<InvoiceDetail> invoiceDetails = iInvoiceService.findInvoiceDetailByInvoice_Id(id);
        if (invoiceDetails == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(invoiceDetails, HttpStatus.OK);
        }
    }

    @PostMapping("/invoice-detail/new")
    public ResponseEntity<String> createInvoiceDetail(@RequestBody List<InvoiceDetailDto> invoiceDetailDto) {
        if (invoiceDetailDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed !!");
        }
        for (InvoiceDetailDto cartItem : invoiceDetailDto) {
            iInvoiceService.createInvoiceDetail(cartItem.getQuantity(), cartItem.getTotalPrice(), cartItem.getInvoiceId(), cartItem.getProductDetailId());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Success Created");
    }

    @PostMapping("/new")
    public ResponseEntity<Invoice> createInvoice(@RequestBody InvoiceDto invoiceDto) {
        if (invoiceDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Invoice invoice = new Invoice();
        BeanUtils.copyProperties(invoiceDto, invoice);
        invoice.setDateOrder(LocalDateTime.now());
        invoice.setTotalPrice(invoice.getTotalPrice());
        invoice.setTotalQuantity(invoiceDto.getTotalQuantity());
        invoice.setNote(invoiceDto.getNote());
        invoice.setUser(new User(invoiceDto.getUserId()));
        invoice.setPayment(new Payment(invoiceDto.getPaymentId()));
        invoice.setOtherLocation(invoiceDto.getOtherLocation());
        Invoice invoice1 = iInvoiceService.saveInvoice(invoice);
        return new ResponseEntity<>(invoice1, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Invoice>> getInvoiceById(@PathVariable Integer id) {
        Optional<Invoice> invoice = iInvoiceService.getInvoiceById(id);
        if (invoice == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(invoice, HttpStatus.OK);

    }
}
