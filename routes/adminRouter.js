const express = require('express')
const router = express.Router()

//importacion de controllers
const adminController = require("../controller/adminController")

const adminMiddleware = require("../middlewares/adminMiddleware")
//register
router.get("/",adminMiddleware,adminController.home)


module.exports=router