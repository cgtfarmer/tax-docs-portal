package com.csci.tax_docs_portal.service;

import com.csci.tax_docs_portal.entity.User;
import com.csci.tax_docs_portal.repository.UserRepository;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<User> list() {
    log.info("[UserService#list]");

    return this.userRepository.findAll();
  }

  public User get(UUID id) {
    log.info("[UserService#get] id={}", id);

    return this.userRepository.findById(id);
  }

  public User create(User user) {
    log.info("[UserService#create] user={}", user);

    User result = this.userRepository.create(user);

    return result;
  }

  public User update(User user) {
    log.info("[UserService#update] user={}", user);

    User result = this.userRepository.update(user);

    return result;
  }

  public boolean destroy(UUID id) {
    log.info("[UserService#destroy] id={}", id);

    return this.userRepository.destroy(id);
  }
}
