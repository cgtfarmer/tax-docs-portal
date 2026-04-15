package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.entity.Message;
import com.csci.tax_docs_portal.service.MessageService;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "*")
@Slf4j
public class MessageController {

  private final MessageService service;

  @Autowired
  public MessageController(MessageService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<Message>> index() {
    log.info("[MessageController#index]");
    return ResponseEntity.ok(service.list());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Message> show(@PathVariable UUID id) {
    log.info("[MessageController#show] id={}", id);
    return ResponseEntity.ok(service.get(id));
  }

  // 🔥 Conversation endpoint (this is the important one for your UI)
  @GetMapping("/conversation")
  public ResponseEntity<List<Message>> getConversation(
      @RequestParam UUID clientId,
      @RequestParam UUID accountantId
  ) {
    log.info(
        "[MessageController#getConversation] clientId={}, accountantId={}",
        clientId,
        accountantId
    );

    return ResponseEntity.ok(service.getConversation(clientId, accountantId));
  }

  @PostMapping
  public ResponseEntity<Message> create(@RequestBody Message request) {
    log.info("[MessageController#create] request={}", request);
    return ResponseEntity.status(201)
        .body(service.create(request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> destroy(@PathVariable UUID id) {
    log.info("[MessageController#destroy] id={}", id);
    service.destroy(id);
    return ResponseEntity.noContent()
        .build();
  }
}
