package com.csci.tax_docs_portal.mapper;

import com.csci.tax_docs_portal.entity.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class DocumentMapper {

  public Document mapRowSetToDocument(SqlRowSet rowSet) {

    if (rowSet.next()) {
      return mapRowSetEntry(rowSet);
    }

    return null;
  }

  public List<Document> mapRowSetToDocuments(SqlRowSet rowSet) {
    List<Document> documents = new ArrayList<>();

    while (rowSet.next()) {
      documents.add(mapRowSetEntry(rowSet));
    }

    return documents;
  }

  public Document mapRowSetEntry(SqlRowSet rowSet) {
    return Document.builder()
        .id(UUID.fromString(rowSet.getString("id")))
        .clientId(UUID.fromString(rowSet.getString("client_id")))
        .storageKey(rowSet.getString("storage_key"))
        .build();
  }
}
