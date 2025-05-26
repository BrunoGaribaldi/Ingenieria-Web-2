const path = require("path");
const productServices = require("../services/productServices");
const { log } = require("console");

const adminController = {
  home: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/Admin/paneladministracion.html")
    );
  },
  createProduct: (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Public/views/Admin/crearproducto.html")
    );
  },
  createProductProcess: async (req, res) => {
    // Captura errores de validación antes de crear el usuario
    /*const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }*/
    console.log("====================================");
    console.log(req.body);
    console.log(req.file);
    
    console.log("====================================");
    /*try {
      const responseCreateProduct = await productServices.createProduct(
        req.body
      );
      console.log("====================================");
      console.log(responseCreateProduct);
      console.log("====================================");
      res.status(201).json({
        user: responseCreateProduct.producto,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }*/
  },
};

module.exports = adminController;
