import {
  SEARCH_GLOBALS,
  SEARCH_ALBUMS,
  SEARCH_ARTISTS,
  SEARCH_TRACKS,
  SEARCH,
} from "../Actions/search.action";

const initialState = { collections: [], isReady: false };

const SearchReducers = (state = initialState, action) => {
  const { type, payload } = action;
  state = { ...state, isReady: false };
  switch (type) {
    case SEARCH:
      return { ...state, collections: payload, isReady: true };
      break;
    case SEARCH_GLOBALS:
      return { ...state, collections: payload, isReady: true };
      break;
    case SEARCH_ALBUMS:
      return { ...state, selected: payload, isReady: true };
      break;
    case SEARCH_ARTISTS:
      return { ...state, selected: payload, isReady: true };
      break;
    case SEARCH_TRACKS:
      return { ...state, selected: payload, isReady: true };
      break;

    default:
      return { ...state, isReady: false };
      break;
  }
};

export default SearchReducers;
