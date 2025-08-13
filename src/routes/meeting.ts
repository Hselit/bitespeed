import { Router } from "express";
import container from "../utils/inversify/container";
import TYPE from "../utils/inversify/type";
import { MeetingController } from "../controller/meetingController";

const router = Router();

const meetController = container.get<MeetingController>(TYPE.MEETINGCONTROLLER);
router.post("/access_token", meetController.createAccessToken.bind(meetController));
router.post("/meeting", meetController.createMeeting.bind(meetController));

export default router;
