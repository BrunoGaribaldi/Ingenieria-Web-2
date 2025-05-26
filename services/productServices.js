const { Producto } = require("../models");

const productServices = {
    createProduct: async function createProduct(producto) {
        
          const newProduct = await Producto.create(producto);
        
            return {
                producto: newProduct
            };
        
      },
}
module.exports = productServices;
