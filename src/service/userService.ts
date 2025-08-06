import { user } from "./../../node_modules/.prisma/client/index.d";
import { injectable } from "inversify";
import { userRequest } from "../dto/user.dto";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import { Profile, VerifyCallback } from "passport-google-oauth20";
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

  async findOrCreateUser(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    try {
      let userDetail = await prisma.user.findUnique({ where: { googleId: profile.id } });
      if (!userDetail) {
        userDetail = await prisma.user.create({
          data: {
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails?.[0].value || "",
            password: "$2a$10$2wq9pl1zSL9YcF3LhjWnxuGtyapsSDJVkL.uGi56UcCOKUQJV7pL2",
            // default password googlepassword
          },
        });
      }
      return done(null, userDetail);
    } catch (error) {
      done(error);
    }
  }
}
