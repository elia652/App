package com.billing_app.Billing_App.io;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthRequest {

    private String email;
    private String password;

}
