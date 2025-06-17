/*const jwt = require("jsonwebtoken");
const SECRET = "palabrasecreta";

function authMiddleware(req, res, next) {
  // Verifica si el token está presente en la cabecera Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Puedes acceder a los datos del usuario en req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;*/