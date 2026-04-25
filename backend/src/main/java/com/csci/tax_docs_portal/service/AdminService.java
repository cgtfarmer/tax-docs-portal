package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Admin;
import com.csci.tax_docs_portal.repository.AdminRepository;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdminService {

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  private final AdminRepository adminRepository;

  @Autowired
  public AdminService(AdminRepository adminRepository) {
    this.adminRepository = adminRepository;
  }

  public List<Admin> list() {
    log.info("[AdminService#list]");
    return adminRepository.findAll();
  }

  public Admin get(UUID id) {
    log.info("[AdminService#get] id={}", id);
    return adminRepository.findById(id);
  }

  public Admin create(Admin admin) {
    log.info("[AdminService#create] admin={}", admin);

    // hashing password before saving so we never store plain text
    admin.setPasswordHash(passwordEncoder.encode(admin.getPasswordHash()));

    Admin result = adminRepository.create(admin);

    return result;
  }

  public Admin update(Admin admin) {
    log.info("[AdminService#update] admin={}", admin);
    return adminRepository.update(admin);
  }

  public boolean destroy(UUID id) {
    log.info("[AdminService#destroy] id={}", id);
    return adminRepository.destroy(id);
  }
}
