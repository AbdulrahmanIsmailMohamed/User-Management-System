CREATE TABLE auth (
    id INT Auto_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL
);