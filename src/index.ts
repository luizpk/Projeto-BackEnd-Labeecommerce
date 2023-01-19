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
    res.status(200).send(users)
  });

  // createUser

  app.post('/users', (req: Request, res: Response) => {
    
      const { id, email, password } = req.body as TUser
  
      const newUser = {
        id,
        email,
        password
      }

      users.push(newUser)

      res.status(201).send('Usuário registrado com sucesso')
  
  })

  // deleteUserById
  app.delete("/users/:id", (req:Request, res:Response)=>{

    const id = req.params.id

    const usuarioIndex = users.findIndex((users)=>{
        return users.id === id
    })

    console.log("Index:", usuarioIndex)

    if(usuarioIndex>=0){
        users.splice(usuarioIndex,1)
        res.status(200).send("Usuário deletado com sucesso")

    }else {
        res.status(404).send("Usuário não encontrado")
    }

})

// editUserById
app.put("/users/:id", (req:Request, res:Response)=>{

  const id = req.params.id

  const newId = req.body.id as string | undefined
  const newEmail = req.body.email as string | undefined
  const newPassword = req.body.password as string | undefined
  

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
})
  




  // ***** PRODUCTS *****

  // getAllProducts
  app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
  });

  // getProductByName
  app.get('/products/search', (req: Request, res: Response) => {
    
      const q = req.query.q as string
      const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
      })  
      
      res.status(200).send(result)
      
  })

  // createProduct

  app.post('/products', (req:Request, res: Response)=>{
    const {id,name,price, category} = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send('Produto registrado com sucesso')

})

// getProductById
app.get("/products/:id", (req:Request, res:Response)=>{
    
  const id = req.params.id
  const result = products.find((product)=>{
      return product.id === id
  })
  res.status(200).send(result)
   
})

// deleteProductById
app.delete("/products/:id", (req:Request, res:Response)=>{

  const id = req.params.id

  const productIndex = products.findIndex((product)=>{
      return product.id === id
  })

  console.log("Index:", productIndex)

  if(productIndex>=0){
      products.splice(productIndex,1)
      res.status(200).send("Produto deletado com sucesso")

  }else {
      res.status(404).send("Produto não encontrado")
  }

})

// editProductById

app.put("/products/:id", (req:Request, res:Response)=>{

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

      res.status(200).send("Produto modificado com sucesso")
  } else {
      res.status(404).send("Produto não encontrado")
  }
})

// ***** PURCHASES *****

// getAllPurchases
app.get('/purchase',(req:Request, res:Response)=>{
    res.status(200).send(purchase)
});

// createPurchase
app.post('/purchase', (req:Request, res: Response)=>{
    const {userId,product,quantity, totalPrice} = req.body as TPurchase

    const newPurchase = {
        userId,
        product,
        quantity,
        totalPrice
    }

    purchase.push(newPurchase)

    res.status(201).send('Compra realizada com sucesso')

})


// getPurchaseByUserId
app.get("/purchase/:id", (req:Request, res:Response)=>{
    
  const userId = req.params.id
  const result = purchase.find((purchases)=>{
      return purchases.userId === userId
  })
  res.status(200).send(result)
   
})