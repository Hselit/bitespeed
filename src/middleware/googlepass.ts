import { inject, injectable } from "inversify";
import { UserService } from "../service/userService";
import TYPE from "../utils/inversify/type";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

@injectable()
export class GoogleAuth {
  constructor(@inject(TYPE.USERSERVICE) private uservice: UserService) {}

  initGoogleStratergy() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          this.uservice.findOrCreateUser(accessToken, refreshToken, profile, done);
        }
      )
    );
  }
}
