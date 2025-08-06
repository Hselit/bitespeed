import { Router } from "express";
import container from "../utils/inversify/container";
import TYPE from "../utils/inversify/type";
import { UserController } from "../controller/userController";

const router = Router();

const userController = container.get<UserController>(TYPE.USERCONTROLLER);

router.post("/adduser", userController.addUserDeatils);

export default router;
