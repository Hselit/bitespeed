import { Router } from "express";
import { getContactDeatils } from "../controller/contactController";

const router = Router();

router.post("/identify", getContactDeatils);

export default router;
