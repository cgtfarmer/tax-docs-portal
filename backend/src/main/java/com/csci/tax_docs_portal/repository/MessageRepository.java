package com.csci.tax_docs_portal.repository;

import com.csci.tax_docs_portal.entity.Message;
import com.csci.tax_docs_portal.mapper.MessageMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class MessageRepository {

  private final NamedParameterJdbcTemplate jdbc;

  private final MessageMapper mapper;

  public MessageRepository(NamedParameterJdbcTemplate jdbc) {
    this.jdbc = jdbc;
    this.mapper = new MessageMapper();
  }

  public List<Message> findAll() {
    String sql = "SELECT * FROM messages ORDER BY created_at ASC";

    SqlRowSet results = jdbc.queryForRowSet(sql, new MapSqlParameterSource());

    return mapper.mapRowSetToMessages(results);
  }

  public Message findById(UUID id) {
    String sql = "SELECT * FROM messages WHERE id = :id";

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToMessage(results);
  }

  public List<Message> findByClientAndAccountant(
      UUID clientId,
      UUID accountantId
  ) {
    String sql = """
        SELECT * FROM messages
        WHERE client_id = :clientId
        AND accountant_id = :accountantId
        ORDER BY created_at ASC
        """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("clientId", clientId);
    params.addValue("accountantId", accountantId);

    SqlRowSet results = jdbc.queryForRowSet(sql, params);

    return mapper.mapRowSetToMessages(results);
  }

  public Message create(Message message) {
    String sql =
        """
            INSERT INTO messages (client_id, accountant_id, sender_type, message_text)
            VALUES (:clientId, :accountantId, :senderType, :messageText)
            """;

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("clientId", message.getClientId());
    params.addValue("accountantId", message.getAccountantId());
    params.addValue("senderType", message.getSenderType());
    params.addValue("messageText", message.getMessageText());

    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbc.update(sql, params, keyHolder, new String[] {
        "id"
    });

    UUID id = keyHolder.getKeyAs(UUID.class);
    message.setId(id);

    return message;
  }

  public boolean destroy(UUID id) {
    String sql = "DELETE FROM messages WHERE id = :id";

    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("id", id);

    jdbc.update(sql, params);

    return true;
  }
}
