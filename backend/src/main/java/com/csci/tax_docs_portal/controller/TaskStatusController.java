package com.csci.tax_docs_portal.controller;

import com.csci.tax_docs_portal.entity.TaskStatus;
import com.csci.tax_docs_portal.service.TaskStatusService;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task-status")
@CrossOrigin(origins = "*")
@Slf4j
public class TaskStatusController {

  private final TaskStatusService service;

  @Autowired
  public TaskStatusController(TaskStatusService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<TaskStatus>> index() {
    log.info("[TaskStatusController#index]");
    return ResponseEntity.ok(service.list());
  }

  @GetMapping("/{id}")
  public ResponseEntity<TaskStatus> show(@PathVariable UUID id) {
    log.info("[TaskStatusController#show] id={}", id);
    return ResponseEntity.ok(service.get(id));
  }

  @GetMapping("/task/{taskId}")
  public ResponseEntity<List<TaskStatus>> getByTask(@PathVariable UUID taskId) {
    log.info("[TaskStatusController#getByTask] taskId={}", taskId);
    return ResponseEntity.ok(service.getByTask(taskId));
  }

  @PostMapping
  public ResponseEntity<TaskStatus> create(@RequestBody TaskStatus request) {
    log.info("[TaskStatusController#create] request={}", request);
    return ResponseEntity.status(201)
        .body(service.create(request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> destroy(@PathVariable UUID id) {
    log.info("[TaskStatusController#destroy] id={}", id);
    service.destroy(id);
    return ResponseEntity.noContent()
        .build();
  }
}
