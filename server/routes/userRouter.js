import express from "express";
const router = express.Router();

import { signIn, signUp, updateUser, getUser, getUsers } from "../controllers/userController.js";

import auth from "../middleware/auth.js";

router.get('/', getUsers);
router.get('/:id', getUser);

router.patch('/:id', auth, updateUser);

router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;