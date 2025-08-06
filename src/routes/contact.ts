import { Router } from "express";
import container from "../utils/inversify/container";
import TYPE from "../utils/inversify/type";
import { ContactController } from "../controller/contactController";

const router = Router();

const contController = container.get<ContactController>(TYPE.COntController);

router.post("/identify", contController.getContactDeatils);

export default router;
