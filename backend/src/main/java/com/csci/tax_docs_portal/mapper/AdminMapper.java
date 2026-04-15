package com.csci.tax_docs_portal.mapper;

import com.csci.tax_docs_portal.entity.Admin;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class AdminMapper {

  public Admin mapRowSetToAdmin(SqlRowSet rowSet) {

    if (rowSet.next()) {
      return this.mapRowSetEntryToAdmin(rowSet);
    }
    return null;
  }

  public List<Admin> mapRowSetToAdmins(SqlRowSet rowSet) {
    List<Admin> admins = new ArrayList<>();

    while (rowSet.next()) {
      admins.add(this.mapRowSetEntryToAdmin(rowSet));
    }

    return admins;
  }

  public Admin mapRowSetEntryToAdmin(SqlRowSet rowSet) {
    return Admin.builder()
        .id(UUID.fromString(rowSet.getString("id")))
        .firstName(rowSet.getString("first_name"))
        .lastName(rowSet.getString("last_name"))
        .email(rowSet.getString("email"))
        .username(rowSet.getString("username"))
        .passwordHash(rowSet.getString("password_hash"))
        .build();
  }
}
