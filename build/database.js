"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.purchase = exports.getProductByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
const type_1 = require("./type");
exports.users = [{
        id: "u001",
        email: "luizpaulo@mail.com",
        password: "lp312388"
    },
    {
        id: "u002",
        email: "thalitacepa@mail.com",
        password: "lp312388"
    },
    {
        id: "u003",
        email: "luizpaulo02@mail.com",
        password: "lp312388"
    },
    {
        id: "u004",
        email: "paulopinheiro@mail.com",
        password: "lp312388"
    },
    {
        id: "u005",
        email: "jackdoguinho@mail.com",
        password: "lp312388"
    },
];
const createUser = (id, email, password) => {
    const user = {
        id,
        email,
        password
    };
    if (user) {
        exports.users.push(user);
        console.log("Usuário criado com sucesso");
    }
    else {
        console.log("Usuário não foi criado");
    }
};
exports.createUser = createUser;
const getAllUsers = () => {
    console.log(exports.users);
};
exports.getAllUsers = getAllUsers;
exports.products = [{
        id: "prd001",
        name: "Blusa Azul",
        price: 49.9,
        category: type_1.PRODUCT_CATEGORY.CLOTHES_AND_SHOES
    },
    {
        id: "prd002",
        name: "Vestido Plissado",
        price: 89.9,
        category: type_1.PRODUCT_CATEGORY.CLOTHES_AND_SHOES
    },
    {
        id: "prd003",
        name: "Calça Wide Leg",
        price: 78.9,
        category: type_1.PRODUCT_CATEGORY.CLOTHES_AND_SHOES
    },
    {
        id: "prd004",
        name: "Óculos de Gatinho",
        price: 39.9,
        category: type_1.PRODUCT_CATEGORY.ACCESSORIES
    }];
const createProduct = (id, name, price, category) => {
    const product = {
        id,
        name,
        price,
        category
    };
    if (product) {
        exports.products.push(product);
        console.log("Produto criado com sucesso");
    }
    else {
        console.log("Produto não foi cadastrado.");
    }
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    console.log(exports.products);
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    const productProcurado = exports.products.filter((product) => {
        return product.id === idToSearch;
    });
    console.log(productProcurado);
};
exports.getProductById = getProductById;
const getProductByName = (query) => {
    const productProcurado = exports.products.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase());
    });
    console.log(productProcurado);
};
exports.getProductByName = getProductByName;
exports.purchase = [{
        userId: "u001",
        product: "prd001",
        quantity: 2,
        totalPrice: 2 * exports.products[0].price
    },
    {
        userId: "u001",
        product: "prd002",
        quantity: 1,
        totalPrice: 1 * exports.products[1].price
    },
    {
        userId: "u002",
        product: "prd002",
        quantity: 1,
        totalPrice: 1 * exports.products[1].price
    }];
const createPurchase = (userId, product, quantity, totalPrice) => {
    const newPurchase = {
        userId,
        product,
        quantity,
        totalPrice
    };
    if (newPurchase) {
        exports.purchase.push(newPurchase);
        console.log("Compra realizada com sucesso");
    }
    else {
        console.log("Não foi possível efetivar a compra.");
    }
    console.table(exports.purchase);
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    const purchasesProcuradas = exports.purchase.filter((purchases) => {
        return purchases.userId === userIdToSearch;
    });
    console.table(purchasesProcuradas);
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map