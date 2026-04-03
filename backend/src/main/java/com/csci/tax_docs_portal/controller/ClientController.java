package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.entity.Client;
import com.csci.tax_docs_portal.service.ClientService;
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
@RequestMapping("/clients")
@CrossOrigin(origins = "*")
@Slf4j
public class ClientController {

  private final ClientService clientService;

  @Autowired
  public ClientController(ClientService clientService) {
    this.clientService = clientService;
  }

  @GetMapping
  public ResponseEntity<List<Client>> index() {
    log.info("[ClientController#index]");

    List<Client> response = this.clientService.list();

    return ResponseEntity.status(200)
        .body(response);
  }

  @PostMapping
  public ResponseEntity<Client> create(@RequestBody Client request) {
    log.info("[ClientController#create] request={}", request);

    Client response = this.clientService.create(request);

    return ResponseEntity.status(201)
        .body(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Client> show(@PathVariable UUID id) {
    log.info("[ClientController#show] id={}", id);

    Client response = this.clientService.get(id);

    return ResponseEntity.status(200)
        .body(response);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Client> update(
      @PathVariable UUID id,
      @RequestBody Client request
  ) {
    log.info("[ClientController#update] id={}, request={}", id, request);

    request.setId(id);

    Client response = this.clientService.update(request);

    return ResponseEntity.status(200)
        .body(response);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> destroy(@PathVariable UUID id) {
    log.info("[ClientController#destroy] id={}", id);

    this.clientService.destroy(id);

    return ResponseEntity.status(204)
        .build();
  }

  @GetMapping("/accountant/{accountantId}/clients")
  public ResponseEntity<List<Client>> getClientsByAccountant(
      @PathVariable UUID accountantId
  ) {
    log.info(
        "[ClientController#getClientsByAccountant] accountantId={}",
        accountantId
    );

    List<Client> response =
        this.clientService.getClientsByAccountant(accountantId);

    return ResponseEntity.status(200)
        .body(response);
  }

  /*
   * @GetMapping("/accountant/null") public ResponseEntity<List<Client>>
   * unassignedClients() { log.info("[ClientController#unassignedClients]");
   * List<Client> response = clientService.getUnassignedClients(); return
   * ResponseEntity.ok(response); }
   */
}
