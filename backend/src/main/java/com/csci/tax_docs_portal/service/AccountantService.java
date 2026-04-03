package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.Accountant;
import com.csci.tax_docs_portal.repository.AccountantRepository;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AccountantService {

  private final AccountantRepository accountantRepository;

  @Autowired
  public AccountantService(AccountantRepository accountantRepository) {
    this.accountantRepository = accountantRepository;
  }

  public List<Accountant> list() {
    log.info("[AccountantService#list]");

    return this.accountantRepository.findAll();
  }

  public Accountant get(UUID id) {
    log.info("[AccountantService#get] id={}", id);

    return this.accountantRepository.findById(id);
  }

  public Accountant create(Accountant accountant) {
    log.info("[AccountantService#create] accountant={}", accountant);

    Accountant result = this.accountantRepository.create(accountant);

    return result;
  }

  public Accountant update(Accountant accountant) {
    log.info("[AccountantService#update] accountant={}", accountant);

    Accountant result = this.accountantRepository.update(accountant);

    return result;
  }

  public boolean destroy(UUID id) {
    log.info("[AccountantService#destroy] id={}", id);

    return this.accountantRepository.destroy(id);
  }
}
