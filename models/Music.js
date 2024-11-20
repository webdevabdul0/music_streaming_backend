//This is the Model for Music

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Music = sequelize.define(
  "Music",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Music",
  }
);

module.exports = Music;
