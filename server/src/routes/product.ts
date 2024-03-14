import { Router } from "express";

import * as productController from "../controllers/products";

const router = Router();

router.get('/', productController.getProducts);

router.get('/:id', productController.getProduct);

router.post('/', productController.createProduct);

router.delete('/:id', productController.deleteProduct);

export default router;