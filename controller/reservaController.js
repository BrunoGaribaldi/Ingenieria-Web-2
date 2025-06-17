const path = require("path");

const reservaServices = require("../services/reservaServices");
const reservaController = {
  createProcess: async (req, res) => {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      idProducto = req.params.id;
      reservaServices.createReserva(idProducto, token);
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  },

  list: async (req, res) => {
    idUsuario = req.params.idUsuario;
    const response = await reservaServices.listReserva(idUsuario)
    console.log('====================================');
    console.log(response);
    console.log('====================================');
  },
};

module.exports = reservaController;
