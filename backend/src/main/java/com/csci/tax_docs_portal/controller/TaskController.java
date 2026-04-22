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
    return ResponseEntity.ok(this.taskService.list());
  }

  @PostMapping
  public ResponseEntity<Task> create(@RequestBody Task request) {
    log.info("[TaskController#create] request={}", request);
    return ResponseEntity.status(201)
        .body(this.taskService.create(request));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> show(@PathVariable UUID id) {
    log.info("[TaskController#show] id={}", id);
    return ResponseEntity.ok(this.taskService.get(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Task> update(
      @PathVariable UUID id,
      @RequestBody Task request
  ) {
    log.info("[TaskController#update] id={}, request={}", id, request);

    request.setId(id);

    return ResponseEntity.ok(this.taskService.update(request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> destroy(@PathVariable UUID id) {
    log.info("[TaskController#destroy] id={}", id);

    this.taskService.destroy(id); // soft delete

    return ResponseEntity.noContent()
        .build();
  }

  @PutMapping("/{id}/status")
  public ResponseEntity<Task> updateStatus(
      @PathVariable UUID id,
      @RequestParam String status
  ) {
    log.info("[TaskController#updateStatus] id={}, status={}", id, status);

    Task updated = this.taskService.updateStatus(id, status);

    return ResponseEntity.ok(updated);
  }

  @GetMapping("/active")
  public ResponseEntity<List<Task>> getActiveTasks() {
    log.info("[TaskController#getActiveTasks]");

    return ResponseEntity.ok(this.taskService.listActive());
  }
}
