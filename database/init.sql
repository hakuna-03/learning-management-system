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

CREATE TABLE IF NOT EXISTS courses(
    course_id         INT(11) NOT NULL AUTO_INCREMENT,
    code              VARCHAR(50) NOT NULL,
    name              VARCHAR(120) NOT NULL,
    description       VARCHAR(250) NULL,
    PRIMARY KEY (course_id)
);

CREATE TABLE IF NOT EXISTS prerequisites(
    course_id               INT NOT NULL ,
    required_course_id      INT NOT NULL ,
    PRIMARY KEY (course_id,required_course_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (required_course_id) REFERENCES courses(course_id)
);

CREATE TABLE IF NOT EXISTS classes(
    class_id          INT(11) NOT NULL AUTO_INCREMENT,
    course_id         INT NOT NULL,
    code              VARCHAR(50) NOT NULL,
    name              VARCHAR(120) NOT NULL,
    description       VARCHAR(250) NULL,
    year              INT NOT NULL,
    semester          ENUM('fall', 'spring','summer','winter') NOT NULL,
    status            ENUM('registration', 'studying','finished') NOT NULL DEFAULT 'registration',
    PRIMARY KEY (class_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE IF NOT EXISTS professor_classes(
    professor_id      INT NOT NULL,
    class_id          INT NOT NULL,
    PRIMARY KEY (professor_id,class_id),
    FOREIGN KEY (professor_id) REFERENCES users(user_id),
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);


