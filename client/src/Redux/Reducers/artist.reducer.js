import { GET_TOP_ARTISTS, GET_ARTIST_DETAILS } from "../Actions/artist.action";

const initialState = { collections: [], selected: [], isReady: false };

const ArtistReducers = (state = initialState, action) => {
  const { type, payload } = action;
  state = { ...state, isReady: false };
  switch (type) {
    case GET_TOP_ARTISTS:
      return { ...state, collections: payload, isReady: true };
      break;
    case GET_ARTIST_DETAILS:
      return { ...state, selected: payload, isReady: true };
      break;
    default:
      return state;
      break;
  }
};

export default ArtistReducers;
