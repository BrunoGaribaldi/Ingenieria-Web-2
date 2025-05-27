const express = require("express");
const router = express.Router();
const path = require("path");
//importacion de controllers
const userController = require("../controller/userController");
const signupMiddleware = require("../middlewares/signupValidation");

const authMiddleware = require("../middlewares/authMiddleware");
//register
router.get("/signup", userController.signup);
router.post("/signup", signupMiddleware, userController.signupProcess);


//login
router.get("/login", userController.login);
router.post("/login", userController.loginProcess);

//logout
router.post("/logout", (req, res) => {
  req.session.userLogged = undefined;
  return res.redirect("/");
});
module.exports = router;
