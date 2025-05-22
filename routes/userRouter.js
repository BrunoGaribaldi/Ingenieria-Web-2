const express = require('express')
const router = express.Router()
const path = require("path")
//importacion de controllers
const userController = require("../controller/userController")
const signupMiddleware = require("../middlewares/signupValidation")

const authMiddleware = require("../middlewares/authMiddleware")
//register
router.get("/signup",userController.signup)
router.post("/signup",userController.signupProcess)

router.get("/forgotpassword",(req,res)=>{
    res.sendFile(path.join(__dirname,"../Public/views/Login/passwordforgoten.html"))
})
router.post("/forgotpassword",authMiddleware,(req,res)=>{
    res.send("se envio el mail")
})

//login
router.get("/login",userController.login)
router.post("/login",userController.loginProcess)

module.exports=router