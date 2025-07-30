import express from "express";
import path from "path";
import logger from "morgan";

import indexRouter from "./routes/index";
import contactRouter from "./routes/contact";

import "reflect-metadata";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/contact", contactRouter);

export default app;
