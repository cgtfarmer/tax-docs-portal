package com.csci.tax_docs_portal.mapper;

import com.csci.tax_docs_portal.entity.Message;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class MessageMapper {

  public Message mapRowSetToMessage(SqlRowSet rowSet) {

    if (rowSet.next()) {
      return this.mapRowSetEntryToMessage(rowSet);
    }
    return null;
  }

  public List<Message> mapRowSetToMessages(SqlRowSet rowSet) {
    List<Message> messages = new ArrayList<>();

    while (rowSet.next()) {
      messages.add(this.mapRowSetEntryToMessage(rowSet));
    }

    return messages;
  }

  public Message mapRowSetEntryToMessage(SqlRowSet rowSet) {
    return Message.builder()
        .id(UUID.fromString(rowSet.getString("id")))
        .clientId(UUID.fromString(rowSet.getString("client_id")))
        .accountantId(UUID.fromString(rowSet.getString("accountant_id")))
        .senderType(rowSet.getString("sender_type"))
        .messageText(rowSet.getString("message_text"))
        .createdAt(
            rowSet.getTimestamp("created_at") != null
                ? rowSet.getTimestamp("created_at")
                    .toLocalDateTime()
                : null
        )
        .build();
  }
}
