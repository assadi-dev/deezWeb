import api from "../../Services/Api";

export const GET_TOP_PLAYLIST = "GET_TOP_PLAYLIST";
export const GET_PLAYLIST_DETAILS = "GET_PLAYLIST_DETAILS";
export const READY = "READY";
export const GET_PLAYLIST_TRACKS = " GET_PLAYLIST_TRACKS";

export const findTopPlaylist = () => {
  return async (dispatch) => {
    try {
      const result = await api.get("/playlists");

      const cleanData = result.data.data.map((playlist) => {
        return {
          title: playlist.title,
          id: playlist.id,
        };
      });
      dispatch({ type: GET_TOP_PLAYLIST, payload: cleanData.slice(1, 9) });
    } catch (error) {}
  };
};

export const findOnePlaylist = (id) => {
  return async (dispatch) => {
    try {
      api.get("/playlists/" + id).then((res) => {
        dispatch({ type: GET_PLAYLIST_DETAILS, payload: res.data });
      });
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

export const getTrackListData = (id) => {
  return async (dispatch) => {
    try {
      api.get("/playlists/" + id).then((res) => {
        dispatch({ type: GET_PLAYLIST_TRACKS, payload: res.data.tracks.data });
      });
    } catch (error) {
      console.log(error);
    }
  };
};
