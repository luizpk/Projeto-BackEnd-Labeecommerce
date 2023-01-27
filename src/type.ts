
export type TUser = {

    id:string,
    name: string | void,
    email:string | undefined,
    password:string | undefined,
    created_at: string
};

export type TProduct = {

    id: string,
    name:string,
    price: number,
    description: string;
    image_url: string
};

export type TPurchase = {
    id: string,
    buyer_id: string,
    total_price: number,
    created_at: string,
    paid: boolean
};







  