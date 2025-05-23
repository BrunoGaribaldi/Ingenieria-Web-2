const express = require("express");
const router = express.Router();

//importacion de controllers
const productController = require("../controller/productController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", productController.list);

module.exports = router;
