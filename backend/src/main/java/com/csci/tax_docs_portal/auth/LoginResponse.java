package com.csci.tax_docs_portal.auth;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
// what the backend sends back after checking login
public class LoginResponse {

  private boolean success;

  private String role;

  private UUID id;

  private String firstName;

  private String lastName;

  private String message;
}
