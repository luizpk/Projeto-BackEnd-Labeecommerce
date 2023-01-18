import { users, products, purchase, createProduct, createUser, getAllProducts, getAllUsers, getProductById, getProductByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { PRODUCT_CATEGORY, TProduct, TPurchase, TUser } from "./type";

// console.log(users);
// console.log(products);
// console.log(purchase);

createUser("u006", "tequila@mail.com", "lp312388" );
getAllUsers();

createProduct("prd007", "Televisor 40'", 1899.9,PRODUCT_CATEGORY.ELECTRONICS);
getAllProducts();
getProductById("prd007");
getProductByName("Blusa");
createPurchase("u003","prd003",2,2*products[2].price);
getAllPurchasesFromUserId("u001");