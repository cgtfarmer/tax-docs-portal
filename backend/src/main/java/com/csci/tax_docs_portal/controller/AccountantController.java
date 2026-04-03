package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.entity.Accountant;
import com.csci.tax_docs_portal.service.AccountantService;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<List<Accountant>> index() {
    log.info("[AccountantController#index]");

    List<Accountant> response = this.accountantService.list();

    return ResponseEntity.status(200)
        .body(response);
  }

  @PostMapping
  public ResponseEntity<Accountant> create(@RequestBody Accountant request) {
    log.info("[AccountantController#create] request={}", request);

    Accountant response = this.accountantService.create(request);

    return ResponseEntity.status(201)
        .body(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Accountant> show(@PathVariable UUID id) {
    log.info("[AccountantController#show] id={}", id);

    Accountant response = this.accountantService.get(id);

    return ResponseEntity.status(200)
        .body(response);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Accountant> update(
      @PathVariable UUID id,
      @RequestBody Accountant request
  ) {
    log.info("[AccountantController#update] id={}, request={}", id, request);

    request.setId(id);

    Accountant response = this.accountantService.update(request);

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
