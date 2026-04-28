package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.Task;
import com.csci.tax_docs_portal.mapper.TaskMapper;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class TaskRepository {

  private final NamedParameterJdbcTemplate jdbc;

  private final TaskMapper mapper;

  public TaskRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
    this.mapper = new TaskMapper();
  }

  public List<Task> findAll() {
    String sql = """
        SELECT *
        FROM tasks
        ORDER BY created_at DESC
        """;

    SqlRowSet results = jdbc.queryForRowSet(sql, new MapSqlParameterSource());

    return mapper.mapRowSetToTasks(results);
  }

  public List<Task> findActive() {
    String sql = """
        SELECT *
        FROM tasks
        WHERE deleted_at IS NULL
        ORDER BY created_at DESC
        """;

    SqlRowSet results = jdbc.queryForRowSet(sql, new MapSqlParameterSource());

    return mapper.mapRowSetToTasks(results);
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

    return mapper.mapRowSetToTask(results);
  }

  public List<Task> findByClientId(UUID clientId) {
    String sql = """
        SELECT *
        FROM tasks
        WHERE client_id = :clientId
        AND deleted_at IS NULL
        ORDER BY created_at DESC
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("clientId", clientId);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToTasks(results);
  }

  public Task create(Task task) {
    String sql = """
        INSERT INTO tasks
        (
          client_id,
          accountant_id,
          title,
          task_description,
          task_status,
          created_at
        )
        VALUES
        (
          :clientId,
          :accountantId,
          :title,
          :description,
          CAST(:status AS task_status_enum),
          :createdAt
        )
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("clientId", task.getClientId());

    params.addValue("accountantId", task.getAccountantId());

    params.addValue("title", task.getTitle());

    params.addValue("description", task.getDescription());

    params.addValue("status", task.getTaskStatus());

    params.addValue("createdAt", task.getCreatedAt());

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbc.update(sql, params, keyHolder, new String[] {
        "id"
    });

    task.setId(keyHolder.getKeyAs(UUID.class));

    return task;
  }

  public Task update(Task task) {
    String sql = """
        UPDATE tasks
        SET title = :title,
            task_description = :description,
            task_status = CAST(:status AS task_status_enum),
            updated_at = :updatedAt
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("id", task.getId());

    params.addValue("title", task.getTitle());

    params.addValue("description", task.getDescription());

    params.addValue("status", task.getTaskStatus());

    params.addValue("updatedAt", task.getUpdatedAt());

    jdbc.update(sql, params);

    return task;
  }

  public void softDelete(UUID id) {
    String sql = """
        UPDATE tasks
        SET deleted_at = :deletedAt
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("id", id);

    params.addValue("deletedAt", LocalDateTime.now());

    jdbc.update(sql, params);
  }
}
