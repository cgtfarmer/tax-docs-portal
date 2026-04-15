package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Admin;
import com.csci.tax_docs_portal.repository.AdminRepository;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdminService {

  private final AdminRepository repository;

  @Autowired
  public AdminService(AdminRepository repository) {
    this.repository = repository;
  }

  public List<Admin> list() {
    log.info("[AdminService#list]");
    return repository.findAll();
  }

  public Admin get(UUID id) {
    log.info("[AdminService#get] id={}", id);
    return repository.findById(id);
  }

  public Admin create(Admin admin) {
    log.info("[AdminService#create] admin={}", admin);
    return repository.create(admin);
  }

  public Admin update(Admin admin) {
    log.info("[AdminService#update] admin={}", admin);
    return repository.update(admin);
  }

  public boolean destroy(UUID id) {
    log.info("[AdminService#destroy] id={}", id);
    return repository.destroy(id);
  }
}
