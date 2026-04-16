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
public class Message {

  private UUID id;

  private UUID clientId;

  private UUID accountantId;

  private String senderType; // CLIENT or ACCOUNTANT

  private String messageText;

  private LocalDateTime createdAt;
}
