CREATE DATABASE IF NOT EXISTS lms;

USE lms;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id           INT(11) NOT NULL AUTO_INCREMENT,
    name              VARCHAR(50) NOT NULL,
    email             VARCHAR(100) NOT NULL UNIQUE,
    password          VARCHAR(120) NOT NULL,
    collage_id        VARCHAR(20) NOT NULL UNIQUE,
    enrollment_date   DATE NOT NULL,
    gpa               FLOAT NULL,
    role              ENUM('student', 'professor','admin') NOT NULL DEFAULT 'student',
    nat_id            VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (user_id)
);

INSERT INTO users(name,email,password,collage_id,enrollment_date,role,nat_id) VALUES ("test","test@gmail.com","password","20190120","2023-09-17","student","30215421523625");