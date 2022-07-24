import api from "../../Services/Api";

export const GET_TOP_ALBUMS = "GET_TOP_ALBUMS";
export const GET_ALBUM_DETAILS = "GET_ALBUM_DETAILS";
export const GET_ALBUM_TRACKS = "GET_ALBUM_TRACKS";
export const READY = "READY";

export const findAlbumAll = () => {
  return async (dispatch) => {
    try {
      const result = await api.get("/albums");
      dispatch({ type: GET_TOP_ALBUMS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const findOneAlbum = (id) => {
  return async (dispatch) => {
    try {
      const result = await api.get("/albums/" + id);
      dispatch({ type: GET_ALBUM_DETAILS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
