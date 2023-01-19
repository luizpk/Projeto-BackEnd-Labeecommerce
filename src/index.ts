import { users, products, purchase, createProduct, createUser, getAllProducts, getAllUsers, getProductById, getProductByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { PRODUCT_CATEGORY, TProduct, TPurchase, TUser } from "./type";
import  express, { Request, Response} from 'express';
import cors from 'cors';

// console.log(users);
// console.log(products);
// console.log(purchase);

// createUser("u006", "tequila@mail.com", "lp312388" );
// getAllUsers();

// createProduct("prd007", "Televisor 40'", 1899.9,PRODUCT_CATEGORY.ELECTRONICS);
// getAllProducts();
// getProductById("prd007");
// getProductByName("Blusa");
// createPurchase("u003","prd003",2,2*products[2].price);
// getAllPurchasesFromUserId("u001");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
  });

  // ***** USERS *****

  // getAllUsers

  app.get('/users', (req: Request, res: Response) => {
    try{
    res.status(200).send(users)
    } catch (error:any){
        console.log(error)

        if (res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
  });

  // createUser

  app.post('/users', (req: Request, res: Response) => {
    try{
      const { id, email, password } = req.body as TUser
  
      const newUser = {
        id,
        email,
        password
      }

      if (typeof newUser.id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string");
      }
  
      if (newUser.id[0] !== "u") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'u'");
      }

      const ids = users.find((user) => user.id === id)

    if (ids) {
      res.status(400)
      throw new Error("'id' já existente")
    }

    if (typeof newUser.email !== "string") {
      res.status(400)
      throw new Error("Digite um email válido")
    }

    
    if (!newUser.email.includes("@")) {
      res.status(400)
      throw new Error("Digite um email válido")
    }

    
    const emails = users.find((user) => user.email === email)

    if (emails) {
      res.status(400)
      throw new Error("'email' já existente")
    }

    if (typeof newUser.password !== "string") {
      res.status(400)
      throw new Error("'password' deve ser uma string")
    }

    if (!newUser.password.match((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g))) {
      res.status(400)
      throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
    }


      users.push(newUser)

      res.status(201).send('Usuário registrado com sucesso')
    }catch (error:any){
        console.log(error)

        if (res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
  })

  // deleteUserById
  app.delete("/users/:id", (req:Request, res:Response)=>{

    try{
    const id = req.params.id

    const usuarioIndex = users.findIndex((users)=>{
        return users.id === id
    })

    const result = users.find((user) => {
        return user.id === id
      })


    if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }
  
      if (id[0] !== "u") {
        res.status(400)
        throw new Error("'userId' deve iniciar com a letra 'u'")
      }

      if (!result) {
        res.status(400)
        throw new Error("'id' não existente na base de dados")
      }

    
    if(usuarioIndex>=0){
        users.splice(usuarioIndex,1)
        res.status(200).send("Usuário deletado com sucesso")

    }else {
        res.status(404).send("Usuário não encontrado")
    }
}catch (error:any){
    console.log(error)

    if (res.statusCode === 200){
        res.status(500)
    }

    res.send(error.message)
}

})

// editUserById
app.put("/users/:id", (req:Request, res:Response)=>{

    try{
  const id = req.params.id
  const newId = req.body.id as string | undefined
  const newEmail = req.body.email as string | undefined
  const newPassword = req.body.password as string | undefined
  
  if (typeof id !== "string") {
    res.status(400)
    throw new Error("'id' deve ser uma string")
  }

  if (id[0] !== "a") {
    res.status(400)
    throw new Error("'id' deve iniciar com a letra 'a'")
  }

  const userEdit = users.find((userEdit)=>{
      return userEdit.id === id
  })

  if(userEdit){
      userEdit.id = newId || userEdit.id
      userEdit.email = newEmail || userEdit.email
      userEdit.password = newPassword || userEdit.password

      res.status(200).send("Usuário modificado com sucesso")
  } else {
      res.status(404).send("Usuário não encontrado")
  }

  if(newId !== undefined) {
    if (typeof newId !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (newId[0] !== "a") {
      res.status(400)
      throw new Error("'id' deve iniciar com a letra 'a'")
    }

    const userId = users.find((user) => {
      return user.id === newId
    })

    if (userId) {
      res.status(400)
      throw new Error("'id' já existente base de dados")
    }
  }

  if (newEmail !== undefined) {
    if (typeof newEmail !== "string") {
      res.status(400)
      throw new Error("'email' deve ser uma string")
    }

    if (!newEmail.match((/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))) {
      res.status(400)
      throw new Error("'email' deve possuir as seguintes regras")
    }}


  res.status(200).send("usuário editado com sucesso")

}catch (error:any){
    console.log(error)

    if (res.statusCode === 200){
        res.status(500)
    }

    res.send(error.message)
}
})
  




  // ***** PRODUCTS *****

  // getAllProducts
  app.get('/products', (req: Request, res: Response) => {

    try{
    res.status(200).send(products)
    }catch (error:any){
        if (res.statusCode === 200) {
            res.status(500)
          }
      
          res.send(error.message)

    }
  });

  // getProductByName
  app.get('/products/search', (req: Request, res: Response) => {
    
    try {
      const q = req.query.q as string
      const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
      })  
      
      if (q.length < 1) {
        res.status(400)
        throw new Error("'query params' deve conter pelo menos um caractere");
      }
  
      if (result.length < 1) {
        res.status(400)
        throw new Error("produto não encontrado");
      }

      res.status(200).send(result)

    }catch (error:any){
        if (res.statusCode === 200) {
            res.status(500)
          }
      
          res.send(error.message)
        }
      
  })

  // createProduct

  app.post('/products', (req:Request, res: Response)=>{

    try{
    const {id,name,price, category} = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category
    }

    const ids = products.find((product) => product.id === id)

    if (ids) {
      res.status(400)
      throw new Error("'id' já existente")
    }

    if (typeof newProduct.id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (newProduct.id[0] !== "p") {
      res.status(400)
      throw new Error("'id' deve iniciar com a letra 'p'")
    }

    if (typeof newProduct.name !== "string") {
      res.status(400)
      throw new Error("'name' deve ser uma string")
    }

    if (typeof newProduct.price !== "number") {
      res.status(400)
      throw new Error("'price' deve ser um number")
    }

    if (newProduct.price <= 0) {
      res.status(400)
      throw new Error("'price' deve ser um número positivo")
    }

    if (
      newProduct.category !== PRODUCT_CATEGORY.ACCESSORIES &&
      newProduct.category !== PRODUCT_CATEGORY.CLOTHES_AND_SHOES &&
      newProduct.category !== PRODUCT_CATEGORY.ELECTRONICS) {
      res.status(400)
      throw new Error("'category' deve ser do tipo? Acessórios, Roupas e Calçados ou Eletrônicos")
    }


    products.push(newProduct)

    res.status(201).send('Produto registrado com sucesso')
}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
})

// getProductById
app.get("/products/:id", (req:Request, res:Response)=>{
  
  try{
  const id = req.params.id
  const result = products.find((product)=>{
      return product.id === id
  })

  if (typeof id !== "string") {
    res.status(400)
    throw new Error("'id' deve ser uma string")
  }

  if (id[0] !== "p") {
    res.status(400)
    throw new Error("'userId' deve iniciar com a letra 'p'")
  }

  if (!result) {
    res.status(400)
    throw new Error("'id' não existente")
  }



  res.status(200).send(result)


}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
   
})

// deleteProductById
app.delete("/products/:id", (req:Request, res:Response)=>{

    try{
  const id = req.params.id

  const productIndex = products.findIndex((product)=>{
      return product.id === id
  })

  const productIds = products.find((product) => {
    return product.id === id
  })


  if (typeof id !== "string") {
    res.status(400)
    throw new Error("'id' deve ser uma string")
  }

  if (id[0] !== "p") {
    res.status(400)
    throw new Error("'userId' deve iniciar com a letra 'p'")
  }

  if (!productIds) {
    res.status(404)
    throw new Error("'id' não existente na base de dados")
  }
  

  if(productIndex>=0){
      products.splice(productIndex,1)
      res.status(200).send("Produto deletado com sucesso")

  }else {
      res.status(404).send("Produto não encontrado")
  }
}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }

})

// editProductById

app.put("/products/:id", (req:Request, res:Response)=>{

try{
  const id = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newCategory = req.body.category as PRODUCT_CATEGORY | undefined

  const product = products.find((product)=>{
      return product.id === id
  })

  if(product){
      product.id = newId || product.id
      product.name = newName || product.name
      product.price = newPrice || product.price
      product.category = newCategory || product.category

      if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }
  
      if (id[0] !== "p") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'p'")
      }
  
      if (!product) {
        res.status(400)
        throw new Error("'id' não existente na base de dados")
      }
  
      if(newId !== undefined) {
        if (typeof newId !== "string") {
          res.status(400)
          throw new Error("'id' deve ser uma string")
        }
    
        if (newId[0] !== "p") {
          res.status(400)
          throw new Error("'id' deve iniciar com a letra 'p'")
        }
  
        const product = products.find((product) => {
          return product.id === newId
        })
    
        if (product) {
          res.status(400)
          throw new Error("'id' já existente base de dados")
        }
      }
  
      if (newName !== undefined) {
        if (typeof newName !== "string") {
          res.status(400)
          throw new Error("'name' deve ser uma string")
        }
      }
  
      if (newPrice !== undefined) {
        if (typeof newPrice !== "number") {
          res.status(400)
          throw new Error("'price' deve ser um number")
        }
      }
  
      if (newCategory !== undefined) {
        if (
          newCategory !== PRODUCT_CATEGORY.ACCESSORIES &&
          newCategory !== PRODUCT_CATEGORY.CLOTHES_AND_SHOES &&
          newCategory !== PRODUCT_CATEGORY.ELECTRONICS) {
          res.status(400)
          throw new Error("'category' deve ser do tipo? Acessórios, Roupas e Calçados ou Eletrônicos")
        }
      }
  
      if (product) {
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category
      }
  


      res.status(404).send("Produto não encontrado")
  


}}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }

})


// ***** PURCHASES *****

// getAllPurchases
app.get('/purchase',(req:Request, res:Response)=>{
    res.status(200).send(purchase)
});

// createPurchase
app.post('/purchase', (req:Request, res: Response)=>{

    try{
    const {userId,product,quantity, totalPrice} = req.body as TPurchase

    const newPurchase = {
        userId,
        product,
        quantity,
        totalPrice
    }

    const userIds = users.find((user) => user.id === userId)

    if (!userIds) {
      res.status(404)
      throw new Error("'id' do usuário não existente")
    }

    if (typeof newPurchase.userId !== "string") {
      res.status(400)
      throw new Error("'userId' deve ser uma string")
    }

    if (newPurchase.userId[0] !== "u") {
      res.status(400)
      throw new Error("'userId' deve iniciar com a letra 'u'")
    }

    const productIds = products.find((products) => products.id === product)

    if (!productIds) {
      res.status(404)
      throw new Error("'id' do produto não existente")
    }

    if (typeof newPurchase.product !== "string") {
      res.status(400)
      throw new Error("'productId' deve ser uma string")
    }

    if (newPurchase.product[0] !== "p") {
      res.status(400)
      throw new Error("'productId' deve iniciar com a letra 'p'")
    }

    const foundPrice = products.find((product) => {
      return product.price === productIds.price
    })

    if(!foundPrice) {
      res.status(400)
      throw new Error("Produto não encontrado");
    } 

    if(totalPrice !== quantity * productIds.price) {
      res.status(400)
      throw new Error("A quantidade ou o preço está incorreto");
    }

    if (typeof newPurchase.quantity !== "number") {
      res.status(400)
      throw new Error("'quantity' deve ser um number")
    }

    if (newPurchase.quantity <= 0) {
      res.status(400)
      throw new Error("'quantity' deve ser um número positivo")
    }

    if (typeof newPurchase.totalPrice !== "number") {
      res.status(400)
      throw new Error("'totalPrice' deve ser um number")
    }

    if (newPurchase.totalPrice <= 0) {
      res.status(400)
      throw new Error("'totalPrice' deve ser um número positivo")
    }


    purchase.push(newPurchase)

    res.status(201).send('Compra realizada com sucesso')
}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
})


// getPurchaseByUserId
app.get("/purchase/:id", (req:Request, res:Response)=>{
  
    try{
  const userId = req.params.id
  const result = purchase.find((purchases)=>{
      return purchases.userId === userId
  })

  if (typeof userId !== "string") {
    res.status(400)
    throw new Error("'id' deve ser uma string")
  }

  if (userId[0] !== "u") {
    res.status(400)
    throw new Error("'userId' deve iniciar com a letra 'u'")
  }

  if (!result) {
    res.status(400)
    throw new Error("'id' não existente")
  }



  res.status(200).send(result)

}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
   
})