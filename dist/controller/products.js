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
exports.updateProduct = exports.deleteProduct = exports.addProduct = exports.getProduct = exports.getProducts = void 0;
const model_1 = __importDefault(require("../model/model"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield model_1.default.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield model_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getProduct = getProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, stockQuantity, brand, rating, description, price, image } = req.body;
    const newProduct = new model_1.default({
        name,
        category,
        stockQuantity,
        brand,
        rating,
        description,
        price,
        image,
    });
    try {
        const saveProduct = yield newProduct.save();
        res.status(201).json(saveProduct);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield model_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        yield product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Product deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield model_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        const { name, category, stockQuantity, brand, rating, description, price, image } = req.body;
        if (name) {
            product.name = name;
        }
        if (category) {
            product.category = category;
        }
        if (stockQuantity) {
            product.stockQuantity = stockQuantity;
        }
        if (brand) {
            product.brand = brand;
        }
        if (rating) {
            product.rating = rating;
        }
        if (description) {
            product.description = description;
        }
        if (price) {
            product.price = price;
        }
        if (image) {
            product.image = image;
        }
        const updatedProduct = yield product.save();
        res.json(updatedProduct);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateProduct = updateProduct;
