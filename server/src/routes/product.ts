import { Router } from "express";

import uploadFiles from "../utils/uploadFiles";

import * as productController from "../controllers/products";
import * as helperMiddlewares from "../middlewares/helpers";

const router = Router();

router.get('/', productController.getProducts);

router.get(
    '/hot',
    productController.getHotProducts
);

router.get(
    '/categoryId/:id',
    helperMiddlewares.checkValidID,
    productController.getProductsByCategoryId
);

router.get(
    '/categoryName/:name',
    productController.getProductsByCategoryName
);

router.get(
    '/search/:name',
    productController.getProductBySearchName
);

router.get(
    '/:id',
    helperMiddlewares.checkValidID,
    productController.getProductById
);

router.post('/', uploadFiles.array('images', 4), productController.createProduct);

router.put('/:id', uploadFiles.array('images', 4), productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

export default router;