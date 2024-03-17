import { Router } from "express";

import uploadFiles from "../utils/uploadFiles";

import * as productController from "../controllers/products";

const router = Router();

router.get('/', productController.getProducts);

router.get('/:id', productController.getProduct);

router.post('/', uploadFiles.array('images'), productController.createProduct);

router.put('/:id', uploadFiles.array('images'), productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

export default router;