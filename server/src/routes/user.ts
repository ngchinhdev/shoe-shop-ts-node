import { Router } from "express";

import * as userControllers from "../controllers/users";

const router = Router();

router.get('/', userControllers.getUsers);

router.get('/:id', userControllers.getUser);

router.put('/:id', userControllers.updateUser);

router.delete('/:id', userControllers.deleteUser);


export default router;