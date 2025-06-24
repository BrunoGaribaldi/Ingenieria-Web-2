const path = require("path");
const transporter = require("../config/mailer");

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

        // Enviar mail

        const fecha = new Date(response.newReserva.createdAt);
        const fechaFormateada = fecha.toLocaleDateString("es-AR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        mailUsuario = {
          //mail al usuario
          from: '"Agape jeans" <joaquincernik@gmail.com>',
          to: response.email,
          subject: "Reserva creada",
          text: "¡Tu reserva fue creada exitosamente!",
          html: `
    <div style="font-family: 'Montserrat', Arial, sans-serif; background: #f8f9fa; padding: 32px 0;">
      <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px;">
        <h1 style="color: #2d2d2d; font-size: 2rem; margin-bottom: 16px; text-align: center;">¡Tu reserva fue creada exitosamente!</h1>
        <div style="margin-bottom: 24px;">
          <p style="font-size: 1.1rem; margin: 8px 0;"><b>Modelo:</b> <span style="color: #007bff;">${
            response.productoReservado.modelo
          }</span></p>
          <p style="font-size: 1.1rem; margin: 8px 0;"><b>Monto:</b> <span style="color: #28a745;">${Number(
            response.productoReservado.precio
          ).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
          })}</span></p>
          <p style="font-size: 1.1rem; margin: 8px 0;"><b>Fecha:</b> <span style="color: #6c757d;">${fechaFormateada}</span></p>
        </div>
        <div style="text-align: center;">
          <img src="cid:${response.productoReservado.modelo}" alt="${
            response.productoReservado.modelo
          }" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-bottom: 16px;">
        </div>
        <p style="color: #888; font-size: 0.95rem; text-align: center; margin-top: 24px;">Gracias por confiar en <b>Agape jeans</b>.</p>
      </div>
    </div>
  `,
          attachments: [
            {
              filename: response.productoReservado.foto,
              path:
                __dirname +
                "/../Public/Uploads/" +
                response.productoReservado.foto,
              cid: response.productoReservado.modelo,
            },
          ],
        };

        mailAdmin = {
          //mail al admin
          from: '"Agape jeans" <joaquincernik@gmail.com>',
          to: "joaquincernik@gmail.com",
          subject: "Nueva reserva registrada de " + response.email,
          text: "Se ha registrada una nueva reserva",
          html: `
    <div style="font-family: 'Montserrat', Arial, sans-serif; background: #f8f9fa; padding: 32px 0;">
      <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px;">
        <h1 style="color: #2d2d2d; font-size: 2rem; margin-bottom: 16px; text-align: center;">¡Tu reserva fue creada exitosamente!</h1>
        <div style="margin-bottom: 24px;">
          <p style="font-size: 1.1rem; margin: 8px 0;"><b>Modelo:</b> <span style="color: #007bff;">${
            response.productoReservado.modelo
          }</span></p>
          <p style="font-size: 1.1rem; margin: 8px 0;"><b>Monto:</b> <span style="color: #28a745;">${Number(
            response.productoReservado.precio
          ).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
          })}</span></p>
          <p style="font-size: 1.1rem; margin: 8px 0;"><b>Fecha:</b> <span style="color: #6c757d;">${fechaFormateada}</span></p>
        </div>
      </div>
    </div>
  `,
        };

        //envio de mail en segundo plano
        transporter.sendMail(mailUsuario, (err, info) => {
          if (err) console.error(err);
        });
        transporter.sendMail(mailAdmin, (err, info) => {
          if (err) console.error(err);
        });
        res.redirect("/reserva/list-reserva/" + response.id);
      } catch (err) {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      }
    } else {
      res.redirect("/");
      console.log("====================================");
      console.log(err);
      console.log("====================================");
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
        console.log("====================================");
        console.log(err);
        console.log("====================================");
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
