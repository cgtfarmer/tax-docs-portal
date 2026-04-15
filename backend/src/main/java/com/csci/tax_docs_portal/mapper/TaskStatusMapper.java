package com.csci.tax_docs_portal.mapper;

import com.csci.tax_docs_portal.entity.TaskStatus;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class TaskStatusMapper {

  public TaskStatus mapRowSetToTaskStatus(SqlRowSet rowSet) {

    if (rowSet.next()) {
      return this.mapRowSetEntryToTaskStatus(rowSet);
    }
    return null;
  }

  public List<TaskStatus> mapRowSetToTaskStatuses(SqlRowSet rowSet) {
    List<TaskStatus> statuses = new ArrayList<>();

    while (rowSet.next()) {
      statuses.add(this.mapRowSetEntryToTaskStatus(rowSet));
    }

    return statuses;
  }

  public TaskStatus mapRowSetEntryToTaskStatus(SqlRowSet rowSet) {
    return TaskStatus.builder()
        .id(UUID.fromString(rowSet.getString("id")))
        .taskId(UUID.fromString(rowSet.getString("task_id")))
        .taskStatus(rowSet.getString("task_status"))
        .updatedAt(
            rowSet.getTimestamp("updated_at") != null
                ? rowSet.getTimestamp("updated_at")
                    .toLocalDateTime()
                : null
        )
        .build();
  }
}
