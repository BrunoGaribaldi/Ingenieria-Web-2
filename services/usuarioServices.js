const { Usuario } = require("../models");
const bcrypt = require("bcrypt");
const usuarioServices = {
  createUsuario: async function createUsuario(usuario) {
    //Usuario.create(usuario);
    const usuarioEncontrado = await this.findUsuarioByEmail(usuario.email);
    if (usuarioEncontrado) {
      throw new Error("Email ya existente en la bd");
    } else {
      usuario.password = await bcrypt.hash(usuario.password, 10);
      const newUser = await Usuario.create(usuario);
      return newUser;
    }
  },
  logUser: async function logUser(email, password) {
    const usuarioEncontrado = await this.findUsuarioByEmail(email); 

    if(!usuarioEncontrado){
        throw new Error("Mail no encontrado") //no se encontro el mail
    }
    else{
        //se encontro el usuario, chequeamos la contrasena
        const validPassword = await bcrypt.compare(password, usuarioEncontrado.password)
        if(validPassword){
            //login
            return usuarioEncontrado
        }
        else{
            throw new Error("Password incorrecta")
        }

    }
  },
  /*findUsuarioById: async function findUsuarioById(id) {
    try {
      const user = await Usuario.findByPk(id);

      if (!user) {
        console.log("User not found");
        return null;
      }

      console.log("User found:", user.toJSON());
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },*/
  findUsuarioByEmail: async function findUsuarioByEmail(emailRecibido) {
    const usuarioEncontrado = await Usuario.findOne({
      where: { email: emailRecibido },
    });
    return usuarioEncontrado;
  },
};

module.exports = usuarioServices;
