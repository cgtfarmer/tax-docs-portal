package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.Accountant;
import com.csci.tax_docs_portal.mapper.AccountantMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class AccountantRepository {

  private final NamedParameterJdbcTemplate jdbc;

  private final AccountantMapper mapper;

  public AccountantRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
    this.mapper = new AccountantMapper();
  }

  public List<Accountant> findAll() {
    String sql = """
        SELECT *
        FROM accountants
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    List<Accountant> accountants = this.mapper.mapRowSetToAccountants(results);

    return accountants;
  }

  public Accountant findById(UUID id) {
    String sql = """
        SELECT *
        FROM accountants
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    Accountant accountant = this.mapper.mapRowSetToAccountant(results);

    return accountant;
  }

  public Accountant create(Accountant accountant) {
    String sql =
        """
            INSERT INTO accountants (first_name, last_name, email, username, password_hash)
            VALUES (:firstName, :lastName, :email, :username, :password)
            """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("firstName", accountant.getFirstName());
    params.addValue("lastName", accountant.getLastName());
    params.addValue("email", accountant.getEmail());
    params.addValue("username", accountant.getUsername());
    params.addValue("password", accountant.getPasswordHash());

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbc.update(sql, params, keyHolder, new String[] {
        "id"
    });

    UUID id = keyHolder.getKeyAs(UUID.class);

    accountant.setId(id);

    return accountant;
  }

  public Accountant update(Accountant accountant) {
    String sql = """
        UPDATE accountants
        SET first_name = :firstName,
            last_name = :lastName,
            email = :email,
            username = :username,
            password_hash = :password
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", accountant.getId());
    params.addValue("firstName", accountant.getFirstName());
    params.addValue("lastName", accountant.getLastName());
    params.addValue("email", accountant.getEmail());
    params.addValue("username", accountant.getUsername());
    params.addValue("password", accountant.getPasswordHash());

    jdbc.update(sql, params);

    return accountant;
  }

  public boolean destroy(UUID id) {
    String sql = """
        DELETE FROM accountants
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    jdbc.update(sql, params);

    return true;
  }
}
