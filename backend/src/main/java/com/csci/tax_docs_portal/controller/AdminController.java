package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.auth.AdminResponse;
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
  public ResponseEntity<List<AdminResponse>> index() {
    log.info("[AdminController#index]");

    List<AdminResponse> response = service.list()
        .stream()
        .map(this::toAdminResponse)
        .toList();

    return ResponseEntity.ok(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<AdminResponse> show(@PathVariable UUID id) {
    log.info("[AdminController#show] id={}", id);

    Admin admin = this.service.get(id);

    return ResponseEntity.status(200)
        .body(toAdminResponse(admin));
  }

  @PostMapping
  public ResponseEntity<AdminResponse> create(@RequestBody Admin request) {
    log.info("[AdminController#create]");

    Admin admin = service.create(request);

    return ResponseEntity.status(201)
        .body(toAdminResponse(admin));
  }

  @PutMapping("/{id}")
  public ResponseEntity<AdminResponse> update(
      @PathVariable UUID id,
      @RequestBody Admin request
  ) {
    log.info("[AdminController#update] id={}", id);

    request.setId(id);

    Admin admin = service.update(request);

    return ResponseEntity.ok(toAdminResponse(admin));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> destroy(@PathVariable UUID id) {
    log.info("[AdminController#destroy] id={}", id);

    service.destroy(id);

    return ResponseEntity.noContent()
        .build();
  }

  // mapping admin entity to response object so passwordHash never gets sent
  // back
  private AdminResponse toAdminResponse(Admin admin) {
    return new AdminResponse(
        admin.getId(),
        admin.getFirstName(),
        admin.getLastName(),
        admin.getEmail(),
        admin.getUsername()
    );
  }
}
