import express from "express";

import { getUser, createUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/", createUser);

export default userRouter;
