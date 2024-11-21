const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const isProduction = process.env.NODE_ENV === "production";

let sequelize;

// Validate critical environment variables
if (isProduction && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be defined in production.");
} else if (!isProduction) {
  const requiredEnv = [
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "DB_HOST",
    "DB_PORT",
  ];
  requiredEnv.forEach((env) => {
    if (!process.env[env]) {
      throw new Error(`Environment variable ${env} is missing.`);
    }
  });
}

// Configure Sequelize instance
if (isProduction) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Adjust based on provider requirements
      },
    },
    logging: false, // Disable logging in production
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
    }
  );
}

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connection established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
