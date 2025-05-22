const express = require('express')
const router = express.Router()

//importacion de controllers
const userController = require("../controller/userController")
const signupMiddleware = require("../middlewares/signupValidation")

//register
router.get("/signup",userController.signup)
router.post("/signup",signupMiddleware,userController.signupProcess)

//login
router.get("/login",userController.login)
router.post("/login",userController.loginProcess)

module.exports=router