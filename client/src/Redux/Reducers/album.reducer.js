import {
  GET_ALBUM_DETAILS,
  GET_ALBUM_TRACKS,
  GET_TOP_ALBUMS,
} from "../Actions/album.action";

const initialState = {
  collections: [],
  selected: [],
  tracklist: [],
  isReady: false,
};

const AlbumReducers = (state = initialState, action) => {
  const { type, payload } = action;
  state = { ...state, isReady: false };
  switch (type) {
    case GET_TOP_ALBUMS:
      return { ...state, collections: payload, isReady: true };
      break;
    case GET_ALBUM_DETAILS:
      return { ...state, selected: payload, isReady: true };
      break;
    case GET_ALBUM_TRACKS:
      return { ...state, tracklist: payload, isReady: true };
      break;
    default:
      return state;
      break;
  }
};

export default AlbumReducers;
