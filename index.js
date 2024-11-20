const express = require("express");
const cors = require("cors");
require("dotenv").config();
const useRoutes = require("./routes/userRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const musicRoutes = require("./routes/musicRoutes");
const sequelize = require("./config/database");
const app = express();
const PORT = process.env.PORT || 5000;

const Playlist = require("./models/Playlist");
const User = require("./models/User");
const Music = require("./models/Music");
const MusicPlaylist = require("./models/MusicPlaylist");

//Define Relationships
User.hasMany(Playlist, { foreignKey: "userId" });
Playlist.belongsTo(User, { foreignKey: "userId" });

Playlist.belongsToMany(Music, {
  through: "MusicPlaylist",
  foreignKey: "playlistId",
});
Music.belongsToMany(Playlist, {
  through: "MusicPlaylist",
  foreignKey: "musicId",
});

const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Sync models in order
    await User.sync(); // Sync User model first
    await Music.sync(); // Sync Music model
    await Playlist.sync(); // Sync Playlist model
    await MusicPlaylist.sync(); // Sync MusicPlaylist model (now Music and Playlist exist)

    console.log("All models synchronized.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};

syncModels();

app.use(cors());
app.use(express.json());
app.use("/api/users", useRoutes);
app.use("/api/users", protectedRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/playlists", playlistRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Music Streaming Platform API");
});

//Sync the Models with the Database

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
