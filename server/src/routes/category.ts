import { Router } from "express";

import * as categoryControllers from "../controllers/categories";
import uploadFiles from "../utils/uploadFiles";

const router = Router();

router.get('/', categoryControllers.getCategories);

router.get('/:id', categoryControllers.getCategory);

router.post('/', uploadFiles.single('image'), categoryControllers.createCategory);

router.put('/:id', uploadFiles.single('image'), categoryControllers.updateCategory);

router.delete('/:id', categoryControllers.deleteCategory);

export default router;