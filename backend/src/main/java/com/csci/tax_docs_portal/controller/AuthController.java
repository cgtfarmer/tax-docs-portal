package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.auth.LoginRequest;
import com.csci.tax_docs_portal.auth.LoginResponse;
import com.csci.tax_docs_portal.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin
public class AuthController {

  @Autowired
  private AuthService authService;

  // endpoint for logging in
  @PostMapping("/authorize")
  public ResponseEntity<LoginResponse> login(
      @RequestBody LoginRequest request
  ) {
    LoginResponse response = authService.authenticate(request);

    if (response.isSuccess()) {
      return ResponseEntity.ok(response);
    }

    return ResponseEntity.status(401)
        .body(response);
  }
}
