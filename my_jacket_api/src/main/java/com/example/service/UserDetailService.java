package com.example.service;

import com.example.model.Account;
import com.example.model.CustomAccountDetails;
import com.example.model.Role;
import com.example.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private IAccountRepository iAccountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = iAccountRepository.getAccountByUsername(username);
        System.out.println(account);
        if (account == null) {
            System.out.println("Not found: " + username);
            throw new UsernameNotFoundException("User " + username + " was not found in the database");
        }
        Set<Role> roles = account.getRoles();
        System.out.println("Role: " + roles);
        List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        if (roles != null) {
            for (Role role : roles) {
                GrantedAuthority authority = new SimpleGrantedAuthority(role.getName());
                grantedAuthorities.add(authority);
            }
        }
        System.out.println("Added " + grantedAuthorities);
        UserDetails userDetails = new CustomAccountDetails(account);
        System.out.println("UserDetails: " + userDetails);
        return userDetails;
    }

    @Transactional
    public UserDetails loadUserById(Integer id) {
        Account account = iAccountRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return new CustomAccountDetails(account);
    }
}
