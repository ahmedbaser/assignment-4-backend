import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: string;
  totalPrice: number;
  status: string;
}

const OrderSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  paymentMethod: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;




