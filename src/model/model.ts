import mongoose, { Document,Schema } from "mongoose";



interface IProduct extends Document {
  name: string;
  category: string;
  stockQuantity: number;
  brand: string; 
  rating: string;
  description: string;
  price: number;
  image: string;
  

}


const productSchema:Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
   category: {
     type: String,
     required: true,

   }, 
   stockQuantity: {
        type: Number,
        required: true,
    },
   brand: {
     type: String,
     required: true,

   }, 
   rating: {
    type: Number,
    required: true,
   },
   description: {
    type: String,
    required: true,
   },
   price: {
    type: Number,
    required: true,
   },
   image: {
    type: String,
    required: true,
   },
   
});

const Product  = mongoose.model<IProduct>('Product', productSchema)

export default Product;
