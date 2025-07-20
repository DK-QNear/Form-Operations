package com.form.formoperation.DTO;
import com.form.formoperation.model.Role;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
