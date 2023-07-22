const express = require("express");
const cors = require("cors");

const app = express();

const { initiateDbConnection } = require("./utilities/helper");
const logger = require("./utilities/logger");

const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const productsRouter = require("./controllers/products");
const ordersRouter = require("./controllers/orders");

app.use(cors());
app.use(express.json());

app.get("/", async (request, response) => {
  response.send(
    `<b><a target="_blank" href="https://github.com/kaagaj-bottle/sales-management/blob/main/DOCS.md">Api Documentation</a></b>
    <br>
    <b><a href="https://github.com/kaagaj-bottle/backend-assignment/tree/main" target="_blank">Github Repo</a><b>`
  );
});
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

initiateDbConnection();

module.exports = app;
