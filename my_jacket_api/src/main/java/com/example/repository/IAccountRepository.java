package com.example.repository;

import com.example.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAccountRepository extends JpaRepository<Account,Integer> {
    Account getAccountByUsername(String username);
    Account getAccountById(Long id);
}
