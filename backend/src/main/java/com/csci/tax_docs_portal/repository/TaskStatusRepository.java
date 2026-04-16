package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.TaskStatus;
import com.csci.tax_docs_portal.mapper.TaskStatusMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class TaskStatusRepository {

  private final NamedParameterJdbcTemplate jdbc;

  private final TaskStatusMapper mapper;

  public TaskStatusRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
    this.mapper = new TaskStatusMapper();
  }

  public List<TaskStatus> findAll() {
    String sql = "SELECT * FROM task_status";

    SqlRowSet results = jdbc.queryForRowSet(sql, new MapSqlParameterSource());

    return mapper.mapRowSetToTaskStatuses(results);
  }

  public TaskStatus findById(UUID id) {
    String sql = "SELECT * FROM task_status WHERE id = :id";

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToTaskStatus(results);
  }

  public List<TaskStatus> findByTaskId(UUID taskId) {
    String sql =
        "SELECT * FROM task_status WHERE task_id = :taskId ORDER BY updated_at DESC";

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("taskId", taskId);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToTaskStatuses(results);
  }

  public TaskStatus create(TaskStatus status) {
    String sql = """
        INSERT INTO task_status (task_id, task_status)
        VALUES (:taskId, :taskStatus)
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("taskId", status.getTaskId());
    params.addValue("taskStatus", status.getTaskStatus());

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbc.update(sql, params, keyHolder, new String[] {
        "id"
    });

    UUID id = keyHolder.getKeyAs(UUID.class);
    status.setId(id);

    return status;
  }

  public boolean destroy(UUID id) {
    String sql = "DELETE FROM task_status WHERE id = :id";

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    jdbc.update(sql, params);

    return true;
  }
}
