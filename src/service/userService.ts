import { injectable } from "inversify";
import { userRequest } from "../dto/user.dto";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

@injectable()
export class UserService {
  async verifyUser(username: string, password: string, done: any) {
    try {
      const user = await prisma.user.findFirst({ where: { username: username } });
      if (!user) {
        return done(null, false, { message: "No User Found" });
      }
      const isPassMatch = await bcrypt.compare(password, user.password);
      if (!isPassMatch) {
        return done(null, false, { message: "Invalid Password" });
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }

  async addUser(userdata: userRequest) {
    try {
      const isUserPresent = await this.getUser(userdata.username);

      if (!isUserPresent) {
        return "User Already Present with the username";
      }

      const hashedpass = await bcrypt.hash(userdata.password, 10);
      return await prisma.user.create({ data: { username: userdata.username, password: hashedpass } });
    } catch (error) {
      throw error;
    }
  }

  async getUser(username: string) {
    try {
      const userData = await prisma.user.findFirst({ where: { username: username } });
      if (userData) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
