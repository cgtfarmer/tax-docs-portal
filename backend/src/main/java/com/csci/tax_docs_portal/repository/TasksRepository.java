package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.Task;
import com.csci.tax_docs_portal.mapper.TasksMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class TasksRepository {

  private final NamedParameterJdbcTemplate jdbc;

  private final TasksMapper mapper;

  public TasksRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
    this.mapper = new TasksMapper();
  }

  public List<Task> findAll() {
    String sql = """
        SELECT *
        FROM tasks
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return this.mapper.mapRowSetToTasks(results);
  }

  public Task findById(UUID id) {
    String sql = """
        SELECT *
        FROM tasks
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return this.mapper.mapRowSetToTask(results);
  }

  public Task create(Task task) {
    String sql = """
        INSERT INTO tasks (client_id, accountant_id, title, description)
        VALUES (:clientId, :accountantId, :title, :description)
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("clientId", task.getClientId());
    params.addValue("accountantId", task.getAccountantId());
    params.addValue("title", task.getTitle());
    params.addValue("description", task.getDescription());

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbc.update(sql, params, keyHolder, new String[] {
        "id"
    });

    UUID id = keyHolder.getKeyAs(UUID.class);
    task.setId(id);

    return task;
  }

  public Task update(Task task) {
    String sql = """
        UPDATE tasks
        SET client_id = :clientId,
            accountant_id = :accountantId,
            title = :title,
            description = :description
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", task.getId());
    params.addValue("clientId", task.getClientId());
    params.addValue("accountantId", task.getAccountantId());
    params.addValue("title", task.getTitle());
    params.addValue("description", task.getDescription());

    jdbc.update(sql, params);

    return task;
  }

  public boolean destroy(UUID id) {
    String sql = """
        DELETE FROM tasks
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    jdbc.update(sql, params);

    return true;
  }
}
