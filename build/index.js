"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const type_1 = require("./type");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get('/users', (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post('/users', (req, res) => {
    try {
        const { id, email, password } = req.body;
        const newUser = {
            id,
            email,
            password
        };
        if (typeof newUser.id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser uma string");
        }
        if (newUser.id[0] !== "u") {
            res.status(400);
            throw new Error("'id' deve iniciar com a letra 'u'");
        }
        const ids = database_1.users.find((user) => user.id === id);
        if (ids) {
            res.status(400);
            throw new Error("'id' já existente");
        }
        if (typeof newUser.email !== "string") {
            res.status(400);
            throw new Error("Digite um email válido");
        }
        if (!newUser.email.includes("@")) {
            res.status(400);
            throw new Error("Digite um email válido");
        }
        const emails = database_1.users.find((user) => user.email === email);
        if (emails) {
            res.status(400);
            throw new Error("'email' já existente");
        }
        if (typeof newUser.password !== "string") {
            res.status(400);
            throw new Error("'password' deve ser uma string");
        }
        if (!newUser.password.match((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g))) {
            res.status(400);
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
        }
        database_1.users.push(newUser);
        res.status(201).send('Usuário registrado com sucesso');
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const usuarioIndex = database_1.users.findIndex((users) => {
            return users.id === id;
        });
        const result = database_1.users.find((user) => {
            return user.id === id;
        });
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser uma string");
        }
        if (id[0] !== "u") {
            res.status(400);
            throw new Error("'userId' deve iniciar com a letra 'u'");
        }
        if (!result) {
            res.status(400);
            throw new Error("'id' não existente na base de dados");
        }
        if (usuarioIndex >= 0) {
            database_1.users.splice(usuarioIndex, 1);
            res.status(200).send("Usuário deletado com sucesso");
        }
        else {
            res.status(404).send("Usuário não encontrado");
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const newId = req.body.id;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser uma string");
        }
        if (id[0] !== "u") {
            res.status(400);
            throw new Error("'id' deve iniciar com a letra 'u'");
        }
        const userEdit = database_1.users.find((userEdit) => {
            return userEdit.id === id;
        });
        if (userEdit) {
            userEdit.id = newId || userEdit.id;
            userEdit.email = newEmail || userEdit.email;
            userEdit.password = newPassword || userEdit.password;
            res.status(200).send("Usuário modificado com sucesso");
        }
        else {
            res.status(404).send("Usuário não encontrado");
        }
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400);
                throw new Error("'id' deve ser uma string");
            }
            if (newId[0] !== "u") {
                res.status(400);
                throw new Error("'id' deve iniciar com a letra 'u'");
            }
            const userId = database_1.users.find((user) => {
                return user.id === newId;
            });
            if (userId) {
                res.status(400);
                throw new Error("'id' já existente base de dados");
            }
        }
        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400);
                throw new Error("'email' deve ser uma string");
            }
            if (!newEmail.match((/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))) {
                res.status(400);
                throw new Error("'email' deve possuir as seguintes regras");
            }
        }
        res.status(200).send("usuário editado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get('/products', (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get('/products/search', (req, res) => {
    try {
        const q = req.query.q;
        const result = database_1.products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase());
        });
        if (q.length < 1) {
            res.status(400);
            throw new Error("'query params' deve conter pelo menos um caractere");
        }
        if (result.length < 1) {
            res.status(400);
            throw new Error("produto não encontrado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post('/products', (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        const newProduct = {
            id,
            name,
            price,
            category
        };
        const ids = database_1.products.find((product) => product.id === id);
        if (ids) {
            res.status(400);
            throw new Error("'id' já existente");
        }
        if (typeof newProduct.id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser uma string");
        }
        if (newProduct.id[0] !== "p") {
            res.status(400);
            throw new Error("'id' deve iniciar com a letra 'p'");
        }
        if (typeof newProduct.name !== "string") {
            res.status(400);
            throw new Error("'name' deve ser uma string");
        }
        if (typeof newProduct.price !== "number") {
            res.status(400);
            throw new Error("'price' deve ser um number");
        }
        if (newProduct.price <= 0) {
            res.status(400);
            throw new Error("'price' deve ser um número positivo");
        }
        database_1.products.push(newProduct);
        res.status(201).send('Produto registrado com sucesso');
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const result = database_1.products.find((product) => {
            return product.id === id;
        });
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser uma string");
        }
        if (id[0] !== "p") {
            res.status(400);
            throw new Error("'userId' deve iniciar com a letra 'p'");
        }
        if (!result) {
            res.status(400);
            throw new Error("'id' não existente");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const productIndex = database_1.products.findIndex((product) => {
            return product.id === id;
        });
        const productIds = database_1.products.find((product) => {
            return product.id === id;
        });
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser uma string");
        }
        if (id[0] !== "p") {
            res.status(400);
            throw new Error("'userId' deve iniciar com a letra 'p'");
        }
        if (!productIds) {
            res.status(404);
            throw new Error("'id' não existente na base de dados");
        }
        if (productIndex >= 0) {
            database_1.products.splice(productIndex, 1);
            res.status(200).send("Produto deletado com sucesso");
        }
        else {
            res.status(404).send("Produto não encontrado");
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newCategory = req.body.category;
        const product = database_1.products.find((product) => {
            return product.id === id;
        });
        if (product) {
            product.id = newId || product.id;
            product.name = newName || product.name;
            product.price = newPrice || product.price;
            product.category = newCategory || product.category;
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("'id' deve ser uma string");
            }
            if (id[0] !== "p") {
                res.status(400);
                throw new Error("'id' deve iniciar com a letra 'p'");
            }
            if (!product) {
                res.status(400);
                throw new Error("'id' não existente na base de dados");
            }
            if (newId !== undefined) {
                if (typeof newId !== "string") {
                    res.status(400);
                    throw new Error("'id' deve ser uma string");
                }
                if (newId[0] !== "p") {
                    res.status(400);
                    throw new Error("'id' deve iniciar com a letra 'p'");
                }
                const product = database_1.products.find((product) => {
                    return product.id === newId;
                });
                if (product) {
                    res.status(400);
                    throw new Error("'id' já existente base de dados");
                }
            }
            if (newName !== undefined) {
                if (typeof newName !== "string") {
                    res.status(400);
                    throw new Error("'name' deve ser uma string");
                }
            }
            if (newPrice !== undefined) {
                if (typeof newPrice !== "number") {
                    res.status(400);
                    throw new Error("'price' deve ser um number");
                }
            }
            if (newCategory !== undefined) {
                if (newCategory !== type_1.PRODUCT_CATEGORY.ACCESSORIES &&
                    newCategory !== type_1.PRODUCT_CATEGORY.CLOTHES_AND_SHOES &&
                    newCategory !== type_1.PRODUCT_CATEGORY.ELECTRONICS) {
                    res.status(400);
                    throw new Error("'category' deve ser do tipo? Acessórios, Roupas e Calçados ou Eletrônicos");
                }
            }
            if (product) {
                product.id = newId || product.id;
                product.name = newName || product.name;
                product.price = newPrice || product.price;
                product.category = newCategory || product.category;
            }
            res.status(404).send("Produto não encontrado");
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get('/purchase', (req, res) => {
    res.status(200).send(database_1.purchase);
});
app.post('/purchase', (req, res) => {
    try {
        const { userId, product, quantity, totalPrice } = req.body;
        const newPurchase = {
            userId,
            product,
            quantity,
            totalPrice
        };
        const userIds = database_1.users.find((user) => user.id === userId);
        if (!userIds) {
            res.status(404);
            throw new Error("'id' do usuário não existente");
        }
        if (typeof newPurchase.userId !== "string") {
            res.status(400);
            throw new Error("'userId' deve ser uma string");
        }
        if (newPurchase.userId[0] !== "u") {
            res.status(400);
            throw new Error("'userId' deve iniciar com a letra 'u'");
        }
        const productIds = database_1.products.find((products) => products.id === product);
        if (!productIds) {
            res.status(404);
            throw new Error("'id' do produto não existente");
        }
        if (typeof newPurchase.product !== "string") {
            res.status(400);
            throw new Error("'productId' deve ser uma string");
        }
        if (newPurchase.product[0] !== "p") {
            res.status(400);
            throw new Error("'productId' deve iniciar com a letra 'p'");
        }
        const foundPrice = database_1.products.find((product) => {
            return product.price === productIds.price;
        });
        if (!foundPrice) {
            res.status(400);
            throw new Error("Produto não encontrado");
        }
        if (typeof newPurchase.quantity !== "number") {
            res.status(400);
            throw new Error("'quantity' deve ser um number");
        }
        if (newPurchase.quantity <= 0) {
            res.status(400);
            throw new Error("'quantity' deve ser um número positivo");
        }
        if (typeof newPurchase.totalPrice !== "number") {
            res.status(400);
            throw new Error("'totalPrice' deve ser um number");
        }
        if (newPurchase.totalPrice <= 0) {
            res.status(400);
            throw new Error("'totalPrice' deve ser um número positivo");
        }
        database_1.purchase.push(newPurchase);
        res.status(201).send('Compra realizada com sucesso');
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/purchase/:id", (req, res) => {
    try {
        const userId = req.params.id;
        const result = database_1.purchase.find((purchases) => {
            return purchases.userId === userId;
        });
        if (typeof userId !== "string") {
            res.status(400);
            throw new Error("'id' deve ser uma string");
        }
        if (userId[0] !== "u") {
            res.status(400);
            throw new Error("'userId' deve iniciar com a letra 'u'");
        }
        if (!result) {
            res.status(400);
            throw new Error("'id' não existente");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 201) {
            res.status(500);
        }
        res.send(error.message);
    }
});
//# sourceMappingURL=index.js.map