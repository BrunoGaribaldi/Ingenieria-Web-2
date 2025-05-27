const path = require("path");
const productServices = require("../services/productServices");
const userServices = require("../services/usuarioServices");
const usuarioServices = require("../services/usuarioServices");

const adminController = {
  //home de admin
  home: (req, res) => {
    console.log("====================================");
    console.log(req.body);
    console.log("====================================");
    res.sendFile(
      path.join(__dirname, "../Public/views/Admin/paneladministracion.html")
    );
  },

  //create
  createProduct: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/Admin/crearproducto.html")
    );
  },
  createProductProcess: async (req, res) => {
    try {
      const productData = {
        ...req.body,
        foto: req.file ? req.file.filename : null, // Guarda el nombre del archivo
      };
      const responseCreateProduct = await productServices.createProduct(
        productData
      );
      res.redirect("/admin/administrarproductos");
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  //edit
  editProduct: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/Admin/editarproducto.html")
    );
  },
  editProductProcess: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      // Si usas multer para imagen:
      if (req.file) {
        data.foto = req.file.filename;
      }
      await productServices.updateProduct(id, data);
      res.redirect("/admin/administrarproductos");
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  //delete
  deleteProductProcess: async (req, res) => {
    const responseDeleteProduct = await productServices.deleteProduct(
      req.params.id
    );
    res.json(responseDeleteProduct);
  },

  /*
  verpedidos: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/Admin/verpedidos.html"));
  },
*/
  //vista de productos
  administrarproductos: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/Admin/administrarproductos.html")
    );
  },

  //vista de usuarios
  listClients: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/Admin/clientes.html"));
  },

  //apis
  listClientsApi: async (req, res) => {
    const responseListAllUsers = await usuarioServices.findAllUsuarios();
    res.json(responseListAllUsers);
  },

  countCategoriesApi: async function (req, res) {
    const resopnseCountCategoriesApi = await productServices.countCategories();
    res.json(resopnseCountCategoriesApi);
  },
  countGendersApi: async function (req, res) {
    const resopnseCountGendersApi = await productServices.countGenders();
    res.json(resopnseCountGendersApi);
  },
};

module.exports = adminController;
