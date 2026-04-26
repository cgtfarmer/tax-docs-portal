DROP TABLE IF EXISTS documents;
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
CREATE TYPE sender_type_enum AS ENUM ('CLIENT', 'ACCOUNTANT');
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  accountant_id UUID,
  sender_type sender_type_enum NOT NULL,
  message_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_message_client
    FOREIGN KEY (client_id) REFERENCES clients(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_message_accountant
    FOREIGN KEY (accountant_id) REFERENCES accountants(id)
    ON DELETE CASCADE
);

-- Tasks Table
CREATE TYPE task_status_enum AS ENUM ('In Progress', 'In Review', 'Completed');
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID,
  accountant_id UUID,
  title VARCHAR(255),
  task_description TEXT,
  task_status task_status_enum DEFAULT 'In Progress',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,

  CONSTRAINT fk_task_client
    FOREIGN KEY (client_id) REFERENCES clients(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_task_accountant
    FOREIGN KEY (accountant_id) REFERENCES accountants(id)
    ON DELETE CASCADE
);

-- Documents Table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID,
    storage_key VARCHAR(255) UNIQUE,

    CONSTRAINT fk_client_files_client
        FOREIGN KEY (client_id)
        REFERENCES clients(id)
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
('Alex', 'Dawn', 'alex@example.com', 'adawn', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.'),
('George', 'Smith', 'george@example.com', 'gsmith', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.'),
('Gordon', 'Freeman', 'gordon@example.com', 'gfreeman', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.');

-- Clients
INSERT INTO clients (first_name, last_name, email, username, password_hash, accountant_id)
VALUES 
('Kaleb', 'Mallory', 'kaleb@example.com', 'kmall', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.', NULL),
('AnhPhat', 'Nguyen', 'anh@example.com', 'anguyen', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.', NULL),
('Joseph', 'Manno', 'joseph@example.com', 'jmanno', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.', NULL),
('Ryan', 'Dilley', 'ryan@example.com', 'rdilley', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.', NULL),
('John', 'Snyder', 'johns@example.com', 'jsnyder', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.', NULL);

-- Admins
INSERT INTO admins (first_name, last_name, email, username, password_hash)
VALUES
('System', 'Admin', 'sysadmin@taxportal.com', 'sysadmin', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.'),
('Laura', 'Mitchell', 'laura.mitchell@taxportal.com', 'lmitchell', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.'),
('Brian', 'Turner', 'brian.turner@taxportal.com', 'bturner', '$2a$10$2pJIC5s/lzSvaHD.401DbuvAKtrVzV/dQ34yJyYTsEx4WDxSmzrK.');