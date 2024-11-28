-- Active: 1719202194227@@127.0.0.1@3306@ecommerceDB
CREATE DATABASE IF NOT EXISTS ecommerceDB;
USE ecommerceDB;



-- User Table
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    gender VARCHAR(10)
    );


INSERT INTO User (user_id,user_name,user_password,email,gender) VALUES (0,'Aaron','123456','aaron@qq.com', 'Male');

ALTER TABLE User
DROP COLUMN user_name,
DROP COLUMN user_password;

SELECT * FROM User WHERE Email = 'aaron@qq.com';

DESCRIBE user;

-- Address Table


drop DATABASE ecommerceDB

drop table products

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    tag VARCHAR(50),
    price DECIMAL(10, 2)
);

INSERT INTO products (name, image_url, tag, price)
VALUES
('Scarlet & Violet: 151 - Alakazam ex Box', '151.webp', 'New', 43.99)

INSERT INTO products (name, image_url, tag, price)
VALUES
('Pikachu YoKohama Deck: - Pikachu ex Box', 'yokohama.webp', 'Sale', 63.99),
('Pokemon Sun and Moon: - Booster Box', 'smB.webp', 'New', 77.99),
('Pokemon Sun and Moon 12: - Booster Box', 'sm12.jpg', 'New', 77.99),
('Pokemon Irida japanese: - Collection Box', 'irida.webp', 'New', 88.99),
('Pokemon Scarlet and Violet: - Booster Box', 'PokemonWildForceJapaneseBoosterBox_500x500.webp', 'New', 77.99),




INSERT INTO products (name, image_url, tag, price)
VALUES
('Pokemon Scarlet and Violet sv5a: - Booster Box', 'PokemonWildForceJapaneseBoosterBox_500x500.webp', 'New', 77.99),
('Pokemon Scarlet and Violet sv6: - Booster Box', 'PokemonWildForceJapaneseBoosterBox_500x500.webp', 'New', 77.99),
('Pokemon Scarlet and Violet sv7: - Booster Box', 'PokemonWildForceJapaneseBoosterBox_500x500.webp', 'New', 77.99),
('Pokemon Scarlet and Violet sv8: - Booster Box', 'PokemonWildForceJapaneseBoosterBox_500x500.webp', 'New', 77.99),

INSERT INTO products (name, image_url, tag, price)
VALUES
('Pokemon Scarlet and Violet sv8a: - Booster Box', 'PokemonWildForceJapaneseBoosterBox_500x500.webp', 'New', 77.99),
('Pokemon Scarlet and Violet sv9: - Booster Box', 'PokemonWildForceJapaneseBoosterBox_500x500.webp', 'New', 77.99)


INSERT INTO products (name, image_url, tag, price)
VALUES
('Pokemon Scarlet and Violet sv8a: - Booster Box', 'PokemonWildForceJapaneseBoosterBox_500x500.webp', 'New', 77.99),
('Pokemon Scarlet and Violet sv9: - Booster Box', 'PokemonWildForceJapaneseBoosterBox_500x500.webp', 'New', 77.99)


ALTER TABLE products ADD COLUMN category VARCHAR(50);
UPDATE products SET category = 'Elite Trainer Box' WHERE id = 1;
UPDATE products SET category = 'Booster Box' WHERE id = 2;
UPDATE products SET category = 'Collection Box' WHERE id = 3;
UPDATE products SET category = 'Starter Decks' WHERE id = 4;
SELECT * from products



