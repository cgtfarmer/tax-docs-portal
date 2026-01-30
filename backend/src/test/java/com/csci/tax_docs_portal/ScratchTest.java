package com.csci.tax_docs_portal;

import com.csci.tax_docs_portal.entity.User;
import com.csci.tax_docs_portal.repository.UserRepository;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ScratchTest {

  private final UserRepository repository;

  @Autowired
  public ScratchTest(UserRepository repository) {
    this.repository = repository;
  }

  @Test
  void test1() {
    User u = this.repository
        .findById(UUID.fromString("337aaa95-3722-4abe-9bb2-3a51bbf2c5a0"));

    System.out.println("--- 000 ---");

    System.out.println(u);
  }

  @Test
  void test2() {
    List<User> users = this.repository.findAll();

    System.out.println("--- 000 ---");

    System.out.println(users.size());
  }
}
