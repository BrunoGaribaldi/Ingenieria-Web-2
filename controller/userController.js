const { notStrictEqual } = require("assert");
const path = require("path");
const { Usuario } = require("../models");

const userController = {
  register: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/users/signup.html"));
  },
  registerProcess: async (req, res) => {
    console.log(req.body);
    try {
      const user = await Usuario.create({
        nombre: "joaquin",
        apellido: "joaquin",
        password: "joaquin0101",
        email: "joaquin@gmail.com",
        telefono: "3655555",
        rol: "usuario",
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = userController;
