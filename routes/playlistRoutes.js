const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
  createPlaylist,
  addMusictoPlaylist,
  removeMusicfromPlaylist,
  getPlaylists,
  getPlaylistDetails,
  deletePlaylist,
  updatePlaylist,
} = require("../controllers/playlistController");

router.post("/create", authenticateToken, createPlaylist);
router.post("/add-music", authenticateToken, addMusictoPlaylist);
router.post("/remove-music", authenticateToken, removeMusicfromPlaylist);
router.post("/delete", authenticateToken, deletePlaylist);
router.post("/update", authenticateToken, updatePlaylist);

router.get("/:id", authenticateToken, getPlaylistDetails);
router.get("/", authenticateToken, getPlaylists);

module.exports = router;
