const path = require("path");
const { Producto } = require("../models");


const productServices = require("../services/productServices")
const productController = {
  home: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/MainUser/verproductos.html")
    );
  },
  listAll: async (req, res) => {
    const responseListAll = await productServices.listProducts();
    res.json(responseListAll)
  },
};

module.exports = productController;
