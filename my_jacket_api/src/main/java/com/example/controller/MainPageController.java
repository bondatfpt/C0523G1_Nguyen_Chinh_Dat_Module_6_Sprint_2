package com.example.controller;

import com.example.model.Account;
import com.example.model.CustomAccountDetails;
import com.example.jwt.JwtTokenProvider;
import com.example.jwt.payload.LoginRequest;
import com.example.jwt.payload.LoginResponse;
import com.example.model.User;
import com.example.repository.IAccountRepository;
import com.example.service.IUserService;
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
@CrossOrigin("*")
public class MainPageController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private IUserService iUserService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("login run");

        try {
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
            String jwt = tokenProvider.generateToken((CustomAccountDetails) authentication.getPrincipal());

            // Trả về jwt và HTTP status code 200 OK cho người dùng.
            return ResponseEntity.ok(new LoginResponse(jwt));
        } catch (Exception e) {
            // Xử lý các exception liên quan đến việc xác thực, ví dụ: Bad credentials.
            // Trả về HTTP status code 401 Unauthorized.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @GetMapping("authentication/user/{accountId}")
    public ResponseEntity<User> getUserByAccountId(@PathVariable Integer accountId) {
        User user = iUserService.getUserByAccountId(accountId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

}

