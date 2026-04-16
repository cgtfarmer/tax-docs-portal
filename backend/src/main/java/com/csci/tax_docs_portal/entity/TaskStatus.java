package com.csci.tax_docs_portal.entity;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskStatus {

  private UUID id;

  private UUID taskId;

  private String taskStatus;

  private LocalDateTime updatedAt;
}
