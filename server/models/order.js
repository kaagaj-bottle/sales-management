const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utilities/db");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalAmount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "order",
  }
);

module.exports = Order;
