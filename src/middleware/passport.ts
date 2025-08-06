import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserService } from "../service/userService";
import { inject, injectable } from "inversify";
import TYPE from "../utils/inversify/type";
import { prisma } from "../utils/prisma";

@injectable()
export class AuthHandler {
  constructor(@inject(TYPE.USERSERVICE) private uservice: UserService) {}

  async init() {
    passport.use(
      new LocalStrategy({ usernameField: "username", passwordField: "password" }, (username: string, password: string, done: any) => {
        this.uservice.verifyUser(username, password, done);
      })
    );

    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    });
  }
}
