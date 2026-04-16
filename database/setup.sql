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
  password_hash VARCHAR(255),
  accountant_id UUID NULL,
  CONSTRAINT fk_accountant
    FOREIGN KEY (accountant_id)
    REFERENCES accountants(id)
    ON DELETE SET NULL
);

CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  accountant_id UUID NOT NULL,
  sender_type VARCHAR(20) NOT NULL, -- 'CLIENT' or 'ACCOUNTANT'
  message_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_message_client
    FOREIGN KEY (client_id) REFERENCES clients(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_message_accountant
    FOREIGN KEY (accountant_id) REFERENCES accountants(id)
    ON DELETE CASCADE
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  accountant_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_task_client
    FOREIGN KEY (client_id) REFERENCES clients(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_task_accountant
    FOREIGN KEY (accountant_id) REFERENCES accountants(id)
    ON DELETE CASCADE
);

CREATE TABLE status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL,
  task_status VARCHAR(50) NOT NULL, -- PENDING, IN_PROGRESS, COMPLETED, etc.
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_task_status_task
    FOREIGN KEY (task_id) REFERENCES tasks(id)
    ON DELETE CASCADE
);

-- Add Users
INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('John', 'Doe', 35, 183.7, false);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Jane', 'Doe', 33, 155.1, false);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Chad', 'Smith', 35, 185.3, true);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Karen', 'Smith', 33, 159.5, false);

-- Add Accountants
INSERT INTO accountants (first_name, last_name, email, username, password_hash)
VALUES ('Alex', 'Dawn', 'alex@example.com', 'adawn', 'fakepass1');

INSERT INTO accountants (first_name, last_name, email, username, password_hash)
VALUES ('George', 'Smith', 'alex@example.com', 'gsmith', 'fakepass1');

INSERT INTO accountants (first_name, last_name, email, username, password_hash)
VALUES ('Gordon', 'Freeman', 'alex@example.com', 'gfreeman', 'fakepass1');

-- Add Clients
INSERT INTO clients (first_name, last_name, email, username, password_hash, accountant_id)
VALUES ('Kaleb', 'Mallory', 'kaleb@example.com', 'kmall', 'fakepass2', NULL);

INSERT INTO clients (first_name, last_name, email, username, password_hash, accountant_id)
VALUES ('AnhPhat', 'Nguyen', 'kaleb@example.com', 'kmall', 'fakepass2', NULL);

INSERT INTO clients (first_name, last_name, email, username, password_hash, accountant_id)
VALUES ('Joseph', 'Manno', 'kaleb@example.com', 'kmall', 'fakepass2', NULL);

INSERT INTO clients (first_name, last_name, email, username, password_hash, accountant_id)
VALUES ('Ryan', 'Dilley', 'kaleb@example.com', 'kmall', 'fakepass2', NULL);

INSERT INTO clients (first_name, last_name, email, username, password_hash, accountant_id)
VALUES ('John', 'Snyder', 'kaleb@example.com', 'kmall', 'fakepass2', NULL);