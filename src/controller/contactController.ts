import { Request, Response } from "express";
import { ContactService } from "../service/contactService";

export const getContactDeatils = async (req: Request, res: Response) => {
  try {
    const requestData = req.body;
    const responseData = await ContactService.getContact(requestData);
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
};
