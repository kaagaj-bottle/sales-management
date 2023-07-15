const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const OrderItem = require("./order_item");

User.hasMany(Order);

Order.belongsTo(User);
Order.hasMany(OrderItem);

Product.hasMany(OrderItem);

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
};
