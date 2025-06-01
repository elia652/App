package com.billing_app.Billing_App.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String userId;
    private String email;
    private String role;
    private String name;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
