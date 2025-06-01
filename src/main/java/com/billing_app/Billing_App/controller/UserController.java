package com.billing_app.Billing_App.controller;

import com.billing_app.Billing_App.io.UserRequest;
import com.billing_app.Billing_App.io.UserResponse;
import com.billing_app.Billing_App.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerUser(@RequestBody UserRequest request){
        try{
           return userService.createUser(request);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"unable to create user"+e.getMessage());
        }
    }
    @GetMapping("/users")
    public List<UserResponse>readUsers(){
        return userService.readUsers();
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void deleteUsers(@PathVariable("id") String id){
        try{userService.deleteUser(id);}catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Can't find the user by the given id "+id);
        }
    }
}
