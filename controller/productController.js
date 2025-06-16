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

  // modificacion para paginacion. Acordate de pasar los parametros x url.
  ///`/products/api/list?page=${page}&limit=${limit}`
  listAll: async (req, res) => {

      const limit = parseInt(req.query.limit) || 12; //lee el parametro limit (cantidad de productos que queremos traer x defecto 12) que viene de la url
      const page = parseInt(req.query.page) || 1;  // page es la pagina de resultados que queremos
      const offset = (page - 1) * limit; // aca calculamos el desplazamiento. si page es 1 --> offset = 0 entonces arrancamos desde el primer producto. Si page es 2 arrancamos desde el 11.

      const response = await productServices.listProducts(limit, offset);

      res.json({
        productos: response.productos,
        total: response.total, // cantidad total de productos en la bd
        page, // numero de pagina solicitada
        totalPages: Math.ceil(response.total / limit), // cantidad total de paginas.
      });

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
