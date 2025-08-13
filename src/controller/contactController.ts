import { Request, Response } from "express";
import { ContactService } from "../service/contactService";
import { inject, injectable } from "inversify";
import TYPE from "../utils/inversify/type";

@injectable()
export class ContactController {
  constructor(@inject(TYPE.ContService) private cservice: ContactService) {}

  async getContactDeatils(req: Request, res: Response) {
    try {
      const requestData = req.body;
      const responseData = await this.cservice.getContact(requestData);
      if (typeof responseData == "string") {
        res.status(404).json({ message: requestData });
        return;
      }
      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
}
