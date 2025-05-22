const {body} = require("express-validator");

const signupMiddleware = [
    body("email")
        .notEmpty()
        .withMessage("El email no puede estar vacio")
        .isEmail()
        .withMessage("El email no es valido"),
    body("password")
        .notEmpty()
        .withMessage("La contraseña no puede estar vacia")
        .isLength({min: 8})
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("nombre")
        .notEmpty()
        .withMessage("El nombre no puede estar vacio")
        .isLength({min: 2})
        .withMessage("El nombre debe tener al menos 2 caracteres"),
    body("apellido")
        .notEmpty()
        .withMessage("El apellido no puede estar vacio")
        .isLength({min: 2})
        .withMessage("El apellido debe tener al menos 2 caracteres")
]

module.exports = signupMiddleware;