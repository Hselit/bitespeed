import { injectable } from "inversify";
import axios from "axios";
import dotenv from "dotenv";
import { CreateMeetingRequest } from "../dto/meeting.dto";
dotenv.config();

@injectable()
export class MeetingService {
  async generateMeeting(meetingDetails: CreateMeetingRequest, token: string) {
    try {
      const res = await axios.post(
        "https://api.zoom.us/v2/users/me/meetings",
        {
          topic: meetingDetails.topic,
          type: 2, // scheduled meeting
          start_time: meetingDetails.start_time, // must be in UTC ISO format
          duration: meetingDetails.duration,
          password: meetingDetails.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err: any) {
      console.error("Zoom error:", err.response?.data || err.message);
      throw err;
    }
  }

  async generateAccessToken() {
    try {
      const client_id = process.env.ZOOM_CLIENT_ID;
      const account_id = process.env.ZOOM_ACCOUNT_ID;
      const password = process.env.ZOOM_CLIENT_SECRET;
      console.log("client Id : ", client_id, " account_id : ", account_id, "password : ", password);
      if (account_id && client_id && password) {
        const formData = `grant_type=account_credentials&account_id=${encodeURIComponent(account_id)}`;
        const data = await axios.post("https://zoom.us/oauth/token", formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: client_id,
            password: password,
          },
        });
        return data.data;
      } else {
        throw "Need Mandatory Key values";
      }
    } catch (error) {
      throw error;
    }
  }

  async createAccessToken(accountId: string, clientId: string, clientPass: string) {
    try {
      await axios
        .post("", {
          params: {
            grant_type: "account_credentials",
            account_id: accountId,
          },
          headers: {
            Authorization: `Basic `,
          },
        })
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }
}
