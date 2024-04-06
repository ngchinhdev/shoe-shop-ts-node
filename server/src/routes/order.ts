import { Router } from "express";
import { createOrder, getAllOrders, getOrder, updateOrder } from "../controllers/order";
import uploadFiles from "../utils/uploadFiles";
import { checkValidID } from "../middlewares/helpers";

const router = Router();

router.get('/', getAllOrders);

router.get('/:id', checkValidID, getOrder);

router.post('/', uploadFiles.none(), createOrder);

router.put('/:id', checkValidID, updateOrder);

export default router;