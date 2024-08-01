import { Request, Response } from "express";
import Product from "../model/model"

export const getProducts = async(req:Request, res:Response) => {
    try {
       const products = await Product.find();
       res.json(products);
        
    }catch(err) {
       res.status(500).json({message: err.message}) 
    }
}

export const getProduct = async(req: Request, res:Response) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            res.status(404).json({message: 'Product not found'});
            return;
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}


export const addProduct = async(req: Request, res: Response) => {
    const {name, category, stockQuantity, brand, rating, description, price, image} = req.body;

    const newProduct = new Product({
       name,
       category, 
       stockQuantity, 
       brand, 
       rating, 
       description, 
       price, 
       image,

});

try{
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
    }catch(err) {
    res.status(400).json({message: err.message});
  }
}

export const deleteProduct = async(req: Request, res: Response) => {
      try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            res.status(404).json({message: 'Product not found'});
           return; 
        }

       await product.deleteOne({_id: req.params.id});
        res.json({message: 'Product deleted'})
      } catch(err) {
        res.status(500).json({message: err.message})
      }
}

export const updateProduct = async(req: Request, res:Response) => {
   try {
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404).json({message: 'Product not found'});
        return;
    }
    
  const {name, category, stockQuantity, brand, rating, description, price, image} = req.body;
   
    if(name) {
        product.name = name;
    }
    if(category) {
        product.category = category;
    }
    if(stockQuantity) {
        product.stockQuantity = stockQuantity;
    }
    if(brand) {
        product.brand = brand;
    }
    if(rating) {
        product.rating = rating;
    }
    if(description) {
        product.description = description;
    }
    if(price) {
        product.price= price;
    }
    if(image) {
        product.image = image;
    }
   const updatedProduct = await product.save();
   res.json(updatedProduct)
   
   } catch(err) {
    res.status(400).json({message: err.message});
   }   
}
