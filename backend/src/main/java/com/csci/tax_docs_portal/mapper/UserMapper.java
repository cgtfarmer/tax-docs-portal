package com.csci.tax_docs_portal.mapper;

import com.csci.tax_docs_portal.entity.User;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class UserMapper {

  public User mapRowSetToUser(SqlRowSet rowSet) {
    rowSet.first();

    User user = this.mapRowSetEntryToUser(rowSet);

    return user;
  }

  public List<User> mapRowSetToUsers(SqlRowSet rowSet) {
    List<User> users = new ArrayList<User>();

    while (rowSet.next()) {
      User user = this.mapRowSetEntryToUser(rowSet);

      users.add(user);
    }

    return users;
  }

  public User mapRowSetEntryToUser(SqlRowSet rowSet) {
    return User.builder()
        .id(UUID.fromString(rowSet.getString("id")))
        .firstName(rowSet.getString("first_name"))
        .lastName(rowSet.getString("last_name"))
        .age(rowSet.getInt("age"))
        .weight(rowSet.getFloat("weight"))
        .smoker(rowSet.getBoolean("smoker"))
        .build();
  }
}
