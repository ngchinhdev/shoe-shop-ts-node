import { Router } from "express";

import * as productController from "../controllers/products";

const router = Router();

router.get('/', productController.getProducts);

router.get('/:id', productController.getProduct);

router.post('/', productController.createProduct);

export default router;