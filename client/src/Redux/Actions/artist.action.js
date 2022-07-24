import api from "../../Services/Api";
export const GET_TOP_ARTISTS = "GET_TOP_ARTISTS";
export const GET_ARTIST_DETAILS = "GET_ARTIST_DETAILS";
export const READY = "READY";

export const findTopArtist = () => {
  return async (dispatch) => {
    try {
      const result = await api.get("/artists");
      dispatch({ type: GET_TOP_ARTISTS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const findOneArtist = (id) => {
  return async (dispatch) => {
    try {
      const result = await api.get("/artists/" + id);
      dispatch({ type: GET_ARTIST_DETAILS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
