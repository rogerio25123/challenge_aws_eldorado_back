CREATE DATABASE devicemanagement;

USE devicemanagement;

CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

CREATE TABLE Devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoryId INT NOT NULL,
    color VARCHAR(16) NOT NULL,
    partNumber INT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES Categories(id)
);
