const { Producto } = require("../models");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

const productServices = {
  createProduct: async function createProduct(producto) {
    const newProduct = await Producto.create(producto);

    return {
      producto: newProduct,
    };
  },

 listProducts: async function listProducts(limit = 10, offset = 0, filtros = {}) {

  const where = {};

  // Filtro por género
  if (filtros.genero) {
    where.genero = filtros.genero;
  }

  // Filtro por categoría
  if (filtros.categoria) {
    where.categoria = filtros.categoria;
  }

  // Filtro por precio mínimo y máximo
  if (filtros.precioMin !== undefined || filtros.precioMax !== undefined) {
    where.precio = {};

    if (filtros.precioMin !== undefined) {
      where.precio[Op.gte] = filtros.precioMin;
    }

    if (filtros.precioMax !== undefined) {
      where.precio[Op.lte] = filtros.precioMax;
    }
  } 

  const { count, rows: productos } = await Producto.findAndCountAll({
    where,
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

  getFilters: async function getFilters(){
      const categorias = await Producto.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('categoria')), 'categoria']], // devuelve esto: [{ categoria: "Tecnología" },{ categoria: "Arte" },{ categoria: null },{ categoria: "Música" }]
      raw: true,
    });
    const generos = await Producto.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('genero')), 'genero']],
      raw: true,
    });

    return {
      categorias: categorias.map(c => c.categoria).filter(c => c !== null), // "categorias": ["remera", "zapatillas", "pantalon"], y quita nulls
      generos: generos.map(g => g.genero).filter(g => g !== null), //  "generos": ["hombre", "mujer", "unisex"]
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
