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
  },
  deleteProduct: async function deleteProduct(id){
   const producto = await Producto.destroy({where: {id}})
    return producto 
  },
  updateProduct: async function updateProduct(id, data) {
  const [updatedRows] = await Producto.update(data, { where: { id } });
  console.log('====================================');
  console.log(updatedRows);
  console.log('====================================');
  return updatedRows; // cantidad de filas actualizadas (0 o 1)
}
};
module.exports = productServices;
