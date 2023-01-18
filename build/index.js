"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const type_1 = require("./type");
(0, database_1.createUser)("u006", "tequila@mail.com", "lp312388");
(0, database_1.getAllUsers)();
(0, database_1.createProduct)("prd007", "Televisor 40'", 1899.9, type_1.PRODUCT_CATEGORY.ELECTRONICS);
(0, database_1.getAllProducts)();
(0, database_1.getProductById)("prd007");
(0, database_1.getProductByName)("Blusa");
(0, database_1.createPurchase)("u003", "prd003", 2, 2 * database_1.products[2].price);
(0, database_1.getAllPurchasesFromUserId)("u001");
//# sourceMappingURL=index.js.map