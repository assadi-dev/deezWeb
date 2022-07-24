import api from "../../Services/Api";

export const GET_TOP_TRACKS = "GET_TOP_TRACKS";
export const GET_TRACK_DETAILS = "GET_TRACK_DETAILS";
export const READY = "READY";

export const findTopTracks = () => {
  return async (dispatch) => {
    try {
      const result = await api.get("/tracks");
      dispatch({ type: GET_TOP_TRACKS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const findOneTrack = (id) => {
  return async (dispatch) => {
    try {
      const result = await api.get("/tracks/" + id);
      dispatch({ type: GET_TRACK_DETAILS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const ready = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: READY, payload: "" });
    } catch (error) {
      console.log(error);
    }
  };
};
