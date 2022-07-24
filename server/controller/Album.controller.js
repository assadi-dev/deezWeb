const axios = require("axios");

module.exports.findAll = async (req, res) => {
  const result = await axios.get("https://api.deezer.com/chart/0/albums");
  res.json(result.data);
};

module.exports.findOne = async (req, res) => {
  const id = req.params.id;
  const result = await axios.get("https://api.deezer.com/album/" + id);
  res.json(result.data);
};

module.exports.search = async (req, res) => {
  const q = req.query.q;
  const order = req.query.order;

  if (order) {
    const result = await axios.get(
      `https://api.deezer.com/search/album?q=${q.trim()}&order=${order.trim()}`
    );
    return res.json(result.data);
  } else {
    const result = await axios.get(
      `https://api.deezer.com/search/album?q=${q.trim()}`
    );
    return res.json(result.data);
  }
};
