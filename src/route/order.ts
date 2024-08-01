import { Router } from "express";
import getOrder from "../controller/order";


const router = Router();

router.post('/', getOrder);

export default router;