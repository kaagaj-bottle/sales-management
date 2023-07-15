const Sequelize = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

const config = require("./config");
const logger = require("./logger");

const sequelize = new Sequelize(
  config.PGDATABASE,
  config.PGUSER,
  config.PGPASSWORD,
  {
    host: config.PGHOST,
    dialect: "postgres",
  }
);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  logger.info("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    logger.info(`connected to database running at port ${config.PGPORT}`);
  } catch (error) {
    logger.error("connection failed");
    return process.exit(1);
  }
  return null;
};

module.exports = { connectToDatabase, sequelize };
