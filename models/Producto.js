const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
  }

  // Definición del modelo
  Producto.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,

      },  
      marca: {
        type: DataTypes.STRING,
        allowNull: true,
      },
       descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      genero: {
        type: DataTypes.ENUM('hombre', 'mujer', 'unisex'),
        allowNull: true
      },
       foto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoria: {
        type: DataTypes.ENUM('remera', 'zapatilla', 'abrigo', 'accesorio', 'pantalon'),
        allowNull: true
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Producto',
      tableName: 'productos',      
      underscored: true, 
      timestamps: false, // ← Esto evita que cree/espere createdAt y updatedAt
    }
  );

  return Producto;
};