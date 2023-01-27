
import { TProduct, TPurchase, TUser } from "./type";
import  express, { Request, Response} from 'express';
import cors from 'cors';
import {db} from "./database/knex";


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g;

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
  });

  // ***** USERS *****

  // getAllUsers

  app.get('/users', async (req: Request, res: Response) => {
    try{

      const result = await db.raw(`
      SELECT * FROM users;
      `)

    res.status(200).send(result)
    } catch (error:any){
        console.log(error)

        if (res.statusCode === 200){
            res.status(500)
        }

        res.send(error.message)
    }
  });





  // createUser

  app.post('/users', async (req: Request, res: Response) => {
    try{
      

  const id = req.body.id as string | undefined;
  const name = req.body.name as string | undefined;
  const email = req.body.email as string | undefined;
  const password = req.body.password as string;
    

      const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
      };
  
    
      if (typeof id !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string");
      }
  
      if (id[0] !== "u") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'u'");
      }

      await db.raw(`
        INSERT INTO users (id, name, email, password)
        VALUES ("${id}", "${name}", "${email}", "${password}");
        `);

        res.send({ message: "Cadastro realizado com sucesso!" })





      const [userExists] = await db("user").where({id:id})

    if (userExists) {
      res.status(400)
      throw new Error("'id' já existente")
    }

       
    if (typeof email !== "string") {
      res.status(400)
      throw new Error("Digite um email válido")
    }

    
     if (!email.match(regexEmail)) {
       res.status(400);
       throw new Error(
         "Digite um email válido."
       );
    }

    const [emailExists] = await db("users").where({ email: email });

      if (emailExists) {
        res.status(400);
        throw new Error("'email' do usuário já existente");
      }
    

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'nome' deve ser uma string");
    }
    
    
    
    if (typeof password !== "string") {
      res.status(400)
      throw new Error("'password' deve ser uma string")
    }

    if (!password.match((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g))) {
      res.status(400)
      throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
    }


    await db("users").insert(newUser);

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
  app.delete("/users/:id", async (req:Request, res:Response)=>{

    try{

      const idToDelete = req.params.id;
      const [ result ] = await db("users").where({ id: idToDelete });

    if (idToDelete !== undefined) {
      if (typeof idToDelete !== "string") {
        res.status(400);
        throw new Error("'id' deve ser uma string");
      }

      if (idToDelete[0] !== "u") {
        res.status(400);
        throw new Error("'buyer_id' deve iniciar com a letra 'u'");
      }

      if (!result) {
        res.status(400);
        throw new Error("'id' não existe");
      }

      await db("purchases").del().where({ buyer_id: idToDelete })
      await db("purchases_products").del().where({ purchase_id: idToDelete })
      await db("users").del().where({ id: idToDelete });
     

      res.status(200).send("usuário deletado com sucesso");
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
app.put("/users/:id", async (req:Request, res:Response)=>{

    try{


  const idToEdit = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined;
  const newEmail = req.body.email as string | undefined
  const newPassword = req.body.password as string 

  const [userExists] = await db("users").where({ id: idToEdit });
  const [userIdExists] = await db("users").where({ id: newId });
  const [emailExists] = await db("users").where({ email: newEmail });

  
  if (typeof idToEdit !== "string") {
    res.status(400)
    throw new Error("'id' deve ser uma string")
  }

  if (idToEdit[0] !== "u") {
    res.status(400)
    throw new Error("'id' deve iniciar com a letra 'u'")
  }

  
  if (!userExists) {
    res.status(400);
    throw new Error("'id' não existente na base de dados");
  }

  if (newName !== undefined) {
    if (typeof newName !== "string") {
      res.status(400);
      throw new Error("'name' deve ser uma string");
    }
  }

  
    if (typeof newId !== "string") {
      res.status(400);
      throw new Error("'id' deve ser uma string");
    }

    if (newId[0] !== "u") {
      res.status(400);
      throw new Error("'id' deve iniciar com a letra 'u'");
    }
         

    if (newEmail !== undefined) {
      if (typeof newEmail !== "string") {
        res.status(400);
        throw new Error("'email' deve ser uma string");
      }

      if (!newEmail.match(regexEmail)) {
        res.status(400);
        throw new Error("'email' deve possuir as seguintes regras");
      }

      

      if (emailExists) {
        res.status(400);
        throw new Error("'email' já existente na base de dados");
      }
    }

    if (!newPassword.match(regexPassword)) {
      res.status(400);
      throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }
    const [user] = await db("users").where({ id: idToEdit });

    if (user) {
      const updatedUser = {
        id: newId || user.id,
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password,
      };

      await db("users").update(updatedUser).where({ id: idToEdit });
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send("usuário atualizado com sucesso");

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
  app.get('/products', async (req: Request, res: Response) => {

    try{

      const result = await db.raw (`
      SELECT * FROM products;
      `)

    res.status(200).send(result)
    }catch (error:any){
        if (res.statusCode === 200) {
            res.status(500)
          }
      
          res.send(error.message)

    }
  });




  // getProductByName
  app.get('/products/search', async (req: Request, res: Response) => {
    
    try {

      const q = req.query.q as string

      const result = await db("products").where("name", "LIKE", `%${q}%`);
      
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

  app.post('/products', async (req:Request, res: Response)=>{

    try{
    const {id,name,price, description, image_url} = req.body as TProduct

    const newProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      image_url: image_url,
    };



    const [productExists] = await db("products").where({ id: id });

    if (productExists) {
      res.status(400)
      throw new Error("'id' já existente")
    }

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (id[0] !== "p") {
      res.status(400)
      throw new Error("'id' deve iniciar com a letra 'p'")
    }


    if (typeof name !== "string") {
      res.status(400)
      throw new Error("'name' deve ser uma string")
    }

    if (typeof price !== "number") {
      res.status(400)
      throw new Error("'price' deve ser um number")
    }

    if (price <= 0) {
      res.status(400)
      throw new Error("'price' deve ser um número positivo")
    }
    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description' deve ser uma string");
    }

    if (typeof image_url !== "string") {
      res.status(400);
      throw new Error("'image' deve ser uma string");
    }
   

    await db("products").insert(newProduct);

    res.status(201).send("Produto cadastrado com sucesso!");
}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
})



// getProductById
app.get("/products/:id", async (req:Request, res:Response)=>{
  
  try{

    const idToSearch = req.params.id;

  
      if (typeof idToSearch !== "string") {
        res.status(400)
        throw new Error("'id' deve ser uma string")
      }
  
      if (idToSearch[0] !== "p") {
        res.status(400)
        throw new Error("'id' deve iniciar com a letra 'p'")
      }

      const [productExists] = await db("products").where({id:idToSearch});
  
      if (!productExists) {
        res.status(400)
        throw new Error("'id' não existente na base de dados")
      }

      const result = await db("products").where({ id: idToSearch });

      res.status(200).send(result);

}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
   
})



// deleteProductById
app.delete("/products/:id", async (req:Request, res:Response)=>{

    try{

  const idToDelete = req.params.id
  const result = await db("products").where({ id: idToDelete });




  if (typeof idToDelete !== "string") {
    res.status(400)
    throw new Error("'id' deve ser uma string")
  }

  if (idToDelete[0] !== "p") {
    res.status(400)
    throw new Error("'userId' deve iniciar com a letra 'p'")
  }

  if (!result) {
    res.status(404)
    throw new Error("'id' não existente na base de dados")
  }
  
  await db("products").del().where({ id: idToDelete });

    res.status(200).send("produto deletado com sucesso");

  
}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }

})

// editProductById

app.put("/products/:id", async (req:Request, res:Response)=>{

try{

  const id = req.params.id

  const newId = req.body.id as string | undefined;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newdescription = req.body.description as string | undefined;
    const newImage = req.body.image_url as string | undefined;

  const productExists = await db("products").where({ id: id });

  const [product] = await db("products").where({ id: id });

  if (typeof id !== "string") {
    res.status(400);
    throw new Error("'id' deve ser uma string");
  }

  if (id[0] !== "p") {
    res.status(400);
    throw new Error("'id' deve iniciar com a letra 'p'");
  }

  if (!productExists) {
    res.status(400);
    throw new Error("'id' não existente na base de dados");
  }


  if(product){

    const updatedProduct = {

      id : newId || product.id,
      name:newName || product.name,
      price: newPrice || product.price,
      description: newdescription || product.description,
        imageUrl: newImage || product.imageUrl,
  }

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
  
      if (typeof newId !== "string") {
          res.status(400)
          throw new Error("'id' deve ser uma string")
      }
    
      if (newId[0] !== "p") {
          res.status(400)
          throw new Error("'id' deve iniciar com a letra 'p'")
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

      if (typeof newdescription !== "string") {
        res.status(400);
        throw new Error("'description' deve ser uma stringr");
      }
    }

    if (newImage !== undefined) {
      if (typeof newImage !== "string") {
        res.status(400);
        throw new Error("'image' deve ser uma string");
      }
  

      res.status(201).send('Produto Atualizado com sucesso')
        
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

app.get('/purchase', async(req:Request, res:Response)=>{
  try{

    const result = await db("purchases");

    res.status(200).send(result);

  }catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
    
});

// createPurchase
app.post('/purchase', async (req:Request, res: Response)=>{

    try{
    const {id, total_price, buyer_id} = req.body as TPurchase

    const newPurchase = {
      id: id,
      buyer_id: buyer_id,
      total_price: total_price,
    }

    const [purchaseExists] = await db("purchases").where({ id: id });

    
    if (!id) {
      res.status(404)
      throw new Error("Compra não existente")
    }

    if (typeof id !== "string") {
      res.status(400)
      throw new Error("'id' deve ser uma string")
    }

    if (purchaseExists) {
      res.status(400);
      throw new Error("'id' da compra já existente");
    }


    
      if (typeof buyer_id !== "string") {
        res.status(400);
        throw new Error("'buyer' deve ser uma string");
      }

      const [buyerExists] = await db("users").where({ id: buyer_id });

      if (!buyerExists) {
        res.status(400);
        throw new Error("'id' de usuário não existente");
      }

      if (typeof total_price !== "number") {
        res.status(400);
        throw new Error("'totalPrice' deve ser um number");
      }
  
      if (total_price <= 0) {
        res.status(400);
        throw new Error("'totalPrice' deve ser um número positivo");
      }

      await db("purchases").insert(newPurchase);

    res.status(201).send('Compra realizada com sucesso')
}catch (error: any) {
    console.log(error)

    if (res.statusCode === 201) {
      res.status(500)
    }

    res.send(error.message)
  }
})


// getUserPurchaseByUserId

app.get("/users/:id/purchases", async (req:Request, res:Response)=>{
  
    try{

      const id = req.params.id;
      const userExist = await db("purchases").where({ buyer_id: id });
      const result: TPurchase[] | undefined[] = await db("purchases")
            .select("id", "buyer_id AS buyerID", "total_price AS totalPrice", "created_at AS createAt","paid AS Ispaid")
            .where({ buyer_id: id })


      
        if (typeof id !== "string") {
          res.status(400);
          throw new Error("'id' deve ser uma string");
        }
  
        if (id[0] !== "u") {
          res.status(400);
          throw new Error("'id' deve iniciar com a letra 'u'");
        }
        
  
        if (!userExist) {
          res.status(400);
          throw new Error("'id' de usuário não existente");
        }

        if (result) {
          res.status(200).send(result);
        }    
  
      
    } catch (error: any) {
      console.log(error);
  
      if (req.statusCode === 200) {
        res.status(500);
      }
  
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  });



  // getPurchaseById

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const [purchase] = await db("purchases").where({ id: id });

    if (purchase) {
      const [dataPurchase] = await db("purchases")
        .select(
          "purchases.id AS purchasesId",
          "purchases.total_price AS totalPrice",
          "purchases.created_at AS createdAt",
          "purchases.paid AS paid",
          "users.id AS buyerId",
          "users.email",
          "users.name"
        )
        .innerJoin("users", "purchases.buyer_id", "=", "users.id");

      const purchaseProducts = await db("purchases_products")
        .select(
          "purchases_products.product_id AS id",
          "products.name",
          "products.price",
          "products.description",
          "products.imageUrl AS urlImage",
          "purchases_products.quantity"
        )
        .innerJoin(
          "products",
          "products.id",
          "=",
          "purchases_products.product_id"
        );

      const result = {
        ...dataPurchase,
        paid: dataPurchase.paid === 0 ? false : true,
        productsList: purchaseProducts,
      };

      res.status(200).send(result);
    } else {
      res.status(404);
      throw new Error("Compra não encontrada");
    }
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.delete('/purchases/:id', async (req: Request, res: Response) => {
  try {
      const id = req.params.id
      if (typeof id !== "string") {
          res.status(400)
          throw new Error("Id precisa ser um string");
      }
      if (id[0] !== "p") {
          res.status(400)
          throw new Error("Id de purchases precisa comecar com p");
      }

      await db("purchases").del().where({ id: id })
      await db("purchases_products").del().where({ purchase_id: id })
      
      res.status(200).send({ message: "Compra apgada com sucesso" })

  } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
          res.status(500)
      }

      if (error instanceof Error) {
          res.send({ message: error.message })
      } else {
          res.send({ message: "Erro inesperado" })
      }
  }
})