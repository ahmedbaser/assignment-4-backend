"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../model/Order"));
const model_1 = __importDefault(require("../model/model"));
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userDetails, cartItems, paymentMethod, totalPrice } = req.body;
        // Logging the request body for debugging
        console.log('Received order:', req.body);
        // Validate required fields
        if (!userDetails || !cartItems || !paymentMethod || !totalPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Create new order
        const newOrder = new Order_1.default({
            name: userDetails.name,
            email: userDetails.email,
            phone: userDetails.phone,
            deliveryAddress: userDetails.deliveryAddress,
            items: cartItems.map((item) => ({
                productId: item._id,
                quantity: item.quantity || 1, // Assuming each cart item has a quantity field
            })),
            paymentMethod,
            totalPrice,
        });
        const savedOrder = yield newOrder.save();
        console.log('Order saved:', savedOrder);
        // Update product stock quantities
        for (const item of cartItems) {
            const product = yield model_1.default.findById(item._id);
            if (product) {
                product.stockQuantity -= item.quantity || 1;
                yield product.save();
                console.log('Product updated:', product);
            }
        }
        res.status(201).json(savedOrder);
    }
    catch (err) {
        console.error('Error processing order:', err);
        res.status(500).json({ message: err.message });
    }
});
exports.default = getOrder;
