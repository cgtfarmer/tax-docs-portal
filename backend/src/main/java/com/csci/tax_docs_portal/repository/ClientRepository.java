package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.Client;
import com.csci.tax_docs_portal.mapper.ClientMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class ClientRepository {

  private final NamedParameterJdbcTemplate jdbc;

  private final ClientMapper mapper;

  public ClientRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
    this.mapper = new ClientMapper();
  }

  public List<Client> findAll() {
    String sql = """
        SELECT *
        FROM clients
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    List<Client> clients = this.mapper.mapRowSetToClients(results);

    return clients;
  }

  public Client findById(UUID id) {
    String sql = """
        SELECT *
        FROM clients
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    Client client = this.mapper.mapRowSetToClient(results);

    return client;
  }

  public Client create(Client client) {
    String sql =
        """
            INSERT INTO clients (first_name, last_name, email, username, password_hash)
            VALUES (:firstName, :lastName, :email, :username, :password, :accountantId)
            """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("firstName", client.getFirstName());
    params.addValue("lastName", client.getLastName());
    params.addValue("email", client.getEmail());
    params.addValue("username", client.getUsername());
    params.addValue("password", client.getPasswordHash());
    params.addValue("accountantId", client.getAccountantId());

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbc.update(sql, params, keyHolder, new String[] {
        "id"
    });

    UUID id = keyHolder.getKeyAs(UUID.class);

    client.setId(id);

    return client;
  }

  public Client update(Client client) {
    String sql = """
        update clients
        set first_name = :firstName,
          last_name = :lastName,
          email = :email,
          username = :username,
          password_hash = :password,
          accountant_id = :accountantId
        where id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", client.getId());
    params.addValue("firstName", client.getFirstName());
    params.addValue("lastName", client.getLastName());
    params.addValue("email", client.getEmail());
    params.addValue("username", client.getUsername());
    params.addValue("password", client.getPasswordHash());
    params.addValue("accountantId", client.getAccountantId());

    jdbc.update(sql, params);

    return client;
  }

  public boolean destroy(UUID id) {
    String sql = """
        DELETE FROM clients
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    jdbc.update(sql, params);

    return true;
  }

  public List<Client> findUnassigned() {
    String sql = """
        SELECT *
        FROM clients
        WHERE accountant_id IS NULL
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToClients(results);
  }

  public List<Client> findByAccountantId(UUID accountantId) {
    String sql = """
        SELECT *
        FROM clients
        WHERE accountant_id = :accountantId
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("accountantId", accountantId);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToClients(results);
  }

  /*
   * public List<Client> findUnassigned() { String sql = """ SELECT * FROM
   * clients WHERE accountant_id IS NULL """; MapSqlParameterSource params = new
   * MapSqlParameterSource(); SqlRowSet results = jdbc.queryForRowSet(sql,
   * params); return mapper.mapRowSetToClients(results); }
   */
}
