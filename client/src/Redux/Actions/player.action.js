import api from "../../Services/Api";
export const GET_TRACK_SELECTED = "GET_TRACK_SELECTED";
export const GET_ALBUM_LIST = "GET_ALBUM_LIST";
export const GET_TOP_TRACKSLIST = "GET_TOP_TRACKSLIST";

export const getTrackSelected = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_TRACK_SELECTED, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAlbumList = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_ALBUM_LIST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
