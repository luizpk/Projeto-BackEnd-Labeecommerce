export enum PRODUCT_CATEGORY {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
};

export type TUser = {

    id:string,
    email:string,
    password:string | undefined
};

export type TProduct = {

    id: string,
    name:string,
    price: number,
    category: PRODUCT_CATEGORY
};

export type TPurchase = {
    
    userId:string,
    product: string,
    quantity: number,
    totalPrice: number
};