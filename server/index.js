const app = require("./app");
const http = require("http");

const logger = require("./utilities/logger");
const config = require("./utilities/config");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`);
});
