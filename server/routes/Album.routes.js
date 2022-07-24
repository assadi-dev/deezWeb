const express = require("express");
const router = express.Router();
const AlbumsController = require("../controller/Album.controller");

router.get("/", AlbumsController.findAll);
router.get("/:id", AlbumsController.findOne);
router.get("/search", AlbumsController.search);

module.exports = router;
