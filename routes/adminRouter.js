const express = require("express");
const router = express.Router();

//importacion de controllers
const adminController = require("../controller/adminController");

const adminMiddleware = require("../middlewares/adminMiddleware");
const adminMiddlewareAccess = require("../middlewares/adminMiddleware");
const {upload} = require("../index")
//register
router.get("/", adminMiddlewareAccess, adminController.home);
//para ver si existe la session
router.get('/session', (req, res) => {
  if (req.session.userLogged) {
    res.json({ usuario: req.session.userLogged });
  } else {
    res.status(401).json({ mensaje: 'Sesión expirada o no existe' });
  }
});


router.get(
  "/create-product",
  adminMiddlewareAccess,
  adminController.createProduct
);
router.post(
  "/create-product",
  adminMiddleware,
  upload.single("foto"), // por ahora vamos a hacer que sea una sola imagen
  adminController.createProductProcess
);

router.get(
  "/pedidos",
   adminMiddlewareAccess,
   adminController.verpedidos
);

router.get(
  "/administrarproductos",
  adminMiddlewareAccess,
   adminController.administrarproductos
);



module.exports = router;
