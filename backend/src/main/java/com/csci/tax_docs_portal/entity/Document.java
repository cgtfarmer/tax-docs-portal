package com.csci.tax_docs_portal.entity;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

  private UUID id;

  private UUID clientId;

  private String storageKey;
}
