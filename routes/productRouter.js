const express = require("express");
const router = express.Router();

//importacion de controllers
const productController = require("../controller/productController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", productController.home);
router.get("/list/:id", productController.detail);
router.get("/vertodoslosproductos", productController.verTodosLosProductos)


router.get("/api/list", productController.listAll);
router.get("/api/list/:id", productController.listProduct);

router.get("/api/filters", productController.getFiltersApi);



module.exports = router;
