//This is the Model for Playlist

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Playlist = sequelize.define(
  "Playlist",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: true, tableName: "Playlist" }
);

module.exports = Playlist;
