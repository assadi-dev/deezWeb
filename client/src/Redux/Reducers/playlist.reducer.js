import {
  GET_TOP_PLAYLIST,
  GET_PLAYLIST_DETAILS,
  GET_PLAYLIST_TRACKS,
  READY,
} from "../Actions/playlist.action";

const initialState = {
  collections: [],
  selcted: [],
  tracks: [],
  isReady: false,
};

const PlaylistReducers = (state = initialState, action) => {
  const { type, payload } = action;
  state = { ...state, isReady: false };
  switch (type) {
    case GET_TOP_PLAYLIST:
      return { ...state, collections: payload, isReady: true };
      break;
    case GET_PLAYLIST_DETAILS:
      return { ...state, selected: payload, isReady: true };
      break;
    case GET_PLAYLIST_TRACKS:
      return { ...state, tracks: payload, isReady: true };
      break;
    case READY:
      return { ...state, isReady: false };
      break;
    default:
      return state;
      break;
  }
};

export default PlaylistReducers;
