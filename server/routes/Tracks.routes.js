const express = require("express");
const router = express.Router();
const TracksController = require("../controller/Tracks.controller");

router.get("/", TracksController.findAll);
router.get("/:id", TracksController.findOne);
router.get("/search", TracksController.search);

module.exports = router;
