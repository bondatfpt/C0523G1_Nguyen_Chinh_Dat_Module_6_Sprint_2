package com.example.repository;

import com.example.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IRoleRepository extends JpaRepository<Role,Integer> {
//    @Query(value = "SELECT * FROM my_jacket_db.role\n" +
//            "join account_role on account_role.role_id = role.id \n" +
//            "join account on  account_role.account_id = account.id",nativeQuery = true)

}
