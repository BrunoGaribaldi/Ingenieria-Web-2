const path = require("path");

const mainController = {
  home: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/MainUser/home.html"));
  },
  myAccount: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/MainUser/vermicuenta.html"));
  },
  aboutUs: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/MainUser/sobrenosotros.html"));
  },
};

module.exports = mainController;
