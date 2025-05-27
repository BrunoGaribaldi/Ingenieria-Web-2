const { Usuario } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarioServices = {
  createUsuario: async function createUsuario(usuario) {
    const usuarioEncontrado = await this.findUsuarioByEmail(usuario.email);

    if (usuarioEncontrado) {
      const err = new Error("Este email ya se encuentra registrado");
      err.code = "EMAIL_ALREADY_REGISTERED";
      throw err;
    } else {
      usuario.password = await bcrypt.hash(usuario.password, 10);
      const newUser = await Usuario.create(usuario);
      //creamos el token:
      token = jwt.sign(
        { id: newUser.id, email: newUser.email, rol: newUser.rol }, //payload
        "palabrasecreta", //se le pone una frase de encriptacion
        { expiresIn: "1h" }
      );

      return {
        token: token,
        user: newUser,
      };
    }
  },
  logUser: async function logUser(email, password) {
    const usuarioEncontrado = await this.findUsuarioByEmail(email);

    if (!usuarioEncontrado) {
      //aca personalizo el error para despues agarrarlos
      const err = new Error("Email no encontrado");
      err.code = "EMAIL_NOT_FOUND";
      throw err;
    } else {
      //se encontro el usuario, chequeamos la contrasena
      const validPassword = await bcrypt.compare(
        password,
        usuarioEncontrado.password
      );
      let token;
      if (validPassword) {
        //login
        //creamos el token:
        token = jwt.sign(
          {
            id: usuarioEncontrado.id,
            email: usuarioEncontrado.email,
            rol: usuarioEncontrado.rol,
          }, //payload
          "palabrasecreta", //se le pone una frase de encriptacion
          { expiresIn: "1h" }
        );

        return {
          token: token,
          user: usuarioEncontrado,
          admin: usuarioEncontrado.rol == "admin" ? 1 : 0,
        };
      } else {
        //aca personalizo el error para despues agarrarlos
        const err = new Error("Password incorrecta");
        err.code = "INCORRECT_PASSWORD";
        throw err;
      }
    }
  },
  findUsuarioByEmail: async function findUsuarioByEmail(emailRecibido) {
    const usuarioEncontrado = await Usuario.findOne({
      where: { email: emailRecibido },
    });
    return usuarioEncontrado;
  },
  findAllUsuarios: async function findAllUsuarios() {
    const usuariosEncontrados = await Usuario.findAll();    
    return {
      usuarios: usuariosEncontrados,
    };
  },
  
};

module.exports = usuarioServices;
