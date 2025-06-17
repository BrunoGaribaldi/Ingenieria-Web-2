const express = require("express");
const router = express.Router();

const reservaController = require("../controller/reservaController")

router.post("/crear-reserva/:id",reservaController.createProcess)
router.get("/list-reserva/:idUsuario",reservaController.list)

module.exports = router;
