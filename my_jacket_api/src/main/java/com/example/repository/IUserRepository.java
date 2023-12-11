package com.example.repository;

import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IUserRepository extends JpaRepository<User,Integer> {
//    @Query(value = "select * from user \n" +
//            "join account on account.id = user.account_id and user.account_id = :accountId")
     User getUserByAccount_Id(Integer accountId);
}
