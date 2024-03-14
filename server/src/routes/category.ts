import { Router } from "express";

import * as categoryControllers from "../controllers/categories";

const router = Router();

router.get('/', categoryControllers.getCategories);

router.post('/', categoryControllers.createCategory);

export default router;