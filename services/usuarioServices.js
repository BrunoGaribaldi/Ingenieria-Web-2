const { Usuario } = require("../models");


const usuarioServices = {
    createUsuario : async function createUsuario(usuario) {
        Usuario.create(usuario)
    },

    
}

module.exports = usuarioServices