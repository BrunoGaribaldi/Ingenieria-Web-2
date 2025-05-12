const express = require('express')
const router = express.Router()

//importacion de controllers
const userController = require("../controller/userController")


//register
router.get("/",userController.register)

module.exports=router