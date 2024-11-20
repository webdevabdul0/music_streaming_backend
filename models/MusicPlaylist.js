//This is a Junction table for Music and Playlist Model

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MusicPlaylist = sequelize.define(
  "MusicPlaylist",
  {
    musicId: {
      type: DataTypes.INTEGER,
      references: { model: "Music", key: "id" },
    },
    playlistId: {
      type: DataTypes.INTEGER,
      references: { model: "Playlist", key: "id" },
    },
  },
  { timestamps: true, tableName: "MusicPlaylists" }
);

module.exports = MusicPlaylist;
