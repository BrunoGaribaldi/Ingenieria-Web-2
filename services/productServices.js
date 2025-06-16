const { Producto } = require("../models");
const { Sequelize } = require("sequelize");

const productServices = {
  createProduct: async function createProduct(producto) {
    const newProduct = await Producto.create(producto);

    return {
      producto: newProduct,
    };
  },
 listProducts: async function listProducts(limit = 10, offset = 0) {

  const { count, rows: productos } = await Producto.findAndCountAll({
    limit,
    offset,
  });

  return {
    productos,
    total: count, //total de productos sin paginar
  };
},
  listProduct: async function listProduct(id) {
    const producto = await Producto.findByPk(id);
    return producto;
  },
  countCategories: async function countCategories() {
    const resultado = await Producto.findAll({
      attributes: [
        "categoria",
        [Sequelize.fn("COUNT", Sequelize.col("categoria")), "total"],
      ],
      group: ["categoria"],
    });
    return resultado;
  },

  countGenders: async function countGenders() {
    const resultado = await Producto.findAll({
      attributes: [
        "genero",
        [Sequelize.fn("COUNT", Sequelize.col("genero")), "total"],
      ],
      group: ["genero"],
    });
    const total = await Producto.count();
    return {
      resultado,
      total,
    };
  },
  deleteProduct: async function deleteProduct(id) {
    const producto = await Producto.destroy({ where: { id } });
    return producto;
  },
  updateProduct: async function updateProduct(id, data) {
    const [updatedRows] = await Producto.update(data, { where: { id } });
    return updatedRows; 
  },
};
module.exports = productServices;
