const axios = require("axios");

module.exports.findAll = async (req, res) => {
  const result = await axios.get("https://api.deezer.com/chart/0/playlists");
  res.json(result.data);
};

module.exports.findOne = async (req, res) => {
  const id = req.params.id;
  const result = await axios.get("https://api.deezer.com/playlist/" + id);

  return res.json(result.data);
};
