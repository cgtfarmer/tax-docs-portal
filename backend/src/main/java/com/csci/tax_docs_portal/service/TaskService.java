package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Task;
import com.csci.tax_docs_portal.repository.TaskRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

  private final TaskRepository taskRepository;

  public TaskService(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  public List<Task> list() {
    return taskRepository.findAll();
  }

  public List<Task> listActive() {
    return taskRepository.findActive();
  }

  public Task get(UUID id) {
    return taskRepository.findById(id);
  }

  public List<Task> getByClient(UUID clientId) {
    return taskRepository.findByClientId(clientId);
  }

  public Task create(Task task) {
    return taskRepository.create(task);
  }

  public Task update(Task task) {
    task.setUpdatedAt(LocalDateTime.now());

    return taskRepository.update(task);
  }

  public void destroy(UUID id) {
    taskRepository.softDelete(id);
  }

  public Task updateStatus(UUID id, String status) {
    Task task = taskRepository.findById(id);

    task.setTaskStatus(status);

    task.setUpdatedAt(LocalDateTime.now());

    return taskRepository.update(task);
  }
}
