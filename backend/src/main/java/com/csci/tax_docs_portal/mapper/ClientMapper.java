package com.csci.tax_docs_portal.mapper;

import com.csci.tax_docs_portal.entity.Client;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class ClientMapper {

  public Client mapRowSetToClient(SqlRowSet rowSet) {
    rowSet.first();
    return this.mapRowSetEntryToClient(rowSet);
  }

  public List<Client> mapRowSetToClients(SqlRowSet rowSet) {
    List<Client> clients = new ArrayList<>();

    while (rowSet.next()) {
      Client client = this.mapRowSetEntryToClient(rowSet);
      clients.add(client);
    }

    return clients;
  }

  public Client mapRowSetEntryToClient(SqlRowSet rowSet) {
    return Client.builder()
        .id(UUID.fromString(rowSet.getString("id")))
        .firstName(rowSet.getString("first_name"))
        .lastName(rowSet.getString("last_name"))
        .email(rowSet.getString("email"))
        .username(rowSet.getString("username"))
        .passwordHash(rowSet.getString("password_hash"))
        .build();
  }
}
