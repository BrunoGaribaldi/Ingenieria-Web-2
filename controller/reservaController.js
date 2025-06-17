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

  list: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/Reservas/misreservas.html")
    );
  },
  listApi: async (req, res) => {
    idUsuario = req.params.idUsuario;
    const response = await reservaServices.listReserva(idUsuario);
    res.json({reservas: response});
  },
};

module.exports = reservaController;
