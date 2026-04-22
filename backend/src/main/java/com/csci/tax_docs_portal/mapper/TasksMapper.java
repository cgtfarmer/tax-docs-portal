package com.csci.tax_docs_portal.mapper;

import com.csci.tax_docs_portal.entity.Task;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class TasksMapper {

  public Task mapRowSetToTask(SqlRowSet rowSet) {

    if (rowSet.next()) {
      return this.mapRowSetEntryToTask(rowSet);
    }
    return null;
  }

  public List<Task> mapRowSetToTasks(SqlRowSet rowSet) {
    List<Task> tasks = new ArrayList<>();

    while (rowSet.next()) {
      tasks.add(this.mapRowSetEntryToTask(rowSet));
    }

    return tasks;
  }

  public Task mapRowSetEntryToTask(SqlRowSet rowSet) {
    return Task.builder()
        .id(UUID.fromString(rowSet.getString("id")))
        .clientId(UUID.fromString(rowSet.getString("client_id")))
        .accountantId(UUID.fromString(rowSet.getString("accountant_id")))
        .title(rowSet.getString("title"))
        .description(rowSet.getString("task_description")) // match DB column
        .taskStatus(rowSet.getString("task_status"))
        .createdAt(
            rowSet.getTimestamp("created_at") != null
                ? rowSet.getTimestamp("created_at")
                    .toLocalDateTime()
                : null
        )
        .updatedAt(
            rowSet.getTimestamp("updated_at") != null
                ? rowSet.getTimestamp("updated_at")
                    .toLocalDateTime()
                : null
        )
        .deletedAt(
            rowSet.getTimestamp("deleted_at") != null
                ? rowSet.getTimestamp("deleted_at")
                    .toLocalDateTime()
                : null
        )
        .build();
  }
}
