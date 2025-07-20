package com.form.formoperation.service;

import com.form.formoperation.DTO.JwtResponse;
import com.form.formoperation.DTO.LoginRequest;
import com.form.formoperation.DTO.RegisterRequest;

public interface AuthService {
    String register(RegisterRequest request);
    JwtResponse login(LoginRequest request);
}
