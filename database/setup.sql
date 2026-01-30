DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  age INT,
  weight FLOAT,
  smoker BOOLEAN
);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('John', 'Doe', 35, 183.7, false);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Jane', 'Doe', 33, 155.1, false);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Chad', 'Smith', 35, 185.3, true);

INSERT INTO users (first_name, last_name, age, weight, smoker)
VALUES ('Karen', 'Smith', 33, 159.5, false);
