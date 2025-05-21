const { notStrictEqual } = require("assert");
const path = require("path");
const { Usuario } = require("../models");

const usuarioServices = require("../services/usuarioServices")
const userController = {

  register: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/users/signup.html"));
  },

  registerProcess: async (req, res) => {
    try {
      const user = await usuarioServices.createUsuario(req.body);
      res.status(201).json(user);

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  loginProcess: async (req,res) =>{
    try {
      const responseLogin = await usuarioServices.logUser(req.body.email, req.body.password);
      const token = responseLogin.token
      res.status(201).json(
        {
          user: responseLogin.user,
          token: token
        });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = userController;
