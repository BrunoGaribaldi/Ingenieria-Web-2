const { Reserva } = require("../models");
const jwt = require("jsonwebtoken");
const SECRET = "palabrasecreta";

const reservaServices = {
  createReserva: async function createReserva(idProducto, token) {
    const decoded = jwt.verify(token, SECRET);

    const nuevaReserva = {
      id_usuario: decoded.id,
      id_producto: idProducto,
    };
    const newReserva = await Reserva.create(nuevaReserva);
    return newReserva;
  },
  listReserva: async function listReserva() {
    const reservas = await Reserva.findAll({
      where: { id_usuario: idUsuario },
      include: [{ association: "producto" }, { association: "usuario" }],
    });
    return reservas;
  },
};
module.exports = reservaServices;
