"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
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
//# sourceMappingURL=database.js.map