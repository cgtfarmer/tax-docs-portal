package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.Task;
import com.csci.tax_docs_portal.mapper.TasksMapper;
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

    SqlRowSet results = jdbc.queryForRowSet(sql, new MapSqlParameterSource());
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
    String sql =
        """
            INSERT INTO tasks (client_id, accountant_id, title, task_description, task_status, created_at)
            VALUES (:clientId, :accountantId, :title, :description, :status, :createdAt)
            """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("clientId", task.getClientId());
    params.addValue("accountantId", task.getAccountantId());
    params.addValue("title", task.getTitle());
    params.addValue("description", task.getDescription());
    params.addValue("status", task.getTaskStatus());
    params.addValue(
        "createdAt",
        task.getCreatedAt() != null
            ? task.getCreatedAt()
            : LocalDateTime.now()
    );

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
            task_description = :description,
            task_status = :status,
            updated_at = :updatedAt,
            deleted_at = :deletedAt
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", task.getId());
    params.addValue("clientId", task.getClientId());
    params.addValue("accountantId", task.getAccountantId());
    params.addValue("title", task.getTitle());
    params.addValue("description", task.getDescription());
    params.addValue("status", task.getTaskStatus());
    params.addValue("updatedAt", task.getUpdatedAt());
    params.addValue("deletedAt", task.getDeletedAt());

    jdbc.update(sql, params);

    return task;
  }

  // Soft delete instead of hard delete
  public boolean destroy(UUID id) {
    String sql = """
        UPDATE tasks
        SET deleted_at = :deletedAt
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);
    params.addValue("deletedAt", LocalDateTime.now());

    jdbc.update(sql, params);

    return true;
  }
}
