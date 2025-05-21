const express = require('express')
const router = express.Router()

//importacion de controllers
const userController = require("../controller/userController")


//register
router.get("/signup",userController.register)
router.post("/signup",userController.registerProcess)

//login
router.post("/login",userController.loginProcess)

module.exports=router