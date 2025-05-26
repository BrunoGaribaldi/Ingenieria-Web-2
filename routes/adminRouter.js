const express = require("express");
const router = express.Router();

//multer controla las imagenes
const multer = require('multer');
const upload = multer({ dest: "Uploads/" }); 

//importacion de controllers
const adminController = require("../controller/adminController");

const adminMiddleware = require("../middlewares/adminMiddleware");
const adminMiddlewareAccess = require("../middlewares/adminMiddleware");

//register
router.get("/", adminMiddlewareAccess, adminController.home);
router.get(
  "/create-product",
  adminMiddlewareAccess,
  adminController.createProduct
);
router.post(
  "/create-product",
  adminMiddleware,
  upload.single("imagen"), // por ahora vamos a hacer que sea una sola imagen
  adminController.createProductProcess
);

module.exports = router;
