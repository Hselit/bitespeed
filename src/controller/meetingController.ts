import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPE from "../utils/inversify/type";
import { MeetingService } from "../service/meetingService";
import { CreateMeetingRequest } from "../dto/meeting.dto";

@injectable()
export class MeetingController {
  constructor(@inject(TYPE.MEETINGSERVICE) public meetingser: MeetingService) {}

  async createAccessToken(req: Request, res: Response) {
    try {
      const tokenResponse = await this.meetingser.generateAccessToken();
      if (tokenResponse) {
        res.status(201).json(tokenResponse);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error " });
    }
  }

  async createMeeting(req: Request, res: Response) {
    try {
      const meetingInput: CreateMeetingRequest = req.body;
      const token: string | undefined = req.headers.authorization;
      if (token) {
        const tokenn = token.split(" ")[1];
        const meetingInfo = await this.meetingser.generateMeeting(meetingInput, tokenn);
        // console.log(meetingInfo);
        res.status(201).json(meetingInfo);
      } else {
        res.status(401).json({ message: "No Token Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
}
