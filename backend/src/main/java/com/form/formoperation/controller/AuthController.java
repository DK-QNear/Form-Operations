package com.form.formoperation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.form.formoperation.DTO.JwtResponse;
import com.form.formoperation.DTO.LoginRequest;
import com.form.formoperation.DTO.RegisterRequest;
import com.form.formoperation.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth") // Base URL for all auth APIs
@RequiredArgsConstructor // Automatically injects AuthService
public class AuthController {
 
    private final AuthService authService;
 
    /**
     * Registers a new user
     * @param request contains name, email, and password
     * @return success message
     */
    @PostMapping("/register")
public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
    System.out.println("🚀 [Controller] Incoming request:");
    System.out.println(" - Name: " + request.getName());
    System.out.println(" - Email: " + request.getEmail());
    System.out.println(" - Password: " + request.getPassword());
 
    String response = authService.register(request);
    return ResponseEntity.ok(response); // ✅ returns plain string
}
 
 
 
    /**
     * Logs in an existing user and returns JWT token
     * @param request contains email and password
     * @return JwtResponse with token, email, and role
     */
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        JwtResponse jwtResponse = authService.login(request);
        return ResponseEntity.ok(jwtResponse);
    }
}
 
//POST /api/auth/register   Register a new user RegisterRequest (name, email, password)
//POST /api/auth/login  Login existing user LoginRequest (email, password)