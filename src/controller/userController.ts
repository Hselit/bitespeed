import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPE from "../utils/inversify/type";
import { UserService } from "../service/userService";

@injectable()
export class UserController {
  constructor(@inject(TYPE.USERSERVICE) private uservice: UserService) {}

  addUserDeatils = async (req: Request, res: Response) => {
    try {
      const requestData = req.body;
      const responseData = await this.uservice.addUser(requestData);
      console.log(responseData);
      if (typeof responseData == "string") {
        res.status(400).json({ message: requestData });
        return;
      }
      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  };
}
