import { Request, Response } from "express";
import Order, { IOrder } from "../model/Order";
import Product from "../model/model";

const getOrder = async (req: Request, res: Response) => {
  try {
    const { userDetails, cartItems, paymentMethod, totalPrice } = req.body;

    // Logging the request body for debugging
    console.log('Received order:', req.body);

    // Validate required fields
    if (!userDetails || !cartItems || !paymentMethod || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new order
    const newOrder: IOrder = new Order({
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      deliveryAddress: userDetails.deliveryAddress,
      items: cartItems.map((item: any) => ({
        productId: item._id,
        quantity: item.quantity || 1,  
      })),
      paymentMethod,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    console.log('Order saved:', savedOrder);

    // Update product stock quantities
    for (const item of cartItems) {
      const product = await Product.findById(item._id);
      if (product) {
        product.stockQuantity -= item.quantity || 1;
        await product.save();
        console.log('Product updated:', product);
      }
    }

    res.status(201).json(savedOrder);
  } catch (err: any) {
    console.error('Error processing order:', err);
    res.status(500).json({ message: err.message });
  }
};

export default getOrder;
