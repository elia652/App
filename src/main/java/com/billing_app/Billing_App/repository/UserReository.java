package com.billing_app.Billing_App.repository;

import com.billing_app.Billing_App.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserReository extends JpaRepository<UserEntity,Long> {


    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity>findByUserId(String userId);
}
