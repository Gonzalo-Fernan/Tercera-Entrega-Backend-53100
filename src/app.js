

import express from "express";
import ProductManager from "./index.js";

const app = express()
app.use(express.urlencoded({extended: true}));

const port = 8080
const PATH = "./src/products.json"
const products = new ProductManager(PATH)
const getAllProducts = await products.getProducts()



//app.use(express.json())

app.get("/products", async (req, res) =>{

    let limit = parseInt(req.query.limit)

    if (limit) {

        let allProducts = await getAllProducts
        let queryLimit = allProducts.slice(0,limit)
       return res.send(queryLimit) 

    }else{
        
        return res.send(getAllProducts)

    }

    

    
})

app.get("/products/:pid", async (req, res) =>{

let prodID = parseInt(req.params.pid)

let allProducts = await getAllProducts

let productSelected = allProducts.find((prod)=> prod.id === prodID)

res.send(productSelected)
    
})

app.listen(port, () => console.log("funciona"))
