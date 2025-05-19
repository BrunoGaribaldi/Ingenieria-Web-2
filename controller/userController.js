const { notStrictEqual } = require("assert");
const path = require("path");
const { Usuario } = require("../models");

const usuarioServices = require("../services/usuarioServices")
const userController = {

  register: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/users/signup.html"));
  },

  registerProcess: async (req, res) => {
    console.log(req.body);

    try {
      const user = await usuarioServices.createUsuario(req.body);
      res.status(201).json(user);

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = userController;
