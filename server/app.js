const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const PlayListRoutes = require("./routes/PlayLists.routes");
const TracksRoutes = require("./routes/Tracks.routes");
const ArtistsRoutes = require("./routes/Artists.routes");
const AlbumsRoutes = require("./routes/Album.routes");
const SearchRoutes = require("./routes/Search.routes");

//security
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      "default-src": helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      "script-src": ["'self'"],
      "img-src": [
        "'self' https://e-cdns-images.dzcdn.net/ https://e-cdns-images.dzcdn.net",
      ],
    },
  })
);
//Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors config
const corsOptions = {
  origin: "*",
  allowedHeaders: [
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

//Endpoints
app.use("/api/search", SearchRoutes);
app.use("/api/playlists", PlayListRoutes);
app.use("/api/tracks", TracksRoutes);
app.use("/api/artists", ArtistsRoutes);
app.use("/api/albums", AlbumsRoutes);

//static Folder

app.use(express.static("client/build"));
app.use("/public", express.static(path.join(__dirname, "/client/public")));
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

module.exports = app;
