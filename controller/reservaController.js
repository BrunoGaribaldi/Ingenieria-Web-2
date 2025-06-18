const path = require("path");

const reservaServices = require("../services/reservaServices");
const reservaController = {
  createProcess: async (req, res) => {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      const idProducto = req.params.id;
      try {
        const response = await reservaServices.createReserva(idProducto, token);
        res.redirect("/reserva/list-reserva/" + response.id);
      } catch (err) {
        if (err.status === 401) {
          return res.status(401).send("Token expirado");
        }
        res.status(500).send("Error interno");
      }
    } else {
      res.redirect("/");
    }
  },

  deleteProcess: async (req, res) => {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      const idProducto = req.params.id;
      try {
        const response = await reservaServices.deleteReserva(idProducto, token);
        res.redirect("/reserva/list-reserva/" + response.id);
      } catch (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        if (err.status === 401) {
          return res.status(401).send("Token expirado");
        }
        res.status(500).send("Error interno");
      }
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
    res.json({ reservas: response });
  },

  checkReservaApi: async (req, res) => {
    idUsuario = req.params.idUsuario;
    idProducto = req.params.idProducto;

    const response = await reservaServices.checkReserva(idProducto, idUsuario);
    res.json(response ? 1 : null);
  },
};

module.exports = reservaController;
