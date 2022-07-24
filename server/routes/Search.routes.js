const express = require("express");
const router = express.Router();
const SearchController = require("../controller/Search.controller");

router.get("/", SearchController.global);
router.get("/track", SearchController.tracks);
router.get("/artist", SearchController.artists);
router.get("/album", SearchController.albums);

module.exports = router;
