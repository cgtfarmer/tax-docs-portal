package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.auth.ClientResponse;
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
  public ResponseEntity<List<ClientResponse>> index() {
    log.info("[ClientController#index]");

    List<ClientResponse> response = this.clientService.list()
        .stream()
        .map(this::toClientResponse)
        .toList();

    return ResponseEntity.status(200)
        .body(response);
  }

  @PostMapping
  public ResponseEntity<ClientResponse> create(@RequestBody Client request) {
    log.info("[ClientController#create]");

    Client client = this.clientService.create(request);

    return ResponseEntity.status(201)
        .body(toClientResponse(client));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ClientResponse> show(@PathVariable UUID id) {
    log.info("[ClientController#show] id={}", id);

    Client client = this.clientService.get(id);

    return ResponseEntity.status(200)
        .body(toClientResponse(client));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ClientResponse> update(
      @PathVariable UUID id,
      @RequestBody Client request
  ) {
    log.info("[ClientController#update] id={}", id);

    request.setId(id);

    Client client = this.clientService.update(request);

    return ResponseEntity.status(200)
        .body(toClientResponse(client));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> destroy(@PathVariable UUID id) {
    log.info("[ClientController#destroy] id={}", id);

    this.clientService.destroy(id);

    return ResponseEntity.status(204)
        .build();
  }

  @GetMapping("/accountant/{accountantId}/clients")
  public ResponseEntity<List<ClientResponse>> getClientsByAccountant(
      @PathVariable UUID accountantId
  ) {
    log.info(
        "[ClientController#getClientsByAccountant] accountantId={}",
        accountantId
    );

    List<ClientResponse> response =
        this.clientService.getClientsByAccountant(accountantId)
            .stream()
            .map(this::toClientResponse)
            .toList();

    return ResponseEntity.status(200)
        .body(response);
  }

  // mapping client entity to response object so passwordHash never gets sent
  // back
  private ClientResponse toClientResponse(Client client) {
    return new ClientResponse(
        client.getId(),
        client.getFirstName(),
        client.getLastName(),
        client.getEmail(),
        client.getUsername(),
        client.getAccountantId()
    );
  }
}
