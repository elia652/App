package com.billing_app.Billing_App.service;

import com.billing_app.Billing_App.io.UserRequest;
import com.billing_app.Billing_App.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse>readUsers();
    void deleteUser(String id);
}
