const express = require('express')
const router = express.Router()
const path = require("path")
//importacion de controllers
const userController = require("../controller/userController")
const signupMiddleware = require("../middlewares/signupValidation")

const authMiddleware = require("../middlewares/authMiddleware")
//register
router.get("/signup",userController.signup)
router.post("/signup", signupMiddleware,userController.signupProcess)

//forgot password
router.get("/forgotpassword",userController.forgotPassword)
router.post("/forgotpassword",authMiddleware,userController.forgotPasswordProcess)

//login
router.get("/login",userController.login)
router.post("/login",userController.loginProcess)

module.exports=router