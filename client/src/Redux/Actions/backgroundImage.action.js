export const GET_URL_PICTURE = "GET_URL_PICTURE";

export const getUrlBackgroundImage = (src) => {
  return async (dispatch) => {
    try {
      return dispatch({ type: GET_URL_PICTURE, payload: src });
    } catch (error) {}
  };
};
