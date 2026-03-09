package com.csci.tax_docs_portal.mapper;

import com.csci.tax_docs_portal.entity.Accountant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class AccountantMapper {

  public Accountant mapRowSetToAccountant(SqlRowSet rowSet) {
    rowSet.first();

    Accountant accountant = this.mapRowSetEntryToAccountant(rowSet);

    return accountant;
  }

  public List<Accountant> mapRowSetToAccountants(SqlRowSet rowSet) {
    List<Accountant> accountants = new ArrayList<Accountant>();

    while (rowSet.next()) {
      Accountant accountants = this.mapRowSetEntryToAccountant(rowSet);

      accountants.add(accountant);
    }

    return accountants;
  }

  public Accountant mapRowSetEntryToAccountant(SqlRowSet rowSet) {
    return Accountant.builder()
        .id(UUID.fromString(rowSet.getString("id")))
        .firstName(rowSet.getString("first_name"))
        .lastName(rowSet.getString("last_name"))
        .email(rowSet.getString("email"))
        .username(rowSet.getString("username"))
        .password(rowSet.getString("password_hash"))
        .build();
  }
}
