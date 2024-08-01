"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("./route/product"));
const body_parser_1 = __importDefault(require("body-parser"));
const order_1 = __importDefault(require("./route/order"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use(body_parser_1.default.json());
// Routes
app.use('/api/products', product_1.default);
app.use('/api/orders', order_1.default);
// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the assignment-4 backend');
});
exports.default = app;
