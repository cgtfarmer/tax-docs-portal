package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.auth.LoginRequest;
import com.csci.tax_docs_portal.auth.LoginResponse;
import com.csci.tax_docs_portal.entity.Accountant;
import com.csci.tax_docs_portal.entity.Admin;
import com.csci.tax_docs_portal.entity.Client;
import com.csci.tax_docs_portal.repository.AccountantRepository;
import com.csci.tax_docs_portal.repository.AdminRepository;
import com.csci.tax_docs_portal.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  @Autowired
  private AdminRepository adminRepository;

  @Autowired
  private AccountantRepository accountantRepository;

  @Autowired
  private ClientRepository clientRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  // handles login by checking all 3 tables and figuring out what role they are
  public LoginResponse authenticate(LoginRequest request) {
    String email = request.getEmail();
    // decode base64 password before checking
    String decodedPassword = new String(
        java.util.Base64.getDecoder()
            .decode(request.getPassword())
    );

    // 1. check admin
    Admin admin = adminRepository.findByEmail(email);

    if (admin != null) {

      if (passwordEncoder.matches(decodedPassword, admin.getPasswordHash())) {
        return new LoginResponse(
            true,
            "ADMIN",
            admin.getId(),
            admin.getFirstName(),
            admin.getLastName(),
            "Login successful"
        );
      }
      return new LoginResponse(
          false,
          null,
          null,
          null,
          null,
          "Invalid password"
      );
    }

    // 2. check accountant
    Accountant accountant = accountantRepository.findByEmail(email);

    if (accountant != null) {

      if (
        passwordEncoder.matches(decodedPassword, accountant.getPasswordHash())
      ) {
        return new LoginResponse(
            true,
            "ACCOUNTANT",
            accountant.getId(),
            accountant.getFirstName(),
            accountant.getLastName(),
            "Login successful"
        );
      }
      return new LoginResponse(
          false,
          null,
          null,
          null,
          null,
          "Invalid password"
      );
    }

    // 3. check client
    Client client = clientRepository.findByEmail(email);

    if (client != null) {

      if (passwordEncoder.matches(decodedPassword, client.getPasswordHash())) {
        return new LoginResponse(
            true,
            "CLIENT",
            client.getId(),
            client.getFirstName(),
            client.getLastName(),
            "Login successful"
        );
      }
      return new LoginResponse(
          false,
          null,
          null,
          null,
          null,
          "Invalid password"
      );
    }

    return new LoginResponse(
        false,
        null,
        null,
        null,
        null,
        "No account found with that email"
    );
  }
}
