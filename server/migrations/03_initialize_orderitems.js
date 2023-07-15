const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: QueryInterface }) => {
    await QueryInterface.createTable("order_items", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "orders", key: "id" },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "products", key: "id" },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("order_items");
  },
};
