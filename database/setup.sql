-- User Table
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  age INT,
  weight FLOAT,
  smoker BOOLEAN
);

-- Accountants Table 
DROP TABLE IF EXISTS accountants;

CREATE TABLE accountants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  username VARCHAR(255),
  password_hash VARCHAR(255)
);

-- Clients table
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  username VARCHAR(255),
  password_hash VARCHAR(255)
);


INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('John', 'Doe', 35, 183.7, false);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Jane', 'Doe', 33, 155.1, false);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Chad', 'Smith', 35, 185.3, true);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Karen', 'Smith', 33, 159.5, false);

INSERT INTO accountants (first_name, last_name, email, username, password_hash)
VALUES ('Alex', 'Dawn', 'alex@example.com', 'adawn', 'fakepass1');

INSERT INTO clients (first_name, last_name, email, username, password_hash)
VALUES ('Kaleb', 'Mallory', 'kaleb@example.com', 'kmall', 'fakepass2');