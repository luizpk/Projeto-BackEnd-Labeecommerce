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

SELECT * FROM purchases;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TEXT DEFAULT( DATETIME()) NOT NULL
);

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

-- -- exercício 1

-- -- Get All Users

-- -- retorna todos os usuários cadastrados

-- SELECT * FROM users;

-- -- Get All Products

-- -- retorna todos os produtos cadastrados

-- -- Search Product by name

-- -- mocke um termo de busca, por exemplo "monitor"

-- -- retorna o resultado baseado no termo de busca

-- -- SELECT * FROM products WHERE name = 'Blusa Azul';

-- -- Create User

-- -- mocke um novo usuário

-- -- insere o item mockado na tabela users

-- INSERT into
--     users (id, email, password)
-- VALUES (
--         'u006',
--         'email6@mail.com',
--         'lp312388'
--     );

--     -- Create Product

-- -- mocke um novo produto

-- -- insere o item mockado na tabela products

-- INSERT into
--     products (id, name, price, category)
-- VALUES (
--         'p006',
--         'Aple Watch',
--         7500,
--         'Eletrõnicos'
--     );

--     -- exercício 2

-- -- Get Products by id

-- -- mocke uma id

-- -- busca baseada no valor mockado

-- SELECT * FROM products WHERE id = 'p002';

-- -- Delete User by id

-- -- mocke uma id

-- -- delete a linha baseada no valor mockado

-- DELETE FROM users WHERE id = 'u003';

-- -- Delete Product by id

-- -- mocke uma id

-- -- delete a linha baseada no valor mockado

-- DELETE FROM products WHERE id = 'p003';

-- -- Edit User by id

-- -- mocke valores para editar um user

-- -- edite a linha baseada nos valores mockados

-- UPDATE users
-- SET
--     email = 'luizpkpinheiro@mail.com',
--     password = 'lt071120'
-- WHERE id = 'u001';

-- -- Edit Product by id

-- -- mocke valores para editar um product

-- -- edite a linha baseada nos valores mockados

-- UPDATE products
-- SET
--     name = 'Blusa Azul-Marinho',
--     price = 59.9,
--     category = 'Roupas'
-- WHERE id = 'p001';

-- -- retorna o resultado ordenado pela coluna email em ordem crescente

-- SELECT * FROM users ORDER BY email ASC;

-- -- retorna o resultado ordenado pela coluna price em ordem crescente

-- -- limite o resultado em 20 iniciando pelo primeiro item

-- SELECT * FROM products ORDER BY price ASC LIMIT 20;

-- -- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00

-- -- retorna os produtos com preços dentro do intervalo mockado em ordem crescente

-- SELECT *
-- FROM products
-- WHERE
--     price >= 79.9
--     AND price <= 7500
-- ORDER BY price ASC;

-- -- relações sql I

-- --Criação da tabela de pedidos

-- CREATE TABLE purchases(
--     id TEXT PRIMARY KEY NOT NULL,
--     total_price REAL NOT NULL,
--     paid INTEGER NOT NULL,
--     delivered_at TEXT,
--     buyer_id TEXT NOT NULL,
--     FOREIGN KEY (buyer_id) REFERENCES users(id)
-- );

-- INSERT INTO purchases (id, total_price, paid, buyer_id)
-- VALUES
--     ('pu001', 50.99, 0, 'u001'),
--     ('pu002', 41.30, 0, 'u001'),
--     ('pu004', 49.99, 0, 'u003'),
--     ('pu005', 7500, 0, 'u002'),
--     ('pu006', 59.9, 0, 'u002'),
--     ('pu007', 12.50, 0, 'u004'),
--     ('pu008', 12.50, 0, 'u004'),
--     ('pu009', 56.7, 0, 'u003'),
--     ('pu010', 12.50, 0, 'u005'),
--     ('pu011', 10.99, 0, 'u005');

--     SELECT * FROM purchases;

--     UPDATE purchases
-- SET
--     delivered_at = DATETIME('now')
-- WHERE id = 'pu006';

-- SELECT * FROM purchases
-- INNER JOIN users
-- ON purchases.buyer_id = users.id
-- WHERE users.id = 'u001';

