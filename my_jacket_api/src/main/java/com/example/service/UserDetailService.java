package com.example.service;

import com.example.model.Account;
import com.example.model.Role;
import com.example.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private IAccountRepository iAccountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = iAccountRepository.getAccountByUseName(username);
        System.out.println(account);
        if (account == null || account.isDeleted() || account.isActive() == false) {
            System.out.println("Not found: " + username);
            throw new UsernameNotFoundException("User " + username + " was not found in the database");
        }
        Role role = account.getRole();
        System.out.println("Role: " + role);
        List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        if (role != null) {
            GrantedAuthority authority = new SimpleGrantedAuthority(role.getName());
            grantedAuthorities.add(authority);
        }
        System.out.println("Added " + grantedAuthorities);
        UserDetails userDetails = new User(account.getUseName(), account.getPassword(), grantedAuthorities);
        System.out.println("UserDetails: " + userDetails);
        return userDetails;
    }
}
