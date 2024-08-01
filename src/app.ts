import express, {Request, Response} from "express";
import productRoutesAll from './route/product'
import bodyParser from "body-parser";
import orderRoutes from './route/order';
import path from "path";

const cors = require('cors');

const app = express()
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api/products', productRoutesAll);
app.use('/api/orders', orderRoutes)


// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the assignment-4 backend')
})


export default app;