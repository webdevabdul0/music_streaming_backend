const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("music_streaming", "postgres", "abdulhanan11", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize; // Export the instance
