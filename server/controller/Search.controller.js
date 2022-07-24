const axios = require("axios");
const utf8 = require("utf8");

module.exports.global = async (req, res) => {
  const q = req.query.q;
  const order = req.query.order;

  if (order) {
    const result = await axios.get(
      `https://api.deezer.com/search?q=${q.trim()}&order=${order.trim()}`
    );
    return res.json(result.data);
  } else {
    const result = await axios.get(
      `https://api.deezer.com/search?q=${q.trim()}`
    );
    return res.json(result.data);
  }
};

module.exports.tracks = async (req, res) => {
  const q = req.query.q;
  const order = req.query.order;
  let encoded = req.query.q;
  try {
    encoded = utf8.decode(q.trim());
  } catch (error) {
    encoded = q.trim();
  }
  const url = encodeURI(
    `https://api.deezer.com/search/track?q=${encoded}&order=${order.trim()}`
  );

  try {
    const result = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    return res.json(result.data);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.artists = async (req, res) => {
  const q = req.query.q;
  const order = req.query.order;
  let encoded = req.query.q;
  try {
    encoded = utf8.decode(q.trim());
  } catch (error) {
    encoded = q.trim();
  }
  const url = encodeURI(
    `https://api.deezer.com/search/artist?q=${encoded}&order=${order.trim()}`
  );

  try {
    const result = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    return res.json(result.data);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.albums = async (req, res) => {
  const q = req.query.q;
  const order = req.query.order;
  let encoded = req.query.q;
  try {
    encoded = utf8.decode(q.trim());
  } catch (error) {
    encoded = q.trim();
  }
  const url = encodeURI(
    `https://api.deezer.com/search/album?q=${encoded}&order=${order.trim()}`
  );

  try {
    const result = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    return res.json(result.data);
  } catch (error) {
    return res.json(error);
  }
};
