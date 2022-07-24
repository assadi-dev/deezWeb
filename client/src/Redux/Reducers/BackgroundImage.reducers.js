import { GET_URL_PICTURE } from "../Actions/backgroundImage.action";

const initialState = "";

const BackgroundImageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_URL_PICTURE:
      return payload;
      break;

    default:
      return state;
      break;
  }
};

export default BackgroundImageReducer;
