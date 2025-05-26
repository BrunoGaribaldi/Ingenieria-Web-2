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
  listProduct: async function listProduct(id){
    const producto = await Producto.findByPk(id)
    return producto
  }
};
module.exports = productServices;
