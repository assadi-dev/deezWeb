const express = require("express");
const router = express.Router();
const ArtistsController = require("../controller/Artists.controller");

router.get("/", ArtistsController.findAll);
router.get("/:id", ArtistsController.findOne);
router.get("/search", ArtistsController.search);

module.exports = router;
