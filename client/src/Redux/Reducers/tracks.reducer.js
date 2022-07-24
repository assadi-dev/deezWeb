import {
  GET_TOP_TRACKS,
  GET_TRACK_DETAILS,
  READY,
} from "../Actions/tracks.action";

const initialState = { collections: [], selected: [], isReady: false };

const TrackReducers = (state = initialState, action) => {
  const { type, payload } = action;
  state = { ...state, isReady: false };
  switch (type) {
    case GET_TOP_TRACKS:
      return { ...state, collections: payload, isReady: true };
      break;
    case GET_TRACK_DETAILS:
      return { ...state, selected: payload, isReady: true };
      break;
    case READY:
      return { ...state, isReady: false };

    default:
      return state;
      break;
  }
};

export default TrackReducers;
