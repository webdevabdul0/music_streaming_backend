const express = require("express");
const upload = require("../middleware/upload");
const {
  uploadMusic,
  getMusicLibrary,
  streamMusic,
} = require("../controllers/MusicController");

const router = express.Router();

//Route to Upload Music

router.post("/upload", upload.single("musicFile"), uploadMusic);

router.get("/library", getMusicLibrary);

router.get("/play/:id", streamMusic);

module.exports = router;
