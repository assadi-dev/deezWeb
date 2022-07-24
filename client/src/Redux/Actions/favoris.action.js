import Api from "../../Services/Api";
import { getItems, setItem } from "../../Services/storage";
import { ToastContainer, toast } from "react-toastify";

export const GET_FAVORIS = "GET_FAVORIS";
export const ADD_FAVORIS = "ADD_FAVORIS";
export const REMOVE_FAVORIS = "REMOVE_FAVORIS";

const key = "MesFavoriesDeezWeb";

export const getFavoris = () => {
  return async (dispatch) => {
    try {
      getItems(key).then((res) => {
        let list = [];
        res.forEach(async (item) => {
          getDataTracks(item).then((res) => {
            list = [...list, res];
            dispatch({ type: GET_FAVORIS, payload: list });
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addFavoris = (id) => {
  return async (dispatch) => {
    try {
      const items = await getItems(key);
      const data = await setItem(key, [id, ...items]);
      getDataTracks(id).then((res) => {
        dispatch({ type: ADD_FAVORIS, payload: res });
      });
      toast("a été ajouté dans vos favoris");
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFavoris = (id) => {
  return async (dispatch) => {
    try {
      const items = await getItems(key);
      let remove = items.filter((item) => item != id);
      const data = await setItem(key, remove);
      dispatch({ type: REMOVE_FAVORIS, payload: id });
      toast("a été retiré dans vos favoris");
    } catch (error) {
      console.log(error);
    }
  };
};

const getDataTracks = async (id) => {
  if (id != null || id !== "") {
    const data = await Api.get("/tracks/" + id);
    const res = data.data;
    return {
      id: res.id,
      title: res.title,
      artist: { id: res.artist.id, name: res.artist.name },
      album: { id: res.album.id, title: res.album.title },
      cover: res.album.cover_medium,
      duration: res.duration,
      preview: res.preview,
    };
  }
};
