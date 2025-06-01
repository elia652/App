package com.billing_app.Billing_App.service.implementation;

import com.billing_app.Billing_App.entity.UserEntity;
import com.billing_app.Billing_App.io.UserRequest;
import com.billing_app.Billing_App.io.UserResponse;
import com.billing_app.Billing_App.repository.UserReository;
import com.billing_app.Billing_App.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserReository userReository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {
        UserEntity newUser=convertToEntity(request);
        newUser=userReository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserEntity convertToEntity(UserRequest request) {
      return   UserEntity.builder()
              .userId(UUID.randomUUID().toString())
              .name(request.getName())
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .role(request.getRole())
              .build();
    }

    private UserResponse convertToResponse(UserEntity newUser) {
        return UserResponse.builder()
                .name(newUser.getName())
                .userId(newUser.getUserId())
                .email(newUser.getEmail())
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .role(newUser.getRole())
                .build();
    }

    @Override
    public String getUserRole(String email) {
       UserEntity existingUser= userReository.findByEmail(email)
               .orElseThrow(()->new UsernameNotFoundException("User not found by the specified email"+email));
    return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        return userReository.findAll()
                .stream()
                .map(user->convertToResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
      UserEntity existingUser=  userReository.findByUserId(id)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
      userReository.delete(existingUser);
    }
}
