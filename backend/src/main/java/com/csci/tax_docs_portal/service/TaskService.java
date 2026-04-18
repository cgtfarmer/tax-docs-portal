package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Task;
import com.csci.tax_docs_portal.repository.TasksRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TaskService {

  private final TasksRepository tasksRepository;

  @Autowired
  public TaskService(TasksRepository tasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  public List<Task> list() {
    log.info("[TaskService#list]");
    return this.tasksRepository.findAll();
  }

  public Task get(UUID id) {
    log.info("[TaskService#get] id={}", id);
    return this.tasksRepository.findById(id);
  }

  public Task create(Task task) {
    log.info("[TaskService#create] task={}", task);
    return this.tasksRepository.create(task);
  }

  public Task update(Task task) {
    log.info("[TaskService#update] task={}", task);
    return this.tasksRepository.update(task);
  }

  public boolean destroy(UUID id) {
    log.info("[TaskService#destroy] id={}", id);
    return this.tasksRepository.destroy(id);
  }

  // -------------------------
  // New Combined Functionality
  // -------------------------

  public Task updateStatus(UUID taskId, String status) {
    log.info("[TaskService#updateStatus] taskId={}, status={}", taskId, status);

    Task task = this.tasksRepository.findById(taskId);

    if (task == null) {
      return null;
    }

    task.setTaskStatus(status);
    task.setUpdatedAt(LocalDateTime.now());

    return this.tasksRepository.update(task);
  }

  public boolean softDelete(UUID taskId) {
    log.info("[TaskService#softDelete] taskId={}", taskId);

    Task task = this.tasksRepository.findById(taskId);

    if (task == null) {
      return false;
    }

    task.setDeletedAt(LocalDateTime.now());
    task.setUpdatedAt(LocalDateTime.now());

    this.tasksRepository.update(task);
    return true;
  }

  public List<Task> listActive() {
    log.info("[TaskService#listActive]");

    List<Task> tasks = this.tasksRepository.findAll();
    return tasks.stream()
        .filter(task -> task.getDeletedAt() == null)
        .toList();
  }
}
