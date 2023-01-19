"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
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
    res.status(200).send(database_1.users);
});
app.post('/users', (req, res) => {
    const { id, email, password } = req.body;
    const newUser = {
        id,
        email,
        password
    };
    database_1.users.push(newUser);
    res.status(201).send('Usuário registrado com sucesso');
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const usuarioIndex = database_1.users.findIndex((users) => {
        return users.id === id;
    });
    console.log("Index:", usuarioIndex);
    if (usuarioIndex >= 0) {
        database_1.users.splice(usuarioIndex, 1);
        res.status(200).send("Usuário deletado com sucesso");
    }
    else {
        res.status(404).send("Usuário não encontrado");
    }
});
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const newId = req.body.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
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
});
app.get('/products', (req, res) => {
    res.status(200).send(database_1.products);
});
app.get('/products/search', (req, res) => {
    const q = req.query.q;
    const result = database_1.products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(result);
});
app.post('/products', (req, res) => {
    const { id, name, price, category } = req.body;
    const newProduct = {
        id,
        name,
        price,
        category
    };
    database_1.products.push(newProduct);
    res.status(201).send('Produto registrado com sucesso');
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = database_1.products.find((product) => {
        return product.id === id;
    });
    res.status(200).send(result);
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = database_1.products.findIndex((product) => {
        return product.id === id;
    });
    console.log("Index:", productIndex);
    if (productIndex >= 0) {
        database_1.products.splice(productIndex, 1);
        res.status(200).send("Produto deletado com sucesso");
    }
    else {
        res.status(404).send("Produto não encontrado");
    }
});
app.put("/products/:id", (req, res) => {
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
        res.status(200).send("Produto modificado com sucesso");
    }
    else {
        res.status(404).send("Produto não encontrado");
    }
});
app.get('/purchase', (req, res) => {
    res.status(200).send(database_1.purchase);
});
app.post('/purchase', (req, res) => {
    const { userId, product, quantity, totalPrice } = req.body;
    const newPurchase = {
        userId,
        product,
        quantity,
        totalPrice
    };
    database_1.purchase.push(newPurchase);
    res.status(201).send('Compra realizada com sucesso');
});
app.get("/purchase/:id", (req, res) => {
    const userId = req.params.id;
    const result = database_1.purchase.find((purchases) => {
        return purchases.userId === userId;
    });
    res.status(200).send(result);
});
//# sourceMappingURL=index.js.map