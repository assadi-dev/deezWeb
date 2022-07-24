import {
  GET_FAVORIS,
  ADD_FAVORIS,
  REMOVE_FAVORIS,
} from "../Actions/favoris.action";

const initialState = [];

const FavorisReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FAVORIS:
      return [...payload];
      break;
    case ADD_FAVORIS:
      return [payload, ...state];
      break;
    case REMOVE_FAVORIS:
      return state.filter((item) => item.id !== payload);
      break;
    default:
      return state;
      break;
  }
};

export default FavorisReducers;
