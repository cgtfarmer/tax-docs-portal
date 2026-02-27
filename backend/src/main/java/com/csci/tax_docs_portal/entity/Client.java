package com.csci.tax_docs_portal.entity;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Client {

  private UUID id;

  private String firstName;

  private String lastName;

  private String email;

  private String username;

  @JsonIgnore
  private String passwordHash;
}
