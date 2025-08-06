import express from "express";
import path from "path";
import logger from "morgan";
import session, { SessionOptions } from "express-session";
import { createClient } from "redis";
import connectRedis, { RedisStore } from "connect-redis";

import indexRouter from "./routes/index";
import contactRouter from "./routes/contact";
import userRouter from "./routes/user";

import "reflect-metadata";
import passport from "passport";
import { AuthHandler } from "./middleware/passport";
import container from "./utils/inversify/container";
import TYPE from "./utils/inversify/type";
import flash from "connect-flash";
import { GoogleAuth } from "./middleware/googlepass";

const app = express();

app.use(logger("dev"));

const redisClient = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

redisClient.connect().catch(console.error);

// const redisStore = connectRedis(session);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    name: "session",
    store: new RedisStore({ client: redisClient }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  } as SessionOptions)
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "public"));
app.use(express.static(path.join(__dirname, "..", "public")));

const usercont = container.get<AuthHandler>(TYPE.AUTHHANDLER);
usercont.init();

const googleAuth = container.get<GoogleAuth>(TYPE.GOOGLEAUTHHANDLER);
googleAuth.initGoogleStratergy();

app.use("/", indexRouter);
app.use("/contact", contactRouter);
app.use("/user", userRouter);

export default app;

//msql session
// import express from "express";
// import path from "path";
// import logger from "morgan";
// import session, { SessionOptions } from "express-session";
// import connectMySQL from "express-mysql-session";

// import indexRouter from "./routes/index";
// import contactRouter from "./routes/contact";
// import userRouter from "./routes/user";

// import "reflect-metadata";
// import passport from "passport";
// import { AuthHandler } from "./middleware/passport";
// import container from "./utils/inversify/container";
// import TYPE from "./utils/inversify/type";
// import flash from "connect-flash";

// const app = express();

// app.use(logger("dev"));

// const MySQLStore = connectMySQL(session as any);

// const sessionstore = new MySQLStore({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "mysqlpassword",
//   database: "bitespeed",
// });

// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     name: "session",
//     store: sessionstore,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//   } as SessionOptions)
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(flash());

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "..", "public"));
// app.use(express.static(path.join(__dirname, "..", "public")));

// const usercont = container.get<AuthHandler>(TYPE.AUTHHANDLER);
// usercont.init();

// app.use("/", indexRouter);
// app.use("/contact", contactRouter);
// app.use("/user", userRouter);

// export default app;
