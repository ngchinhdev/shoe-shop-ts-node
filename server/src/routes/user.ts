import { Router } from "express";

import * as userControllers from "../controllers/users";

const router = Router();

router.get('/', userControllers.getUsers);

router.get('/:id', userControllers.getUser);

router.post('/', userControllers.createUser);


export default router;