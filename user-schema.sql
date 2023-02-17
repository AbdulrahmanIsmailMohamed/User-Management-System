CREATE TABLE user (
    `id` INT PRIMARY KEY,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45),
    `email` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `comment` TEXT(1000),
    `status` VARCHAR (10) NOT NULL DEFAULT "active"
);