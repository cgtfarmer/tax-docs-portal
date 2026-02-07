package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.User;
import com.csci.tax_docs_portal.mapper.UserMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
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

    MapSqlParameterSource params = new MapSqlParameterSource();

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    List<User> users = this.mapper.mapRowSetToUsers(results);

    return users;
  }

  public User findById(UUID id) {
    String sql = """
        SELECT *
        FROM users
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    User user = this.mapper.mapRowSetToUser(results);

    return user;
  }

  public User create(User user) {
    String sql = """
        INSERT INTO users (first_name, last_name, age, weight, smoker)
        VALUES (:firstName, :lastName, :age, :weight, :smoker)
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("firstName", user.getFirstName());
    params.addValue("lastName", user.getLastName());
    params.addValue("age", user.getAge());
    params.addValue("weight", user.getWeight());
    params.addValue("smoker", user.isSmoker());

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbc.update(sql, params, keyHolder, new String[] {
        "id"
    });

    UUID id = keyHolder.getKeyAs(UUID.class);

    user.setId(id);

    return user;
  }

  public User update(User user) {
    String sql = """
        update users
        set first_name = :firstName,
          last_name = :lastName,
          age = :age,
          weight = :weight,
          smoker = :smoker
        where id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", user.getId());
    params.addValue("firstName", user.getFirstName());
    params.addValue("lastName", user.getLastName());
    params.addValue("age", user.getAge());
    params.addValue("weight", user.getWeight());
    params.addValue("smoker", user.isSmoker());

    jdbc.update(sql, params);

    return user;
  }

  public boolean destroy(UUID id) {
    String sql = """
        DELETE FROM users
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    jdbc.update(sql, params);

    return true;
  }
}
