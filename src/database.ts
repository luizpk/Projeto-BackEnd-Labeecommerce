import { TUser, TProduct, TPurchase, PRODUCT_CATEGORY} from "./type";



// ***** USERS *****

export const users :TUser []=[{
    id:"u001",
    email:"luizpaulo@mail.com",
    password:"lp312388"
},
{
    id:"u002",
    email:"thalitacepa@mail.com",
    password:"lp312388"
},
{
    id:"u003",
    email:"luizpaulo02@mail.com",
    password:"lp312388"
},
{
    id:"u004",
    email:"paulopinheiro@mail.com",
    password:"lp312388"
},
{
    id:"u005",
    email:"jackdoguinho@mail.com",
    password:"lp312388"
},
];

export const createUser = (id:string, email:string, password:string)=>{

    const user : TUser ={

        id,
        email,
        password
    }
    if (user) {
        users.push(user)
        console.log ("Usuário criado com sucesso")
    } else {
        console.log ("Usuário não foi criado")
    }
};


export const getAllUsers = () => {
    console.log(users)
};



// ***** PRODUCTS *****


export const products:TProduct[]=[{

    id: "prd001",
    name:"Blusa Azul",
    price: 49.9,
    category: PRODUCT_CATEGORY.CLOTHES_AND_SHOES
},
{

    id: "prd002",
    name:"Vestido Plissado",
    price: 89.9,
    category: PRODUCT_CATEGORY.CLOTHES_AND_SHOES
},
{

    id: "prd003",
    name:"Calça Wide Leg",
    price: 78.9,
    category: PRODUCT_CATEGORY.CLOTHES_AND_SHOES
},
{

    id: "prd004",
    name:"Óculos de Gatinho",
    price: 39.9,
    category: PRODUCT_CATEGORY.ACCESSORIES
}]

export const createProduct =(id:string, name:string, price:number, category: PRODUCT_CATEGORY): void =>{

    const product: TProduct = {
        id,
        name,
        price,
        category
    }
    if (product) {
        products.push(product)
        console.log("Produto criado com sucesso")
    } else {
        console.log("Produto não foi cadastrado.")
    }
}

export const getAllProducts = () => {
    console.log(products)
}

export const getProductById = (idToSearch: string): TProduct[] | void => {
    const productProcurado = products.filter((product) => {
        return product.id === idToSearch
    })
        console.log(productProcurado)
      
}

export const getProductByName = (query: string): TProduct[] | void => {
    const productProcurado = products.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase())
    })
    console.log(productProcurado)
};

// ***** PURCHASES *****



export const purchase:TPurchase[]=[{
    userId:"u001",
    product: "prd001",
    quantity: 2,
    totalPrice: 2*products[0].price
},
{
    userId:"u001",
    product: "prd002",
    quantity: 1,
    totalPrice: 1*products[1].price
},
{
    userId:"u002",
    product: "prd002",
    quantity: 1,
    totalPrice: 1*products[1].price
}]

export const createPurchase =(userId:string, product:string, quantity:number, totalPrice: number): void =>{

    const newPurchase: TPurchase = {
        userId,
        product,
        quantity,
        totalPrice
    }
    if (newPurchase) {
        purchase.push(newPurchase)
        console.log("Compra realizada com sucesso")
    } else {
        console.log("Não foi possível efetivar a compra.")
    }
    
    console.table(purchase)
}

export const getAllPurchasesFromUserId = (userIdToSearch: string): TPurchase[] | void => {
    const purchasesProcuradas = purchase.filter((purchases) => {
        return purchases.userId === userIdToSearch
    })
    
    console.table(purchasesProcuradas)
}