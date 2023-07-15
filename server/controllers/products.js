const router = require("express").Router();

const { Product } = require("../models");

const logger = require("../utilities/logger");

router.get("/", async (request, response) => {
  try {
    const products = await Product.findAll({
      attributes: ["name", "description", "price"],
    });
    response.json(products);
  } catch (error) {
    logger.error(error);
    return response.status(400).json("error: Bad Request");
  }
});

router.get("/:id", async (request, response) => {
  try {
    const products = await Product.findByPk(request.params.id);
    if (products) {
      response.json(products);
    } else {
      response.status(400).json({ error: "product with given id not found" });
    }
  } catch (error) {
    logger.error(error);
    return response.status(400).end();
  }
});

router.post("/", async (request, response) => {
  const { name, description, price } = request.body;
  if (!(name && price)) {
    return response.status(400).json({
      error: "missing values",
    });
  }

  try {
    const product = await Product.create({ name, description, price });
    response.json(product);
  } catch (error) {
    logger.error(error);
    return response.status(500).end();
  }
});

module.exports = router;
