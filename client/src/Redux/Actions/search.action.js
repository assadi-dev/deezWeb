import api from "../../Services/Api";
import utf8 from "utf8";

export const SEARCH = "SEARCH";
export const SEARCH_ARTISTS = "SEARCH_ARTISTS";
export const SEARCH_ALBUMS = "SEARCH_ALBUMS";
export const SEARCH_TRACKS = "SEARCH_TRACKS";
export const SEARCH_GLOBALS = "SEARCH_GLOBALS";
export const READY = "READY";

export const search = (q, type, order) => {
  q = utf8.encode(q);
  return async (dispatch) => {
    try {
      const result = await api.get("/search/" + type, { params: { q, order } });
      dispatch({ type: SEARCH, payload: result.data });
      return result;
    } catch (error) {}
  };
};

export const searchGlobal = (q, order) => {
  q = utf8.encode(q);
  return async (dispatch) => {
    try {
      api
        .get("/search", { params: { q, order } })
        .then((res) => dispatch({ type: SEARCH_GLOBALS, payload: res.data }))
        .catch((error) => console.log(error));
    } catch (error) {}
  };
};

export const searchArtists = (q, order) => {
  q = utf8.encode(q);
  return async (dispatch) => {
    try {
      api
        .get("/search/artist", { params: { q, order } })
        .then((res) => dispatch({ type: SEARCH_ARTISTS, payload: res.data }))
        .catch((error) => console.log(error));
    } catch (error) {}
  };
};

export const searchTracks = (q, order) => {
  q = utf8.encode(q);
  return async (dispatch) => {
    try {
      api
        .get("/search/track", { params: { q, order } })
        .then((res) => dispatch({ type: SEARCH_TRACKS, payload: res.data }))
        .catch((error) => console.log(error));
    } catch (error) {}
  };
};

export const searchAlbums = (q, order) => {
  q = utf8.encode(q);
  return async (dispatch) => {
    try {
      api
        .get("/search/album", { params: { q, order } })
        .then((res) => dispatch({ type: SEARCH_ALBUMS, payload: res.data }));
    } catch (error) {
      console.log(error);
    }
  };
};
