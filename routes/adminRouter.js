const express = require("express");
const router = express.Router();

//importacion de controllers
const adminController = require("../controller/adminController");

const adminMiddleware = require("../middlewares/adminMiddleware");
const { upload } = require("../index");
//register
router.get("/", adminMiddleware, adminController.home);
//para ver si existe la session
router.get("/session", (req, res) => {
  if (req.session.userLogged) {
    res.json({ usuario: req.session.userLogged });
  } else {
    res.status(401).json({ mensaje: "Sesión expirada o no existe" });
  }
});

router.get("/create-product", adminMiddleware, adminController.createProduct);
router.post(
  "/create-product",
  adminMiddleware,
  upload.single("foto"), // por ahora vamos a hacer que sea una sola imagen
  adminController.createProductProcess
);

router.get("/pedidos", adminMiddleware, adminController.verpedidos);

router.get(
  "/administrarproductos",
  adminMiddleware,
  adminController.administrarproductos
);

router.get("/clientes/list", adminController.listClients);
router.get("/api/clientes/list", adminController.listClientsApi);

module.exports = router;
