const path = require("path");

const adminController = {
  home: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/Admin/paneladministracion.html"));
  }
};

module.exports = adminController;
