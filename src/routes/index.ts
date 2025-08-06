import express from "express";
import passport from "passport";
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login", { messages: { error: req.flash("error") } });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("profile");
  } else {
    res.render("login", { messages: { error: req.flash("error") } });
  }
});

export default router;
