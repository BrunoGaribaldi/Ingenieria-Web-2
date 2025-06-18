const { where } = require("sequelize");
const { Reserva } = require("../models");
const jwt = require("jsonwebtoken");
const { Op, fn, col } = require("sequelize");
const SECRET = "palabrasecreta";

const reservaServices = {
  createReserva: async function createReserva(idProducto, token) {
    const decoded = jwt.verify(token, SECRET);

    const nuevaReserva = {
      id_usuario: decoded.id,
      id_producto: idProducto,
    };
    const newReserva = await Reserva.create(nuevaReserva);
    return { newReserva, id: decoded.id };
  },
  deleteReserva: async function deleteReserva(idProducto, token) {
    const decoded = jwt.verify(token, SECRET);
    const deletedReserva = await Reserva.destroy({
      where: {
        id_usuario: decoded.id,
        id_producto: idProducto,
      },
    });
    return { deletedReserva, id: decoded.id };
  },
  listReserva: async function listReserva() {
    const reservas = await Reserva.findAll({
      where: { id_usuario: idUsuario },
      include: { association: "producto" },
    });
    return reservas;
  },
  checkReserva: async function checkReserva(idProducto, idUsuario) {
    const reserva = await Reserva.findOne({
      where: [{ id_usuario: idUsuario }, { id_producto: idProducto }],
    });

    return reserva;
  },

findAllReservas: async function findAllReservas(limit, offset, cliente = "") {
  const whereUsuario = cliente
    ? where(
        fn("concat", col("usuario.nombre"), " ", col("usuario.apellido")),
        {
          [Op.like]: `%${cliente}%`,
        }
      )
    : undefined;

  const { rows: reservas, count: total } = await Reserva.findAndCountAll({
    limit,
    offset,
    order: [["created_at", "DESC"]],
    include: [
      { association: "producto" },
      {
        association: "usuario",
        where: whereUsuario, // ahora busca por nombre completo concatenado
      },
    ],
  });

  return {
    reservas,
    total,
  };
}

};
module.exports = reservaServices;
