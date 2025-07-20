package com.form.formoperation.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.form.formoperation.DTO.JwtResponse;
import com.form.formoperation.DTO.LoginRequest;
import com.form.formoperation.DTO.RegisterRequest;
import com.form.formoperation.Security.JwtTokenProvider;
import com.form.formoperation.model.Role;
import com.form.formoperation.model.User;
import com.form.formoperation.repo.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public String register(RegisterRequest request) {
        try {
            System.out.println("Register request received for email: " + request.getEmail());

            if (userRepository.existsByEmail(request.getEmail())) {
                System.out.println("User already exists with email: " + request.getEmail());
                throw new RuntimeException("User already exists with email: " + request.getEmail());
            }

            String encodedPassword = passwordEncoder.encode(request.getPassword());

            User user = User.builder()
                    .name(request.getName()) // ✅ Fixed: you were using registerRequest instead of request
                    .email(request.getEmail())
                    .password(encodedPassword)
                    .role(Role.USER) // Or Role.ADMIN manually
                    .build();

            userRepository.save(user);
            System.out.println("User registered successfully with email: " + request.getEmail());
            return "User registered successfully";
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error registering user: " + e.getMessage());
        }
    }

    @Override
    public JwtResponse login(LoginRequest request) {
        System.out.println("Login request received for email: " + request.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));

        String token = jwtTokenProvider.generateToken(user);


        System.out.println("Token generated for user: " + user.getEmail());
        return new JwtResponse(token, user.getEmail(), user.getName());
    }
}
