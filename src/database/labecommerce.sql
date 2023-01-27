-- Active: 1674498771385@@127.0.0.1@3306

-- Dados USERS

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);


INSERT INTO users (id, name, email, password)
VALUES ("u001","Thalita", "thalita@email.com","lt071120"),
("u002","Luiz Paulo", "luizpaulo@email.com","lp312388"),
("u003","Luizinho", "luizinho3@email.com","lp210121"),
("u004", "Paulo Pinheiro", "paulopinheiro@email.com","p05180p030"),
("u005", "Jackson", "jack@email.com","jc070419");

SELECT * FROM users;

PRAGMA table_info ('users');

DROP TABLE users;


-- Dados PRODUCTS

CREATE TABLE products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

DROP TABLE products;

SELECT * FROM products;

INSERT INTO  products (id, name, price, description, image_url)
VALUES 
("p001", "Camiseta Lets Play",89.90,"Camiseta inspirada na série da NETflix Round Six.(Brilha no Escuro)", "url_image"),
("p002", "Camiseta Horror Movies",89.90,"Camiseta inspirada nos maiores vilões do cinema.", "url_image"),
("p003", "Camiseta Aliens",89.90,"Camiseta estampada com alien que brilha no escuro", "url_image"),
("p004", "Luminária Nave Espacial",149.90,"Luminária de nave espacial abduzindo uma vaca", "url_image"), 
("p005", "Caneca Alien Vitruviano",44.90,"Caneca com imagem de alien imitando o Homem Vitruviano", "url_image");

SELECT * FROM products;

DROP TABLE products;


-- Dados PURCHASES

DROP TABLE purchases;

CREATE Table purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);



INSERT INTO purchases (id, total_price, buyer_id)
VALUES
    ('pu001', 89.90, 'u001'),
    ('pu002', 89.90, 'u001'),
    ('pu003', 149.90, 'u003'),
    ('pu004', 44.90, 'u002'),
    ('pu005', 149.90, 'u005'),
    ('pu006', 89.90, 'u004');

DROP TABLE purchases;

SELECT * FROM purchases;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TEXT DEFAULT( DATETIME()) NOT NULL
);

DROP TABLE purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ('pu001', 'p001', 1),
    ('pu002', 'p003', 1),
    ('pu003', 'p004', 1),
    ('pu004', 'p005', 1),
    ('pu005', 'p004', 1),
    ('pu006', 'p002', 1);

    SELECT * FROM purchases_products;

    SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

PRAGMA foreign_keys=1;



