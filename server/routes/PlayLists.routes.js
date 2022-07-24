const express = require("express");
const router = express.Router();
const PlaylistController = require("../controller/Playlist.controller");

router.get("/", PlaylistController.findAll);
router.get("/:id", PlaylistController.findOne);

module.exports = router;
