package com.example.controller;

import com.example.model.Account;
import com.example.model.CustomAccountDetails;
import com.example.model.JwtTokenProvider;
import com.example.payload.LoginRequest;
import com.example.payload.LoginResponse;
import com.example.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainPageController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private IAccountRepository iAccountRepository;

    @PostMapping("/login")
    public LoginResponse authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("login run");

        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println(authentication.getPrincipal());
        String jwt = tokenProvider.generateToken((CustomAccountDetails)authentication.getPrincipal());



        // Trả về jwt cho người dùng.
        System.out.println("JWT ne`:" + jwt);
        return new LoginResponse(jwt);
    }
@GetMapping("/account")
    public ResponseEntity<List<Account>> getAll () {
        List <Account> accounts = iAccountRepository.findAll();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

}

