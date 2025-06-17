const path = require("path");


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
  },
  verTodosLosProductos: (req, res) => {
  res.sendFile(
    path.join(__dirname, "../Public/views/MainUser/vertodoslosproductos.html")
  );
}
};

module.exports = productController;
