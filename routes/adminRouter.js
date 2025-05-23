const express = require('express')
const router = express.Router()

//importacion de controllers
const adminController = require("../controller/adminController")

const adminMiddlewareAccess = require("../middlewares/adminMiddleware")
//register
router.get("/",adminMiddlewareAccess,adminController.home)


module.exports=router