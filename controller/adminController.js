const path = require("path");
const productServices = require("../services/productServices");
const reservaServices = require("../services/reservaServices");
const usuarioServices = require("../services/usuarioServices");

const adminController = {
  //home de admin
  home: (req, res) => {
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
      await productServices.createProduct(
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

 
  //vista de productos
  administrarproductos: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/Admin/administrarproductos.html")
    );
  },

  //lista de clientes
  listClients: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/Admin/clientes.html"));
  },

  //lista de reservas
  listReservas: (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/views/Admin/reservas.html"));
  },

  //apis
  listClientsApi: async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const response = await usuarioServices.findAllUsuarios(limit, offset);

    res.json({
      clientes: response.usuarios,
      total: response.total, // cantidad total de clientes en la bd
      page, // numero de pagina solicitada
      totalPages: Math.ceil(response.total / limit), // cantidad total de paginas.
    });
  },
  listReservasApi: async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const response = await reservaServices.findAllReservas(limit, offset);

    res.json({
      reservas: response.reservas,
      total: response.total, // cantidad total de clientes en la bd
      page, // numero de pagina solicitada
      totalPages: Math.ceil(response.total / limit), // cantidad total de paginas.
    });
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
