const path = require("path");
function adminMiddlewareAccess(req, res, next) {
  if (req.session.userLogged) {
    console.log(req.session.userLogged);
    if (req.session.userLogged.rol != 1) {
      return res.redirect("/");
    }
    return next();
  } else {
    return res.redirect("/");
  }
}

module.exports = adminMiddlewareAccess;
