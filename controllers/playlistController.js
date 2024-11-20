const Music = require("../models/Music");
const Playlist = require("../models/Playlist");
const MusicPlaylist = require("../models/MusicPlaylist");

const createPlaylist = async (req, res) => {
  const { title } = req.body; //This will give title variable the vlaue of title given in form data
  const userId = req.user.id; //This will give us userID

  try {
    const playlist = await Playlist.create({
      title,
      userId,
    });

    res.status(201).json({ messsage: "Playlist Created Succefully", playlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating playlist" });
  }
};

const addMusictoPlaylist = async (req, res) => {
  const { musicId } = req.body;
  const { playlistId } = req.body;

  try {
    const playlist = await Playlist.findByPk(playlistId);
    const music = await Music.findByPk(musicId);

    if (!music || !playlist) {
      res.status(404).json({ message: "Playlist or Music not found" });
    } else {
      await MusicPlaylist.create({
        musicId,
        playlistId,
      });
      res.status(200).json({ message: "Music added to playlist succesfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding music to playlist" });
  }
};

const removeMusicfromPlaylist = async (req, res) => {
  const { playlistId } = req.body;
  const { musicId } = req.body;

  try {
    const playlist = await Playlist.findByPk(playlistId);
    const music = await Music.findByPk(musicId);

    if (!playlist || !music) {
      res.status(404).json({ message: "Playlist or Music not Found" });
    } else {
      await MusicPlaylist.destroy({
        where: { musicId, playlistId },
      });
      res
        .status(200)
        .json({ message: "Music Removed from Playlist Succesfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Removing Music from Playlist" });
  }
};

const getPlaylists = async (req, res) => {
  const userId = req.user.id;

  try {
    const playlists = await Playlist.findAll({
      where: { userId },
    });
    res.status(200).json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server gave an error" });
  }
};

const getPlaylistDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await Playlist.findByPk(id);

    if (!playlist) {
      res.status(404).json({ message: "Playlist Not found" });
    } else {
      res.status(200).json(playlist);
    }
  } catch (error) {
    console.error;
    restart.status(500).json({ message: "Error fetching playlist details" });
  }
};

const updatePlaylist = async (req, res) => {
  const { playlistId, title } = req.body;

  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      res.status(404).json({ message: "Playlist Not Found" });
    } else {
      playlist.title = title;
      await playlist.save();
      res.status(200).json({ message: "Playlist updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating playlist" });
  }
};

const deletePlaylist = async (req, res) => {
  const { playlistId } = req.body;

  try {
    const playlist = await Playlist.findByPk(playlistId);

    if (!playlist) {
      res.status(404).json({ message: "Playlist Not Found" });
    } else {
      await Playlist.destroy({
        where: { id: playlistId },
      });

      res.status(200).json({ message: "Playlist Deleted Succesfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Deleting Playlist" });
  }
};

module.exports = {
  createPlaylist,
  addMusictoPlaylist,
  removeMusicfromPlaylist,
  getPlaylists,
  getPlaylistDetails,
  deletePlaylist,
  updatePlaylist,
};
