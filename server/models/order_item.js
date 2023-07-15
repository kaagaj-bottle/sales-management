const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utilities/db");

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "orders", key: "id" },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "orderItems",
  }
);

module.exports = OrderItem;
