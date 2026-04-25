package com.csci.tax_docs_portal.auth;

import lombok.Data;

// what the frontend sends when someone tries to log in
@Data
public class LoginRequest {

  private String email;

  private String password;
}
