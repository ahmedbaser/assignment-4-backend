"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controller/products");
const router = express_1.default.Router();
router.get('/', products_1.getProducts);
router.get('/:id', products_1.getProduct);
router.post('/', products_1.addProduct);
router.delete('/:id', products_1.deleteProduct);
router.put('/:id', products_1.updateProduct);
exports.default = router;
