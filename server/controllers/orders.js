const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { User, Product, Order, OrderItem } = require("../models");
const { tokenExtractor } = require("../utilities/middleware");
const logger = require("../utilities/logger");

router.get("/", async (request, response) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "orderDate", "totalAmount"],
    });
    response.json(orders);
  } catch (error) {
    logger.error(error);
    return response.status(500);
  }
});

router.post("/", tokenExtractor, async (request, response) => {
  const order_array = request.body;

  if (!(Array.isArray(order_array) && order_array.length > 0)) {
    return response
      .status(400)
      .json({ error: "insufficient or invalid request" });
  }

  let user;

  try {
    user = await User.findByPk(request.decodedToken.id);
  } catch (error) {
    logger.error(error);
    return response.status(400).json({ error });
  }

  let order_items = [];
  let order_initiated = false;
  let order;
  let total_amount = 0;
  let product;

  for (const element of order_array) {
    product = await Product.findByPk(element.id);

    if (product) {
      if (!order_initiated) {
        order_initiated = true;

        order = await Order.create({
          userId: user.id,
          orderDate: new Date(),
          totalAmount: 0,
        });
      }

      try {
        const order_item = await OrderItem.create({
          orderId: order.id,
          productId: product.id,
          quantity: element.quantity ? element.quantity : 1,
        });

        order_items.push(order_item);

        total_amount += order_item.quantity * product.price;
      } catch (error) {
        logger.error(error);
      }
    }
  }
  if (!order_initiated) {
    return response
      .status(400)
      .json({ error: "none of the ordered product found" });
  }

  try {
    await Order.update(
      { totalAmount: total_amount },
      {
        where: {
          id: order.id,
        },
      }
    );
    order = await Order.findByPk(order.id);
    response.json({ order, order_items });
  } catch (error) {
    logger.error(error);
  }
});

module.exports = router;
