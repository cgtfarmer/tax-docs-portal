package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.Document;
import com.csci.tax_docs_portal.mapper.DocumentMapper;
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

  public Document findByStorageKey(String storageKey) {
    String sql = """
        SELECT * FROM documents
        WHERE storage_key = :storageKey
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("storageKey", storageKey);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToDocument(results);
  }

  public Document findById(UUID id) {
    String sql = """
        SELECT * FROM documents
        WHERE id = :id
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

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
