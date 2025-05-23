const path = require("path")

const productController = {
  list: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/MainUser/verproductos.html"));
  },
};

module.exports = productController;
