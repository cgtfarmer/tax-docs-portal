package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.TaskStatus;
import com.csci.tax_docs_portal.repository.TaskStatusRepository;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TaskStatusService {

  private final TaskStatusRepository repository;

  @Autowired
  public TaskStatusService(TaskStatusRepository repository) {
    this.repository = repository;
  }

  public List<TaskStatus> list() {
    log.info("[TaskStatusService#list]");
    return repository.findAll();
  }

  public TaskStatus get(UUID id) {
    log.info("[TaskStatusService#get] id={}", id);
    return repository.findById(id);
  }

  public List<TaskStatus> getByTask(UUID taskId) {
    log.info("[TaskStatusService#getByTask] taskId={}", taskId);
    return repository.findByTaskId(taskId);
  }

  public TaskStatus create(TaskStatus status) {
    log.info("[TaskStatusService#create] status={}", status);
    return repository.create(status);
  }

  public boolean destroy(UUID id) {
    log.info("[TaskStatusService#destroy] id={}", id);
    return repository.destroy(id);
  }
}
