package com.csci.tax_docs_portal.auth;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

// response object for client endpoints without exposing password data
@Data
@AllArgsConstructor
public class ClientResponse {

  private UUID id;

  private String firstName;

  private String lastName;

  private String email;

  private String username;

  private UUID accountantId;
}
