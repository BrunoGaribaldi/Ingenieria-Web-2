const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {}

  // Definición del modelo
  Reserva.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_producto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_usuario: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Reserva",
      tableName: "reservas",
      underscored: true,
      timestamps: true, 
    }
  );

  // Asociaciones
  Reserva.associate = (models) => {
    Reserva.belongsTo(models.Producto, {
      foreignKey: 'id_producto',
      as: 'producto',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Reserva.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Reserva;
};
