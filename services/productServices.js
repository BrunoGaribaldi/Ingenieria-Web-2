const { Producto } = require("../models");

const productServices = {
  createProduct: async function createProduct(producto) {
    const newProduct = await Producto.create(producto);

    return {
      producto: newProduct,
    };
  },
  listProducts: async function listProducts() {
    const productos = await Producto.findAll();
    return {
      productos: productos,
    };
  },
};
module.exports = productServices;
