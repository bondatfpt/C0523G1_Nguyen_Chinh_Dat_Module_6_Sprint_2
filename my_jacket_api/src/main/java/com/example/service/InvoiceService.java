package com.example.service;

import com.example.dto.IInvoiceDetailDto;
import com.example.dto.InvoiceDetailDto;
import com.example.dto.ProductDetailDto;
import com.example.model.Invoice;
import com.example.model.InvoiceDetail;
import com.example.repository.IInvoiceDetailRepository;
import com.example.repository.IInvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService implements IInvoiceService {
    @Autowired
    private IInvoiceRepository iInvoiceRepository;
    @Autowired
    private IInvoiceDetailRepository iInvoiceDetailRepository;

    @Override
    public void createInvoice(String note,String otherLocation,Double totalPrice, Integer totalQuantity, Integer paymentId, Integer userId) {
        iInvoiceRepository.createInvoice(note, otherLocation,totalPrice, totalQuantity, paymentId, userId);
    }

    @Override
    public void createInvoiceDetail(Integer quantity, Double totalPrice, Integer invoiceId, Integer productDetailId) {
        iInvoiceDetailRepository.createInvoiceDetail(quantity, totalPrice, invoiceId, productDetailId);
    }

    @Override
    public Invoice getInvoiceByUserAndId(Integer userId) {
        return iInvoiceRepository.getInvoiceByUserId(userId);
    }

    @Override
    public Invoice saveInvoice(Invoice invoice) {
        iInvoiceRepository.save(invoice);
        return invoice;
    }

    @Override
    public Optional<Invoice> getInvoiceById(Integer id) {
        Optional<Invoice> invoice = iInvoiceRepository.findById(id);
        return invoice;
    }

    @Override
    public List<InvoiceDetail> findInvoiceDetailByInvoice_Id(Integer invoiceId) {
        return iInvoiceDetailRepository.findInvoiceDetailByInvoice_Id(invoiceId);
    }

    @Override
    public Page<Invoice> getInvoicesByUserId(Pageable pageable, Integer userId) {
        return iInvoiceRepository.getInvoicesByUserId(pageable,userId);
    }

    @Override
    public Page<Invoice> getInvoicesByDate(Pageable pageable,String date) {
        return iInvoiceRepository.getInvoicesByDate(pageable,date);
    }

    @Override
    public List<IInvoiceDetailDto> getInvoicesByInvoiceId(Integer invoiceId) {
        return iInvoiceDetailRepository.getInvoicesByInvoiceId(invoiceId);
    }
}
