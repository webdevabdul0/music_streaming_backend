const express = require("express");
const router = express.Router();
const authenticationToken = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/profile", authenticationToken, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findOne({ where: { id: userID } });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.json({ message: "Congrats! This is your Profile!", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " Server Error. ", error });
  }
});

module.exports = router;
