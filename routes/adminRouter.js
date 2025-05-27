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

//creacion de producto
router.get("/create-product", adminMiddleware, adminController.createProduct);
router.post(
  "/create-product",
  adminMiddleware,
  upload.single("foto"), // por ahora vamos a hacer que sea una sola imagen
  adminController.createProductProcess
);

//edicion de producto
router.get("/edit-product/:id", adminMiddleware, adminController.editProduct);
router.post(
  "/edit-product/:id",
  adminMiddleware,
  upload.single("foto"), // por ahora vamos a hacer que sea una sola imagen
  adminController.editProductProcess
);


//delete
router.post(
  "/delete-product/:id",
  adminMiddleware,
  adminController.deleteProductProcess
);

//router.get("/pedidos", adminMiddleware, adminController.verpedidos);


//vistas de admin
router.get(
  "/administrarproductos",
  adminMiddleware,
  adminController.administrarproductos
);
router.get("/clientes/list", adminController.listClients);

//apis
router.get("/api/clientes/list", adminController.listClientsApi);
router.get("/api/productos/count-categories", adminController.countCategoriesApi);
router.get("/api/productos/count-genders", adminController.countGendersApi);


module.exports = router;
