const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
  }

  // Definición del modelo
  Usuario.init(
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
       apellido: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
       rol: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',      
      underscored: true, 
      timestamps: false, // ← Esto evita que cree/espere createdAt y updatedAt
    }
  );

  return Usuario;
};