import { Router } from "express";

import * as userControllers from "../controllers/users";
import uploadFiles from "../utils/uploadFiles";
import { verifyAdmin } from "../middlewares/verifyAuth";

const router = Router();

router.get('/', userControllers.getUsers);

router.get('/:id', userControllers.getUserById);

router.get('/email/:email', userControllers.getUserByEmail);

router.put('/:id', userControllers.updateUser);

router.delete('/:id', userControllers.deleteUser);

export default router;