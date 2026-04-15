package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.entity.Task;
import com.csci.tax_docs_portal.service.TaskService;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
@Slf4j
public class TaskController {

  private final TaskService taskService;

  @Autowired
  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  @GetMapping
  public ResponseEntity<List<Task>> index() {
    log.info("[TaskController#index]");

    List<Task> response = this.taskService.list();

    return ResponseEntity.status(200)
        .body(response);
  }

  @PostMapping
  public ResponseEntity<Task> create(@RequestBody Task request) {
    log.info("[TaskController#create] request={}", request);

    Task response = this.taskService.create(request);

    return ResponseEntity.status(201)
        .body(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> show(@PathVariable UUID id) {
    log.info("[TaskController#show] id={}", id);

    Task response = this.taskService.get(id);

    return ResponseEntity.status(200)
        .body(response);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Task> update(
      @PathVariable UUID id,
      @RequestBody Task request
  ) {
    log.info("[TaskController#update] id={}, request={}", id, request);

    request.setId(id);

    Task response = this.taskService.update(request);

    return ResponseEntity.status(200)
        .body(response);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> destroy(@PathVariable UUID id) {
    log.info("[TaskController#destroy] id={}", id);

    this.taskService.destroy(id);

    return ResponseEntity.status(204)
        .build();
  }
}
