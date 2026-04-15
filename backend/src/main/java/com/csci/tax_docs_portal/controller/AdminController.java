package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.entity.Admin;
import com.csci.tax_docs_portal.service.AdminService;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "*")
@Slf4j
public class AdminController {

  private final AdminService service;

  @Autowired
  public AdminController(AdminService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<Admin>> index() {
    log.info("[AdminController#index]");
    return ResponseEntity.ok(service.list());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Admin> show(@PathVariable UUID id) {
    log.info("[AdminController#show] id={}", id);

    Admin response = this.service.get(id);

    return ResponseEntity.status(200)
        .body(response);
  }

  @PostMapping
  public ResponseEntity<Admin> create(@RequestBody Admin request) {
    log.info("[AdminController#create] request={}", request);
    return ResponseEntity.status(201)
        .body(service.create(request));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Admin> update(
      @PathVariable UUID id,
      @RequestBody Admin request
  ) {
    log.info("[AdminController#update] id={}, request={}", id, request);

    request.setId(id);

    return ResponseEntity.ok(service.update(request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> destroy(@PathVariable UUID id) {
    log.info("[AdminController#destroy] id={}", id);

    service.destroy(id);

    return ResponseEntity.noContent()
        .build();
  }
}
