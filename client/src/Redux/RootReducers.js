import { combineReducers } from "redux";
import TrackReducers from "./Reducers/tracks.reducer";
import PlaylistReducers from "./Reducers/playlist.reducer";
import AlbumReducers from "./Reducers/album.reducer";
import ArtistReducers from "./Reducers/artist.reducer";
import SearchReducers from "./Reducers/search.reducer";
import FavorisReducers from "./Reducers/favoris.reducer";
import PlayerReducers from "./Reducers/player.reducer";
import BackgroundImageReducer from "./Reducers/BackgroundImage.reducers";

const RootReducers = combineReducers({
  TrackReducers,
  AlbumReducers,
  PlaylistReducers,
  SearchReducers,
  ArtistReducers,
  FavorisReducers,
  PlayerReducers,
  BackgroundImageReducer,
});

export default RootReducers;
