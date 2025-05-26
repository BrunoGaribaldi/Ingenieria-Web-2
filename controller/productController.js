const path = require("path");
const { Producto } = require("../models");


const productServices = require("../services/productServices")
const productController = {
  home: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/MainUser/verproductos.html")
    );
  },
   detail: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/Products/detalleproducto.html")
    );
  },
  listAll: async (req, res) => {
    const responseListAll = await productServices.listProducts();
    res.json(responseListAll)
  },
  listProduct: async (req,res) =>{
    const responseListProduct = await productServices.listProduct(req.params.id)
    res.json(responseListProduct)
  }
};

module.exports = productController;
