package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.User;
import com.csci.tax_docs_portal.mapper.UserMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

  private final NamedParameterJdbcTemplate jdbc;

  private final UserMapper mapper;

  public UserRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
    this.mapper = new UserMapper();
  }

  public List<User> findAll() {
    String sql = """
        SELECT *
        FROM users
        """;

    SqlRowSet results = jdbc.queryForRowSet(sql, Map.of());

    List<User> users = this.mapper.mapRowSetToUsers(results);

    return users;
  }

  public User findById(UUID id) {
    String sql = """
        SELECT *
        FROM users
        WHERE id = :id
        """;

    SqlRowSet results = jdbc.queryForRowSet(sql, Map.of("id", id));

    User user = this.mapper.mapRowSetToUser(results);

    return user;
  }

  public int create(User user) {
    // TODO: Finish & test

    String sql = """
        INSERT INTO users (first_name, last_name, age, weight, smoker)
        VALUES (:firstName, :lastName, :age, :weight, :smoker)
        """;

    Map<String, String> params = new HashMap<>();
    params.put("firstName", user.getFirstName());
    params.put("lastName", user.getLastName());
    params.put("age", Integer.toString(user.getAge()));
    params.put("weight", Float.toString(user.getWeight()));
    params.put("smoker", Boolean.toString(user.isSmoker()));

    return jdbc.update(sql, params);
  }

  public int update(User user) {
    // TODO: Finish & test

    String sql = """
        update users
        set first_name = :firstName,
          last_name = :lastName,
          age = :age,
          weight = :weight,
          smoker = :smoker
        where id = :id
        """;

    Map<String, String> params = new HashMap<>();
    params.put("firstName", user.getFirstName());
    params.put("lastName", user.getLastName());
    params.put("age", Integer.toString(user.getAge()));
    params.put("weight", Float.toString(user.getWeight()));
    params.put("smoker", Boolean.toString(user.isSmoker()));

    return jdbc.update(sql, params);
  }

  public int delete(UUID id) {
    // TODO: Finish & test

    String sql = """
        DELETE FROM users
        WHERE id = :id
        """;

    return jdbc.update(sql, Map.of("id", id));
  }
}
