package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.Document;
import com.csci.tax_docs_portal.mapper.DocumentMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class DocumentRepository {

  private final NamedParameterJdbcTemplate jdbc;

  private final DocumentMapper mapper;

  public DocumentRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
    this.mapper = new DocumentMapper();
  }

  public Document findById(UUID id) {
    String sql = """
        SELECT *
        FROM documents
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("id", id);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToDocument(results);
  }

  public List<Document> findAllByClientId(UUID clientId) {
    String sql = """
        SELECT *
        FROM documents
        WHERE client_id = :clientId
        ORDER BY id DESC
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("clientId", clientId);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    List<Document> documents = new ArrayList<>();

    while (results.next()) {
      Document document = Document.builder()
          .id(UUID.fromString(results.getString("id")))
          .clientId(UUID.fromString(results.getString("client_id")))
          .storageKey(results.getString("storage_key"))
          .build();

      documents.add(document);
    }

    return documents;
  }

  public Document findByStorageKey(String storageKey) {
    String sql = """
        SELECT *
        FROM documents
        WHERE storage_key = :storageKey
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("storageKey", storageKey);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToDocument(results);
  }

  public Document findByStorageKeyPrefix(String prefix) {
    String sql = """
        SELECT *
        FROM documents
        WHERE storage_key LIKE :prefix
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("prefix", prefix + "%");

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToDocument(results);
  }

  public Document create(Document document) {
    String sql = """
        INSERT INTO documents
        (client_id, storage_key)
        VALUES
        (:clientId, :storageKey)
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("clientId", document.getClientId());

    params.addValue("storageKey", document.getStorageKey());

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbc.update(sql, params, keyHolder, new String[] {
        "id"
    });

    document.setId(keyHolder.getKeyAs(UUID.class));

    return document;
  }

  public Document update(Document document) {
    String sql = """
        UPDATE documents
        SET storage_key = :storageKey
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("id", document.getId());

    params.addValue("storageKey", document.getStorageKey());

    jdbc.update(sql, params);

    return document;
  }

  public boolean destroy(UUID id) {
    String sql = """
        DELETE FROM documents
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();

    params.addValue("id", id);

    jdbc.update(sql, params);

    return true;
  }
}
