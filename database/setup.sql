DROP TABLE IF EXISTS task_status;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS accountants;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  age INT,
  weight FLOAT,
  smoker BOOLEAN
);

-- Accountants Table 
CREATE TABLE accountants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  username VARCHAR(255),
  password_hash VARCHAR(255)
);

-- Clients Table
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

-- Admins Table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  username VARCHAR(255),
  password_hash VARCHAR(255)
);

-- Messages Table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  accountant_id UUID,
  sender_type VARCHAR(20), -- CLIENT or ACCOUNTANT
  message_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_message_client
    FOREIGN KEY (client_id) REFERENCES clients(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_message_accountant
    FOREIGN KEY (accountant_id) REFERENCES accountants(id)
    ON DELETE CASCADE
);

-- Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  accountant_id UUID,
  title VARCHAR(255)L,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_task_client
    FOREIGN KEY (client_id) REFERENCES clients(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_task_accountant
    FOREIGN KEY (accountant_id) REFERENCES accountants(id)
    ON DELETE CASCADE
);

-- Task Status Table (history tracking)
CREATE TABLE task_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID,
  task_status VARCHAR(50), -- PENDING, IN_PROGRESS, COMPLETED
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_task_status
    FOREIGN KEY (task_id) REFERENCES tasks(id)
    ON DELETE CASCADE
);

-- Users
INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES 
('John', 'Doe', 35, 183.7, false),
('Jane', 'Doe', 33, 155.1, false),
('Chad', 'Smith', 35, 185.3, true),
('Karen', 'Smith', 33, 159.5, false);

-- Accountants
INSERT INTO accountants (first_name, last_name, email, username, password_hash)
VALUES 
('Alex', 'Dawn', 'alex@example.com', 'adawn', 'fakepass1'),
('George', 'Smith', 'george@example.com', 'gsmith', 'fakepass1'),
('Gordon', 'Freeman', 'gordon@example.com', 'gfreeman', 'fakepass1');

-- Clients
INSERT INTO clients (first_name, last_name, email, username, password_hash, accountant_id)
VALUES 
('Kaleb', 'Mallory', 'kaleb@example.com', 'kmall', 'fakepass2', NULL),
('AnhPhat', 'Nguyen', 'anh@example.com', 'anguyen', 'fakepass2', NULL),
('Joseph', 'Manno', 'joseph@example.com', 'jmanno', 'fakepass2', NULL),
('Ryan', 'Dilley', 'ryan@example.com', 'rdilley', 'fakepass2', NULL),
('John', 'Snyder', 'johns@example.com', 'jsnyder', 'fakepass2', NULL);
