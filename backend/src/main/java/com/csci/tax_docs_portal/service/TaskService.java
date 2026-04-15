package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Task;
import com.csci.tax_docs_portal.repository.TasksRepository;
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
}
