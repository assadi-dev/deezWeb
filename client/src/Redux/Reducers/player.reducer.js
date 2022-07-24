import {
  GET_ALBUM_LIST,
  GET_TOP_TRACKSLIST,
  GET_TRACK_SELECTED,
} from "../Actions/player.action";

const initialState = {
  current: { id: 0, artist: "", album: "", cover: "", index: 0 },
  trackList: [],
};

const PlayerReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRACK_SELECTED:
      return { ...state, current: payload };
      break;
    case GET_ALBUM_LIST:
      return { ...state, tracklist: payload };
      break;

    case GET_TOP_TRACKSLIST:
      return { ...state, tracklist: payload };
      break;

    default:
      return state;
      break;
  }
};

export default PlayerReducers;
