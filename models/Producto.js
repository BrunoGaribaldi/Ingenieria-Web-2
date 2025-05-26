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
      nombre: {
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      cantidadDisponible: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
       foto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      precio: {
        type: DataTypes.STRING,
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