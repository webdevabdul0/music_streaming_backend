const Music = require("../models/Music");
const upload = require("../middleware/upload");
const path = require("path");

const uploadMusic = async (req, res) => {
  const { title, artist, genre } = req.body;
  const file = req.file;

  try {
    //Store Music info in the Database

    const newMusic = await Music.create({
      title,
      artist,
      genre,
      file_path: file.path,
    });

    res
      .status(201)
      .json({ message: "Music uploaded Succefully!", music: newMusic });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getMusicLibrary = async (req, res) => {
  //Get all the Music
  try {
    const music = await Music.findAll();
    res.json({ music });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const streamMusic = async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findByPk(id);

    if (!music) {
      return res.status(404).json({ message: "Music Not Found" });
    } else {
      const filePath = path.resolve(music.file_path);

      //Stream the File
      res.sendFile(filePath);
    }
  } catch (error) {
    console.error("Error in streamMusic:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { uploadMusic, getMusicLibrary, streamMusic };
