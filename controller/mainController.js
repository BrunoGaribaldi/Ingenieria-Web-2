const path = require('path');

const mainController = {
  home: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/MainUser/home.html"));
  },
};

module.exports = mainController;
