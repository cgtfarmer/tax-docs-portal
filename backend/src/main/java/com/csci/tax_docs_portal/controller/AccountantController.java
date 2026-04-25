package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.auth.AccountantResponse;
import com.csci.tax_docs_portal.entity.Accountant;
import com.csci.tax_docs_portal.service.AccountantService;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accountants")
@CrossOrigin(origins = "*")
@Slf4j
public class AccountantController {

  private final AccountantService accountantService;

  @Autowired
  public AccountantController(AccountantService accountantService) {
    this.accountantService = accountantService;
  }

  @GetMapping
  public ResponseEntity<List<AccountantResponse>> index() {
    log.info("[AccountantController#index]");

    List<AccountantResponse> response = this.accountantService.list()
        .stream()
        .map(
            a -> new AccountantResponse(
                a.getId(),
                a.getFirstName(),
                a.getLastName(),
                a.getEmail(),
                a.getUsername()
            )
        )
        .collect(Collectors.toList());

    return ResponseEntity.status(200)
        .body(response);
  }

  @PostMapping
  public ResponseEntity<AccountantResponse> create(
      @RequestBody Accountant request
  ) {
    log.info("[AccountantController#create] request={}", request);

    Accountant created = this.accountantService.create(request);

    AccountantResponse response = new AccountantResponse(
        created.getId(),
        created.getFirstName(),
        created.getLastName(),
        created.getEmail(),
        created.getUsername()
    );

    return ResponseEntity.status(201)
        .body(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<AccountantResponse> show(@PathVariable UUID id) {
    log.info("[AccountantController#show] id={}", id);

    Accountant a = this.accountantService.get(id);

    AccountantResponse response = new AccountantResponse(
        a.getId(),
        a.getFirstName(),
        a.getLastName(),
        a.getEmail(),
        a.getUsername()
    );

    return ResponseEntity.status(200)
        .body(response);
  }

  @PutMapping("/{id}")
  public ResponseEntity<AccountantResponse> update(
      @PathVariable UUID id,
      @RequestBody Accountant request
  ) {
    log.info("[AccountantController#update] id={}, request={}", id, request);

    request.setId(id);

    Accountant updated = this.accountantService.update(request);

    AccountantResponse response = new AccountantResponse(
        updated.getId(),
        updated.getFirstName(),
        updated.getLastName(),
        updated.getEmail(),
        updated.getUsername()
    );

    return ResponseEntity.status(200)
        .body(response);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> destroy(@PathVariable UUID id) {
    log.info("[AccountantController#destroy] id={}", id);

    this.accountantService.destroy(id);

    return ResponseEntity.status(204)
        .build();
  }
}
