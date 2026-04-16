package com.csci.tax_docs_portal.mapper;

import com.csci.tax_docs_portal.entity.Task;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class TasksMapper {

  public Task mapRowSetToTask(SqlRowSet rowSet) {
    rowSet.first();
    return this.mapRowSetEntryToTask(rowSet);
  }

  public List<Task> mapRowSetToTasks(SqlRowSet rowSet) {
    List<Task> tasks = new ArrayList<>();

    while (rowSet.next()) {
      Task task = this.mapRowSetEntryToTask(rowSet);
      tasks.add(task);
    }

    return tasks;
  }

  public Task mapRowSetEntryToTask(SqlRowSet rowSet) {
    return Task.builder()
        .id(UUID.fromString(rowSet.getString("id")))
        .clientId(UUID.fromString(rowSet.getString("client_id")))
        .accountantId(UUID.fromString(rowSet.getString("accountant_id")))
        .title(rowSet.getString("title"))
        .description(rowSet.getString("description"))
        .createdAt(
            rowSet.getTimestamp("created_at") != null
                ? rowSet.getTimestamp("created_at")
                    .toLocalDateTime()
                : null
        )
        .build();
  }
}
