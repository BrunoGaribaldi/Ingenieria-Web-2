const path = require("path");

const usuarioServices = require("../services/usuarioServices");
const { validationResult } = require("express-validator");
const userController = {
  signup: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/Signup/signup.html"));
  },

  signupProcess: async (req, res) => {
    // Captura errores de validación antes de crear el usuario
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const responseSignup = await usuarioServices.createUsuario(req.body);
      const token = responseSignup.token;

      const admin = responseSignup.admin;
      req.session.userLogged = {
        id: responseSignup.user.id,
        rol: admin,
      };

      res.status(201).json({
        user: responseSignup.user,
        id: responseSignup.user.id,
        token: token,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
        code: err.code,
      });
    }
  },
  forgotPassword: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/Login/passwordforgoten.html")
    );
  },
  forgotPasswordProcess: (req, res) => {
    res.send("se envio el mail");
  },
  login: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/Login/login.html"));
  },
  loginProcess: async (req, res) => {
    try {
      const responseLogin = await usuarioServices.logUser(
        req.body.email,
        req.body.password
      );
      const token = responseLogin.token;
      const admin = responseLogin.admin;
      req.session.userLogged = {
        id: responseLogin.user.id,
        rol: admin,
      };

      res.json({
        user: responseLogin.user,
        id: responseLogin.user.id,
        token: token,
        admin: admin,
      });
    } catch (err) {
      res
        .status(400)
        .json({ error: err.message, code: err.code || "UNKNOWN_ERROR" });
    }
  },
};

module.exports = userController;
