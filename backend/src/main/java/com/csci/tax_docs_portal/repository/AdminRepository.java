package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.Admin;
import com.csci.tax_docs_portal.mapper.AdminMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepository {

  private final NamedParameterJdbcTemplate jdbc;

  private final AdminMapper mapper;

  public AdminRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
    this.mapper = new AdminMapper();
  }

  // same idea but for admins so login can check every role in the backend
  public Admin findByEmail(String email) {
    String sql = """
        SELECT *
        FROM admins
        WHERE LOWER(email) = LOWER(:email)
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("email", email);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToAdmin(results);
  }

  public List<Admin> findAll() {
    String sql = "SELECT * FROM admins";

    SqlRowSet results = jdbc.queryForRowSet(sql, new MapSqlParameterSource());

    return mapper.mapRowSetToAdmins(results);
  }

  public Admin findById(UUID id) {
    String sql = "SELECT * FROM admins WHERE id = :id";

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToAdmin(results);
  }

  public Admin create(Admin admin) {
    String sql =
        """
            INSERT INTO admins (first_name, last_name, email, username, password_hash)
            VALUES (:firstName, :lastName, :email, :username, :passwordHash)
            """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("firstName", admin.getFirstName());
    params.addValue("lastName", admin.getLastName());
    params.addValue("email", admin.getEmail());
    params.addValue("username", admin.getUsername());
    params.addValue("passwordHash", admin.getPasswordHash());

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbc.update(sql, params, keyHolder, new String[] {
        "id"
    });

    UUID id = keyHolder.getKeyAs(UUID.class);
    admin.setId(id);

    return admin;
  }

  public Admin update(Admin admin) {
    String sql = """
        UPDATE admins
        SET first_name = :firstName,
            last_name = :lastName,
            email = :email,
            username = :username,
            password_hash = :passwordHash
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", admin.getId());
    params.addValue("firstName", admin.getFirstName());
    params.addValue("lastName", admin.getLastName());
    params.addValue("email", admin.getEmail());
    params.addValue("username", admin.getUsername());
    params.addValue("passwordHash", admin.getPasswordHash());

    jdbc.update(sql, params);

    return admin;
  }

  public boolean destroy(UUID id) {
    String sql = "DELETE FROM admins WHERE id = :id";

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    jdbc.update(sql, params);

    return true;
  }
}
