-- Active: 1719202194227@@127.0.0.1@3306@ecommerceDB
CREATE DATABASE IF NOT EXISTS ecommerceDB;
USE ecommerceDB;

-- User Table
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    gender VARCHAR(10),
    status INT,
    activeCode INT,
    `Character`  INT
    );


INSERT INTO User (user_id,user_name,user_password,email,gender,status,activeCode,`Character`) VALUES (0,'Aaron','123456','aaron@qq.com', 'Male',0,1234,32);

ALTER TABLE User
DROP COLUMN user_name,
DROP COLUMN user_password;

SELECT * FROM User WHERE Email = 'aaron@qq.com';

DESCRIBE user;

-- Address Table
CREATE TABLE Address (
    Address_id INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Receiver VARCHAR(50),
    Phone VARCHAR(20),
    Address VARCHAR(255),
    Default_Address BOOLEAN,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Category Table
CREATE TABLE Category (
    Category_id INT AUTO_INCREMENT PRIMARY KEY,
    Category_name VARCHAR(100) NOT NULL,
    Description VARCHAR(255)
);

-- Product Table
CREATE TABLE Product (
    Product_id INT AUTO_INCREMENT PRIMARY KEY,
    Product_name VARCHAR(100) NOT NULL,
    Release_date DATE,
    Description VARCHAR(255),
    Price DECIMAL(10, 2),
    Stock INT,
    Image_url VARCHAR(255),
    Category_id INT,
    FOREIGN KEY (Category_id) REFERENCES Category(Category_id)
);

-- Shopping Cart Table
CREATE TABLE Cart (
    Shopping_cart_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT,
    Product_id INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (User_id) REFERENCES User(UserID),
    FOREIGN KEY (Product_id) REFERENCES Product(Product_id)
);

-- Order Table
CREATE TABLE orders (
    OrderID VARCHAR(50) PRIMARY KEY,
    UserID INT NOT NULL,
    Address_ID INT NOT NULL,
    Amount DECIMAL(10, 2),
    Time DATETIME,
    Status INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (Address_ID) REFERENCES Address(Address_id)
);

DROP TABLE `Order`


-- Order Item Table
CREATE TABLE Order_Item (
    Order_item_id VARCHAR(50) PRIMARY KEY,
    Order_id VARCHAR(50),
    Product_id INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (Order_id) REFERENCES orders(OrderID),  -- Enclosed in backticks
    FOREIGN KEY (Product_id) REFERENCES Product(Product_id)
);

drop DATABASE ecommerceDB