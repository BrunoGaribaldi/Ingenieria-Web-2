const { where } = require("sequelize");
const { Reserva } = require("../models");
const { Usuario } = require("../models");
const jwt = require("jsonwebtoken");
const { Op, fn, col } = require("sequelize");
const SECRET = "palabrasecreta";
const sequelize = require("sequelize");
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
  stats: async function stats() {
    const barColumn = await Reserva.findAll({
      attributes: [
        [sequelize.fn("DAYNAME", sequelize.col("created_at")), "dia"],
        [sequelize.fn("DAYOFWEEK", sequelize.col("created_at")), "numero_dia"],
        [sequelize.fn("COUNT", sequelize.col("id")), "numero"],
      ],
      group: [
        sequelize.fn("DAYNAME", sequelize.col("created_at")),
        sequelize.fn("DAYOFWEEK", sequelize.col("created_at")),
      ],
      order: [["numero_dia", "ASC"]],
      raw: true,
    });

    const bar = await Reserva.findAll({
      attributes: [
        [
          sequelize.fn(
            "CONCAT_WS",
            " ",
            sequelize.col("usuario.nombre"),
            sequelize.col("usuario.apellido")
          ),
          "nom",
        ],
        [sequelize.fn("COUNT", sequelize.col("Reserva.id")), "numero"],
      ],
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: [],
        },
      ],
      group: ["nom"],
      order: [["numero", "DESC"]],
      limit: 3,
      raw: true,
    });

    return { barColumn, bar };
  },
findAllReservas: async function findAllReservas(limit, offset, cliente = "") {
  const whereUsuario = cliente //ahora armo una condicion para la busqueda de cliente
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
    order: [["created_at", "DESC"]], //activar timestamp
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
},
};
module.exports = reservaServices;
